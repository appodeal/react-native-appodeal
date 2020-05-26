import { StyleSheet, Platform } from 'react-native';


const statusBarHeight = Platform.OS === 'ios' ?
    35 :
    0

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBar: {
        backgroundColor: '#hsl(0, 0%, 97%)',
        height: 44 + statusBarHeight,
        alignSelf: 'stretch',
        paddingTop: statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitle: {
        color: 'black',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'hsl(0, 0%, 97%)',
    },
    sectionHeader: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 8,
        textTransform: 'uppercase',
        color: '#999',
        fontSize: 12,
    },
    sectionFooter: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
        color: '#999',
        fontSize: 12,
    },
    rowContainer: {
        backgroundColor: 'transparent',
        height: 46,
        alignItems: 'stretch',
    },
    borderContainer: {
        alignSelf: 'stretch',
        height: 1,
        paddingLeft: 15,
        backgroundColor: 'white',
    },
    border: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    contentRowContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titlesRowContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    accessoryContainer: {
        alignContent: 'stretch',
        paddingRight: 8
    },
    rowTitle: {
        color: 'black',
        fontSize: 14,
        marginRight: 15,
    },
    banner: {
        height: 50,
        width: '100%',
        backgroundColor: 'hsl(0, 0%, 97%)',
        alignContent: 'stretch',
    },
    mrec: {
        height: 250,
        width: '100%',
        backgroundColor: 'hsl(0, 0%, 97%)',
        alignContent: 'stretch',
    },
    buttonSelected: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: 8,
        height: 26,
        borderRadius: 8,
        fontSize: 14,
        backgroundColor: '#53d769',
    },
    buttonPlain: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: 8,
        borderRadius: 8,
        fontSize: 14,
        backgroundColor: '#ddd'
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 8,
        marginRight: 8,
    }
});