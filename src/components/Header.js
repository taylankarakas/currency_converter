import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const Header = ({textProps}) => {
    const {header, headerText} = styles;
    return (
        <View style={header}>
            <Text style={headerText}>{ textProps }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 80 : 60,
        backgroundColor: '#788B91',
        paddingTop: Platform.OS === 'android' ? 0 : 40,
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600'
    }
})

export default Header;