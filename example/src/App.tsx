import React, { useEffect } from 'react';
import { styles } from './styles';
import { initialize } from './advertising';
import { NavigationBar } from './components';
import { ShowSection } from './components/sections/ShowSection';
import { BannerSegmentedControl } from './components/controls/BannerSegmentedControl';
import { BannerView } from './advertising/BannerView';
import { AutocacheControl } from './components/controls/AutocacheControl';
import { RegulationSection } from './components/sections/RegulationSection';
import { InitialisationSection } from './components/sections/InitialisationSection';
import {
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import {
    AppodealAdType,
    AppodealConsentStatus,
    AppodealConsentRegulation,
    Appodeal
} from 'react-native-appodeal';
import {
    BannerShowStyle,
    isViewBannerStyle,
    bannerAdType,
} from './advertising';



interface AppState {
    initialised: boolean,
    initialising: false,
    bannerOnScreen: boolean,
    regulation: AppodealConsentRegulation,
    consent: AppodealConsentStatus,
    test: boolean,
    autocache: number,
    bannerShowStyle: BannerShowStyle
}

const defaultState: AppState = {
    initialised: false,
    initialising: false,
    bannerOnScreen: false,
    regulation: AppodealConsentRegulation.UNKNOWN,
    consent: AppodealConsentStatus.UNKNOWN,
    test: true,
    autocache: AppodealAdType.INTERSTITIAL | AppodealAdType.BANNER,
    bannerShowStyle: BannerShowStyle.BOTTOM
}


export const App = () => {
    const [state, setState] = React.useState<AppState>(defaultState)

    useEffect(() => {
        function initIfNeeded() {
            if (!state.initialising) { return }
            initialize(state.test, (status: AppodealConsentStatus, regulation: AppodealConsentRegulation) => {
                setState({
                    ...state,
                    initialising: false,
                    initialised: true,
                    regulation: regulation,
                    consent: status
                })
            })
        }
        initIfNeeded()
    }, [state.initialising]);

    useEffect(() => Appodeal.updateConsent(state.consent !== AppodealConsentStatus.NON_PERSONALIZED), [state.consent]);
    useEffect(() => {
        const types = [AppodealAdType.INTERSTITIAL, AppodealAdType.REWARDED_VIDEO, AppodealAdType.BANNER]
        types.forEach(adType => Appodeal.setAutoCache(adType, (state.autocache & adType) > 0))
    }, [state.autocache]);

    const updateBanner = () => {
        if (!isViewBannerStyle(state.bannerShowStyle)) {
            if (state.bannerOnScreen) {
                Appodeal.hide(bannerAdType(state.bannerShowStyle))
            } else {
                Appodeal.show(bannerAdType(state.bannerShowStyle))
            }
        }
        setState({
            ...state,
            bannerOnScreen: !state.bannerOnScreen
        })
    }

    return (
        <>
            <StatusBar />
            <NavigationBar />
            <BannerView
                showStyle={state.bannerShowStyle}
                visible={state.bannerOnScreen}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <InitialisationSection
                        test={state.test}
                        initialising={state.initialising}
                        initialised={state.initialised}
                        onValueChange={(value, key) => setState({ ...state, [key]: value})}
                     />
                    <RegulationSection 
                        synchronised={state.initialised} 
                        regulation={state.regulation} 
                        consent={state.consent}
                        update={(cosent, regulation) => setState({...state, consent: cosent, regulation: regulation})} 
                    />
                    <AutocacheControl
                        mask={state.autocache}
                        onUpdate={autocache => setState({ ...state, autocache: autocache })}
                    />
                    <BannerSegmentedControl
                        visible={!state.initialised}
                        showStyle={state.bannerShowStyle}
                        onChange={(style) => setState({ ...state, bannerShowStyle: style })}
                    />
                    <ShowSection
                        visible={state.initialised}
                        autocache={state.autocache}
                        bannerOnScreen={state.bannerOnScreen}
                        bannerShowStyle={state.bannerShowStyle}
                        updateBanner={updateBanner}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}