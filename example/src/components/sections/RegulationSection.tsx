import React from 'react';
import { View } from 'react-native';
import { SectionHeader, Row } from '..';
import { AppodealConsentRegulation, AppodealConsentStatus, Appodeal } from 'react-native-appodeal';


interface RegulationSectionProps {
    synchronised: boolean,
    regulation: AppodealConsentRegulation,
    consent: AppodealConsentStatus,
    update(consent: AppodealConsentStatus, regulation: AppodealConsentRegulation): void
}

export const RegulationSection = (props: RegulationSectionProps) => {
    const regulations = [
        "unknown 🏴", 
        "none 🏳",
        "GDPR 🇪🇺", 
        "CCPA 🇺🇸"
    ]

    const statuses = [
        "unknown", 
        "non personalised", 
        "partly personalised", 
        "personalised"
    ]

    return (
        <View>
            <SectionHeader value="Regulation" />
            <Row title={"Regulation: " + regulations[props.regulation]} />
            <Row title={"Consent status: " + statuses[props.consent]} />
            {props.synchronised ? (
                <Row 
                    title={"Force show consent dialog"} 
                    onClick={() => Appodeal.forceShowConsentDialog(props.update)}/>
            ) : null}
        </View>
    )
}