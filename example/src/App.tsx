import React, { useEffect } from 'react';
import { styles } from './styles';
import { initialize } from './advertising';
import {
    Switch,
    ScrollView,
    SafeAreaView,
    View,
    StatusBar,
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
    Appodeal
} from 'react-native-appodeal';
import {
    BannerShowStyle,
    isViewBannerStyle,
    bannerAdType,
} from './advertising';


interface AppState {
    initialised: boolean,
    bannerOnScreen: boolean,
    consent: boolean,
    test: boolean,
    autocache: number,
    bannerShowStyle: BannerShowStyle
}


export const App = () => {
    const [state, setState] = React.useState<AppState>({
        initialised: false,
        bannerOnScreen: false,
        consent: true,
        test: true,
        autocache: AppodealAdType.INTERSTITIAL | AppodealAdType.BANNER,
        bannerShowStyle: BannerShowStyle.BOTTOM
    })

    useEffect(() => {
        function initIfNeeded() {
            if (!state.initialised) {
                return
            }
            initialize(state.consent, state.test)
        }
        initIfNeeded()
    }, [state.initialised]);

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

    const InitialisationGroup = () => {
        return (
            <View>
                <SectionHeader value="Initialisation" />
                <Row
                    title='User consent'
                    accessory={() => <Switch value={state.consent} onValueChange={toggle('consent')} />}
                />
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
                    accessory={() => <Switch
                        value={state.initialised}
                        disabled={state.initialised}
                        onValueChange={toggle('initialised')}
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
                /> :
                null}
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <InitialisationGroup />
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