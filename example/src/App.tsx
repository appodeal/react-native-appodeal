import React, { useEffect } from 'react';
import { styles } from './styles';
import { initialize } from './advertising';
import {
    Switch,
    ScrollView,
    SafeAreaView,
    View,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import {
    SectionHeader,
    Row,
    NavigationBar,
    AutocacheControl,
    AdStatusFooter,
    BannerSegmentedControl,
} from './components';
import {
    AppodealBanner,
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


export const App = () => {
    const [state, setState] = React.useState<AppState>({
        initialised: false,
        initialising: false,
        bannerOnScreen: false,
        regulation: AppodealConsentRegulation.UNKNOWN,
        consent: AppodealConsentStatus.UNKNOWN,
        test: true,
        autocache: AppodealAdType.INTERSTITIAL | AppodealAdType.BANNER,
        bannerShowStyle: BannerShowStyle.BOTTOM
    })

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

    useEffect(() => Appodeal.updateConsent(state.consent), [state.consent]);
    useEffect(() => {
        const types = [AppodealAdType.INTERSTITIAL, AppodealAdType.REWARDED_VIDEO, AppodealAdType.BANNER]
        types.forEach(adType => Appodeal.setAutoCache(adType, (state.autocache & adType) > 0))
    }, [state.autocache]);

    const toggle = (name: keyof AppState) => () => setState({ ...state, [name]: !state[name] })

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

    const ShowGroup = () => {
        return (
            <View>
                <SectionHeader value="Interstitial" />
                {
                    state.autocache & AppodealAdType.INTERSTITIAL ? null :
                        <Row
                            title='Cache interstitial'
                            onClick={() => Appodeal.cache(AppodealAdType.INTERSTITIAL)}
                        />
                }
                <Row
                    title='Show interstitial'
                    onClick={() => Appodeal.show(AppodealAdType.INTERSTITIAL)}
                />
                <AdStatusFooter adType={AppodealAdType.INTERSTITIAL} />
                <SectionHeader value="Rewarded ads" />
                {
                    state.autocache & AppodealAdType.REWARDED_VIDEO ? null :
                        <Row
                            title='Cache rewarded'
                            onClick={() => Appodeal.cache(AppodealAdType.REWARDED_VIDEO)}
                        />
                }
                <Row
                    title='Show rewarded'
                    onClick={() => Appodeal.show(AppodealAdType.REWARDED_VIDEO)}
                />
                <AdStatusFooter adType={AppodealAdType.REWARDED_VIDEO} />
                <SectionHeader value={"Banner " + state.bannerShowStyle} />
                {
                    state.autocache & AppodealAdType.BANNER ? null :
                        <Row
                            title='Cache banner'
                            onClick={() => Appodeal.cache(AppodealAdType.BANNER)}
                        />
                }
                <Row
                    title={state.bannerOnScreen ?
                        'Hide banner' :
                        'Show banner'
                    }
                    onClick={updateBanner}
                />
                <AdStatusFooter adType={AppodealAdType.BANNER} />
            </View>
        )
    }

    const RegulationGroup = () => {
        return (
            <View>
                <SectionHeader value="Regulation" />
                <Row title={"Regulation: " + ["unknown 🏴", "none 🏳", "GDPR 🇪🇺", "CCPA 🇺🇸"][state.regulation]} />
                <Row title={"Consent status: " + ["unknown", "non personalised", "partly personalised", "personalised"][state.consent]} />
            </View>
        )
    }

    const InitialisationGroup = () => {
        return (
            <View>
                <SectionHeader value="Initialisation" />
                <Row
                    title='Test mode'
                    accessory={() => <Switch
                        value={state.test}
                        disabled={state.initialised}
                        onValueChange={toggle('test')}
                    />}
                />
                <Row
                    title='Initialise'
                    accessory={() => state.initialising ?
                        <ActivityIndicator /> :
                        <Switch
                            value={state.initialised}
                            disabled={state.initialised}
                            onValueChange={toggle('initialising')}
                        />}
                />
            </View>
        )
    }


    return (
        <>
            <StatusBar />
            <NavigationBar />
            {isViewBannerStyle(state.bannerShowStyle) && state.bannerOnScreen ?
                <AppodealBanner
                    style={styles.banner}
                    adSize='phone'
                    onAdLoaded={() => console.log("Banner view did load")}
                    onAdExpired={() => console.log("Banner view expired")}
                    onAdClicked={() => console.log("Banner view is clicked")}
                    onAdFailedToLoad={() => console.log("Banner view is failed to load")}
                /> :
                null}
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <InitialisationGroup />
                    <RegulationGroup />
                    <AutocacheControl
                        mask={state.autocache}
                        onUpdate={autocache => setState({ ...state, autocache: autocache })}
                    />
                    {state.initialised ? null :
                        <BannerSegmentedControl
                            showStyle={state.bannerShowStyle}
                            onChange={(style) => setState({ ...state, bannerShowStyle: style })}
                        />
                    }
                    {state.initialised ? <ShowGroup /> : null}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}