import React, { useEffect } from 'react';
import { styles } from '../styles';
import {
    AppodealAdType,
    Appodeal,
} from 'react-native-appodeal';
import {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


export const SectionHeader = (props: { value: string }) => {
    return (
        <Text style={styles.sectionHeader}>
            {props.value}
        </Text>
    )
}


export const Row = (props: {
    title: string,
    onClick?(): void,
    accessory?(): any
}) => {
    return (
        <TouchableHighlight onPress={() => props.onClick && props.onClick()}>
            <View style={styles.rowContainer}>
                <View style={styles.contentRowContainer}>
                    <View style={styles.titlesRowContainer}>
                        <Text style={styles.rowTitle}>{props.title}</Text>
                    </View>
                    <View style={styles.accessoryContainer}>
                        {props.accessory && props.accessory()}
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

    useEffect(() => Appodeal.getVersion((ver: string) => setState(ver)), [])

    return (
        <View style={styles.navBar}>
            <Text style={styles.navBarTitle}>Appodeal {state}</Text>
        </View>
    )
}


export const AutocacheControl = (props: {
    mask: number,
    onUpdate(mask: number): void
}) => {

    const CustomButton = (props: {
        title: string,
        selected: boolean,
        onPress(): void
    }) => {
        return (
            <TouchableOpacity onPress={props.onPress}>
                <View style={props.selected ?
                    styles.buttonSelected :
                    styles.buttonPlain
                }>
                    <Text style={styles.buttonText}>
                        {props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const update = (adType: number) => {
        let newMask = props.mask
        if (newMask & adType) {
            newMask &= ~adType
        } else {
            newMask |= adType
        }
        props.onUpdate(newMask)
    }

    return (
        <View>
            <Text style={styles.sectionHeader}>Autocache</Text>
            <View style={styles.rowContainer}>
                <ScrollView pagingEnabled horizontal={true}>
                    <CustomButton
                        title="Banner"
                        selected={(props.mask & AppodealAdType.BANNER) > 0}
                        onPress={() => update(AppodealAdType.BANNER)}
                    />
                    <CustomButton
                        title="Interstitial"
                        selected={(props.mask & AppodealAdType.INTERSTITIAL) > 0}
                        onPress={() => update(AppodealAdType.INTERSTITIAL)}
                    />
                    <CustomButton
                        title="Rewarded"
                        selected={(props.mask & AppodealAdType.REWARDED_VIDEO) > 0}
                        onPress={() => update(AppodealAdType.REWARDED_VIDEO)}
                    />
                </ScrollView>
            </View>
        </View>
    )
}


export const AdStatusFooter = (props: {
    adType: number
}) => {
    const [state, setState] = React.useState({
        canShow: false,
        ecpm: 0.0
    })

    const updateState = () => {
        Appodeal.canShow(
            props.adType,
            'default',
            (result: boolean) => setState({ ...state, canShow: result })
        )
        Appodeal.predictedEcpm(
            props.adType,
            (result: number) => setState({ ...state, ecpm: result })
        )
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