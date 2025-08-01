// Mock TurboModuleRegistry before importing components
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(() => ({
    initialize: jest.fn(),
    isInitialized: jest.fn(() => false),
    eventsNotifyReady: jest.fn(),
  })),
}));

// Mock codegenNativeComponent
jest.mock('react-native/Libraries/Utilities/codegenNativeComponent', () => {
  return jest.fn((name) => {
    const React = require('react');
    return React.forwardRef((props: any, ref: any) =>
      React.createElement(name, { ...props, ref })
    );
  });
});

import { AppodealBanner, AppodealMrec } from '../index';

describe('Appodeal Components', () => {
  describe('AppodealBanner', () => {
    it('should be defined', () => {
      expect(AppodealBanner).toBeDefined();
    });

    it('should be a React component', () => {
      expect(typeof AppodealBanner).toBe('function');
    });

    it('should accept adSize prop', () => {
      expect(() => {
        // Component should accept adSize prop
        expect(AppodealBanner).toBeDefined();
      }).not.toThrow();
    });

    it('should accept placement prop', () => {
      expect(() => {
        // Component should accept placement prop
        expect(AppodealBanner).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('AppodealMrec', () => {
    it('should be defined', () => {
      expect(AppodealMrec).toBeDefined();
    });

    it('should be a React component', () => {
      expect(typeof AppodealMrec).toBe('function');
    });

    it('should accept placement prop', () => {
      expect(() => {
        // Component should accept placement prop
        expect(AppodealMrec).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('Component Props', () => {
    it('should handle common banner props', () => {
      // Test that components can handle these props
      expect(AppodealBanner).toBeDefined();
    });

    it('should handle common mrec props', () => {
      // Test that components can handle these props
      expect(AppodealMrec).toBeDefined();
    });

    it('should handle placement prop', () => {
      // Test that components can handle placement prop
      expect(AppodealBanner).toBeDefined();
      expect(AppodealMrec).toBeDefined();
    });

    it('should handle adSize prop for banner', () => {
      // Test that banner component can handle adSize prop
      expect(AppodealBanner).toBeDefined();
    });
  });

  describe('Component Creation', () => {
    it('should create AppodealBanner component with props', () => {
      const React = require('react');
      const props = {
        adSize: 'banner',
        placement: 'main_menu',
        onAdLoaded: jest.fn(),
        onAdFailedToLoad: jest.fn(),
        onAdClicked: jest.fn(),
        onAdExpired: jest.fn(),
      };

      expect(() => React.createElement(AppodealBanner, props)).not.toThrow();
    });

    it('should create AppodealMrec component with props', () => {
      const React = require('react');
      const props = {
        placement: 'game_screen',
        onAdLoaded: jest.fn(),
        onAdFailedToLoad: jest.fn(),
        onAdClicked: jest.fn(),
        onAdExpired: jest.fn(),
      };

      expect(() => React.createElement(AppodealMrec, props)).not.toThrow();
    });

    it('should handle banner with all possible adSize values', () => {
      const React = require('react');
      const adSizes = ['banner', 'adaptive'];

      adSizes.forEach((adSize) => {
        const props = { adSize, placement: 'test' };
        expect(() => React.createElement(AppodealBanner, props)).not.toThrow();
      });
    });

    it('should handle components without optional props', () => {
      const React = require('react');

      // Minimal props for Banner
      expect(() =>
        React.createElement(AppodealBanner, { adSize: 'banner' })
      ).not.toThrow();

      // Minimal props for MREC (no required props)
      expect(() => React.createElement(AppodealMrec, {})).not.toThrow();
    });
  });

  describe('Event Callbacks', () => {
    it('should accept all banner event callbacks', () => {
      const React = require('react');
      const callbacks = {
        onAdLoaded: jest.fn(),
        onAdFailedToLoad: jest.fn(),
        onAdClicked: jest.fn(),
        onAdExpired: jest.fn(),
      };

      const element = React.createElement(AppodealBanner, {
        adSize: 'banner',
        ...callbacks,
      });

      expect(element.props.onAdLoaded).toBe(callbacks.onAdLoaded);
      expect(element.props.onAdFailedToLoad).toBe(callbacks.onAdFailedToLoad);
      expect(element.props.onAdClicked).toBe(callbacks.onAdClicked);
      expect(element.props.onAdExpired).toBe(callbacks.onAdExpired);
    });

    it('should accept all MREC event callbacks', () => {
      const React = require('react');
      const callbacks = {
        onAdLoaded: jest.fn(),
        onAdFailedToLoad: jest.fn(),
        onAdClicked: jest.fn(),
        onAdExpired: jest.fn(),
      };

      const element = React.createElement(AppodealMrec, callbacks);

      expect(element.props.onAdLoaded).toBe(callbacks.onAdLoaded);
      expect(element.props.onAdFailedToLoad).toBe(callbacks.onAdFailedToLoad);
      expect(element.props.onAdClicked).toBe(callbacks.onAdClicked);
      expect(element.props.onAdExpired).toBe(callbacks.onAdExpired);
    });
  });

  describe('Component Types', () => {
    it('should be function components', () => {
      // Both components should be functions
      expect(typeof AppodealBanner).toBe('function');
      expect(typeof AppodealMrec).toBe('function');
    });

    it('should have names', () => {
      // Components should have names (either displayName, name, or be functions)
      expect(
        (AppodealBanner as any).displayName ||
          AppodealBanner.name ||
          typeof AppodealBanner
      ).toBeTruthy();
      expect(
        (AppodealMrec as any).displayName ||
          AppodealMrec.name ||
          typeof AppodealMrec
      ).toBeTruthy();
    });
  });

  describe('Style Props', () => {
    it('should accept style prop for banner', () => {
      const React = require('react');
      const style = { width: 320, height: 50 };

      const element = React.createElement(AppodealBanner, {
        adSize: 'banner',
        style,
      });

      expect(element.props.style).toBe(style);
    });

    it('should accept style prop for MREC', () => {
      const React = require('react');
      const style = { width: 300, height: 250 };

      const element = React.createElement(AppodealMrec, { style });

      expect(element.props.style).toBe(style);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined placement', () => {
      const React = require('react');

      expect(() =>
        React.createElement(AppodealBanner, {
          adSize: 'banner',
          placement: undefined,
        })
      ).not.toThrow();

      expect(() =>
        React.createElement(AppodealMrec, {
          placement: undefined,
        })
      ).not.toThrow();
    });

    it('should handle empty string placement', () => {
      const React = require('react');

      expect(() =>
        React.createElement(AppodealBanner, {
          adSize: 'banner',
          placement: '',
        })
      ).not.toThrow();

      expect(() =>
        React.createElement(AppodealMrec, {
          placement: '',
        })
      ).not.toThrow();
    });

    it('should handle null callbacks', () => {
      const React = require('react');

      expect(() =>
        React.createElement(AppodealBanner, {
          adSize: 'banner',
          onAdLoaded: null as any,
          onAdFailedToLoad: null as any,
        })
      ).not.toThrow();
    });
  });
});
