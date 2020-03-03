import React, { useEffect } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    BackHandler,
    Platform,
    NativeModules,
    SafeAreaView,
    Animated,
    Easing
} from 'react-native'

const mainBackColor = '#282c34'

const App = ({ nativeParameter }) => {
    const spinValue = new Animated.Value(0)

    const startAnimation = () => {
        spinValue.setValue(0)
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear
        }).start(() => startAnimation())
    }

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => startAnimation(), [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainBackColor }}>
            <View style={styles.container}>
                <View style={styles.bar}>
                    <TouchableOpacity
                        onPress={() => {
                            if (Platform.OS === 'ios') {
                                NativeModules.NativeModule.closeRNApp()
                            } else {
                                BackHandler.exitApp()
                            }
                        }}
                    >
                        <Image style={styles.backIcon} source={require('./assets/back.png')} />
                    </TouchableOpacity>
                </View>
                <Animated.Image
                    style={[styles.reactIcon, { transform: [{ rotate: spin }] }]}
                    source={require('./assets/react.png')}
                />
                <View>
                    <Text style={styles.title}>React Native Side</Text>
                    <Text style={styles.parameter}>Value from Native app:</Text>
                    <Text style={styles.nativeParameter}>
                        {nativeParameter ? nativeParameter : '-'}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: mainBackColor
    },
    title: {
        color: '#61dafb',
        fontSize: 36
    },
    parameter: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    nativeParameter: {
        fontSize: 20,
        marginTop: 10,
        color: 'white'
    },
    reactIcon: {
        marginTop: 50,
        width: 200,
        height: 200
    },
    backIcon: {
        height: 23,
        width: 23,
        marginLeft: 20
    },
    bar: {
        height: 70,
        width: '100%',
        justifyContent: 'center'
    }
})

AppRegistry.registerComponent('RNTestScreen', () => App)
