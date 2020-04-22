import React, { useEffect } from 'react';
import { styles } from './styles';
import { initialize } from './advertising';
import {
    Switch,
    ScrollView,
    SafeAreaView,
    View,
} from 'react-native';
import {
    SectionHeader,
    Row,
    NavigationBar,
    AutocacheControl,
    AdStatusFooter,
} from './components';
import {
    AppodealBanner,
    AppodealAdType,
    Appodeal
} from 'react-native-appodeal';


interface AppState {
    initialised: boolean,
    bannerOnScreen: boolean,
    consent: boolean,
    test: boolean,
    autocache: number
}

export const App = () => {
    const [state, setState] = React.useState<AppState>({
        initialised: false,
        bannerOnScreen: false,
        consent: true,
        test: true,
        autocache: AppodealAdType.INTERSTITIAL
    })

    useEffect(() => {
        function initIfNeeded() {
            if (!state.initialised) {
                return
            }
            initialize(state.consent, state.test)
            setState({ ...state, bannerOnScreen: true })
        }
        initIfNeeded()
    }, [state.initialised]);

    useEffect(() => Appodeal.updateConsent(state.consent), [state.consent]);
    useEffect(() => {
        Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, state.autocache & AppodealAdType.INTERSTITIAL)
        Appodeal.setAutoCache(AppodealAdType.BANNER, state.autocache & AppodealAdType.BANNER)
        Appodeal.setAutoCache(AppodealAdType.REWARDED_VIDEO, state.autocache & AppodealAdType.REWARDED_VIDEO)
    }, [state.autocache]);

    const toggle = (name: keyof AppState) => () => setState({ ...state, [name]: !state[name] })

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
                <SectionHeader value="Banner ads" />
                {state.bannerOnScreen ? <AppodealBanner style={styles.banner} adSize='phone' /> : null}
                {
                    state.autocache & AppodealAdType.BANNER ? null :
                        <Row
                            title='Cache static banner'
                            onClick={() => Appodeal.cache(AppodealAdType.REWARDED_VIDEO)}
                        />
                }
                <Row
                    title={state.bannerOnScreen ? 'Hide custom banner' : 'Show custom banner'}
                    onClick={() => setState({ ...state, bannerOnScreen: !state.bannerOnScreen })}
                />
                <Row
                    title='Show static banner top'
                    onClick={() => Appodeal.show(AppodealAdType.BANNER_TOP)}
                />
                <Row
                    title='Show static banner bottom'
                    onClick={() => Appodeal.show(AppodealAdType.BANNER_BOTTOM)}
                />
                <Row
                    title='Hide static banner'
                    onClick={() => Appodeal.hide(AppodealAdType.BANNER)}
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
        <SafeAreaView style={styles.container}>
            <NavigationBar />
            <ScrollView style={styles.scrollView}>
                <InitialisationGroup/>
                <AutocacheControl
                    mask={state.autocache}
                    onUpdate={autocache => setState({ ...state, autocache: autocache })}
                />
                {state.initialised ? <ShowGroup /> : null}
            </ScrollView>
        </SafeAreaView>
    );
}