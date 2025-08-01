/**
 * Appodeal Event Manager
 *
 * Cross-platform event emission and listener management for the Appodeal SDK.
 * Works with the custom RNA event dispatcher to prevent "no listeners registered" errors
 * on both iOS and Android platforms.
 */

import { DeviceEventEmitter } from 'react-native';
import NativeAppodeal from './specs/NativeAppodealModule';

type EventHandler = (params?: any) => void;
type Event = string;

class AppodealEventManager {
  private subscriptions = new Map<EventHandler, any>();
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Notify the native side (iOS/Android) that JS is ready to receive events
      await NativeAppodeal.eventsNotifyReady(true);
      this.isInitialized = true;
      console.log(
        'Appodeal EventManager: Initialized successfully for current platform'
      );
    } catch (error) {
      console.warn(
        'Appodeal EventManager: Failed to initialize events system:',
        error
      );
    }
  }

  addEventListener(event: Event, handler: EventHandler) {
    if (!this.isInitialized) {
      // Delay listener registration until initialization is complete
      setTimeout(() => {
        if (this.isInitialized) {
          this.addEventListener(event, handler);
        }
      }, 100);
      return { remove: () => {} };
    }

    try {
      // Register listener with native side (iOS/Android)
      NativeAppodeal.eventsAddListener(event);
    } catch (error) {
      console.warn(
        'Appodeal EventManager: Failed to register listener:',
        error
      );
    }

    // Listen for the prefixed event name that native platforms send
    const prefixedEvent = `rna_${event}`;
    const listener = DeviceEventEmitter.addListener(prefixedEvent, handler);

    this.subscriptions.set(handler, { listener, event });

    return {
      remove: (): void => this.removeEventListener(event, handler),
    };
  }

  removeEventListener(event: Event, handler: EventHandler) {
    const subscription = this.subscriptions.get(handler);
    if (subscription) {
      subscription.listener.remove();
      this.subscriptions.delete(handler);

      try {
        // Notify native side (iOS/Android) that listener was removed
        NativeAppodeal.eventsRemoveListener(event, false);
      } catch (error) {
        console.warn(
          'Appodeal EventManager: Failed to remove listener:',
          error
        );
      }
    }
  }

  removeAllListeners(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.listener.remove();
      try {
        // Notify native side (iOS/Android) that all listeners for this event were removed
        NativeAppodeal.eventsRemoveListener(subscription.event, true);
      } catch (error) {
        console.warn(
          'Appodeal EventManager: Failed to remove all listeners:',
          error
        );
      }
    });
    this.subscriptions.clear();
  }

  async getListenersDictionary() {
    try {
      // Get diagnostics from native event system (iOS/Android)
      return await NativeAppodeal.eventsGetListeners();
    } catch (error) {
      console.warn(
        'Appodeal EventManager: Failed to get listeners dictionary:',
        error
      );
      return {};
    }
  }

  destroy() {
    this.removeAllListeners();
    try {
      // Notify native side (iOS/Android) that JS is shutting down
      NativeAppodeal.eventsNotifyReady(false);
    } catch (error) {
      console.warn('Appodeal EventManager: Failed to notify destroy:', error);
    }
    this.isInitialized = false;
  }
}

// Export singleton instance for cross-platform use
export const AppodealEventManagerInstance = new AppodealEventManager();
export default AppodealEventManagerInstance;
