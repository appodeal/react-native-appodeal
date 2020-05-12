import React, { useEffect } from 'react';
import { styles } from '../styles';
import { BannerShowStyle } from '../advertising';
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
    Platform,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';


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
        Appodeal.canShow(props.adType, null, (result: boolean) =>
            setState(prev => ({ ...prev, canShow: result }))
        )
        Appodeal.predictedEcpm(props.adType, (result: number) =>
            setState(prev => ({ ...prev, ecpm: result }))
        )
    }

    return (
        <TouchableOpacity onPress={updateState}>
            <View>
                <Text style={styles.sectionFooter} numberOfLines={2}>
                    {state.canShow ? "Can" : "Can't"} show. {'\n'} Predicted eCPM is {state.ecpm}.
                </Text>
            </View>
        </TouchableOpacity>
    )
}


export const BannerSegmentedControl = (props: {
    showStyle: BannerShowStyle,
    onChange(showStyle: BannerShowStyle): void
}) => {
    let showStyles = [
        BannerShowStyle.BOTTOM,
        BannerShowStyle.TOP,
    ]

    if (Platform.OS === "ios") {
        showStyles.push(BannerShowStyle.VIEW)
    }

    const index = () => {
        return showStyles.indexOf(props.showStyle)
    }

    return (
        <View>
            <Text style={styles.sectionHeader}>Banner style</Text>
            <View style={styles.rowContainer}>
                <SegmentedControl
                    style={{margin: 8}}
                    values={showStyles}
                    selectedIndex={index()}
                    onChange={(event) => props.onChange(showStyles[event.nativeEvent.selectedSegmentIndex])}
                />
            </View>
        </View>
    );
}