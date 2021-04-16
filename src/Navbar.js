import React from 'react'
import {View, Text, StyleSheet, Settings, Image, TouchableWithoutFeedback} from "react-native"

export const Navbar = props => {
    return (
        <View style={styles.navbar}>
                <Image 
                style={styles.tinylogo}
                source={require('../assets/settings.png')}/>
                <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#34495e',
        paddingLeft: 10,
        paddingTop: 15,
    },
    text: {
        paddingTop: 10,
        color: 'white',
        fontSize: 20,
        padding: 10
    },
    tinylogo: {
        width:25,
        height:25,
    },
})