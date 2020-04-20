import React, { useEffect } from 'react';
import { styles } from '../styles';
import { AppodealAdType, Appodeal, AppodealInterstitialEvent, AppodealBanner, AppodealBannerEvent, AppodealRewardedEvent } from 'react-native-appodeal';
import {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


export const SectionHeader = ({ value }) => {
    return (
        <Text style={styles.sectionHeader}>
            {value}
        </Text>
    )
}


export const Row = ({ title, onClick, accessory }) => {
    return (
        <TouchableHighlight onPress={() => onClick && onClick()}>
            <View style={styles.rowContainer}>
                <View style={styles.contentRowContainer}>
                    <View style={styles.titlesRowContainer}>
                        <Text style={styles.rowTitle}>{title}</Text>
                    </View>
                    <View style={styles.accessoryContainer}>
                        {accessory && accessory()}
                    </View>
                </View>
                <View style={styles.borderContainer}>
                    <View style={styles.border} />
                </View>
            </View>
        </TouchableHighlight>
    );
}


export const NavigationBar = () => {
    const [state, setState] = React.useState('')
    
    useEffect(() => Appodeal.getVersion(ver => setState(ver)), [])

    return (
        <View style={styles.navBar}>
            <Text style={styles.navBarTitle}>Appodeal {state}</Text>
        </View>
    )
}


export const AutocacheControl = ({ mask, onUpdate }) => {
    const CustomButton = ({ title, selected, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={selected ? styles.buttonSelected : styles.buttonPlain}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const update = (adType) => {
        let newMask = mask
        if (newMask & adType) {
            newMask &= ~adType
        } else {
            newMask |= adType
        }
        onUpdate(newMask)
    }

    return (
        <View>
            <Text style={styles.sectionHeader}>Autocache</Text>
            <View style={styles.rowContainer}>
                <ScrollView pagingEnabled horizontal={true}>
                    <CustomButton
                        title="Banner"
                        selected={mask & AppodealAdType.BANNER}
                        onPress={() => update(AppodealAdType.BANNER)}
                    />
                    <CustomButton
                        title="Interstitial"
                        selected={mask & AppodealAdType.INTERSTITIAL}
                        onPress={() => update(AppodealAdType.INTERSTITIAL)}
                    />
                    <CustomButton
                        title="Rewarded"
                        selected={mask & AppodealAdType.REWARDED_VIDEO}
                        onPress={() => update(AppodealAdType.REWARDED_VIDEO)}
                    />
                </ScrollView>
            </View>
        </View>
    )
}


export const AdStatusFooter = ({ adType }) => {
    const [state, setState] = React.useState({ canShow: false, ecpm: 0.0 })

    const updateState = () => {
        Appodeal.canShow(adType, 'default', result => setState({ ...state, canShow: result }))
        Appodeal.predictedEcpm(adType, result => setState({ ...state, ecpm: result }))
    }

    return (
        <TouchableOpacity onPress={updateState}>
            <View>
                <Text style={styles.sectionFooter}>
                    {state.canShow ? 'Can' : 'Can not'} show. Predicted eCPM {state.ecpm}
                </Text>
            </View>
        </TouchableOpacity>
    )
}