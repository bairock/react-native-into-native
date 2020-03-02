import React, { useEffect } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, Animated, Easing } from 'react-native'
import reactIcon from './assets/react.png'
import backIcon from './assets/back.png'

const App = props => {
  const spinValue = new Animated.Value(0)

  const startAnimation = () => {
    spinValue.setValue(0)
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => startAnimation())
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => startAnimation(), [])

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Image style={styles.backIcon} source={backIcon} />
        </TouchableOpacity>
      </View>
      <Animated.Image style={[styles.reactIcon, { transform: [{ rotate: spin }] }]} source={reactIcon} />
      <View>
        <Text style={styles.title}>React Native Side</Text>
        <Text style={styles.tagline}>Learn once, write anywhere.</Text>
        <Text style={styles.parameter}>Value: {props.nativeParameter}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  title: {
    color: '#61dafb',
    fontSize: 36
  },
  tagline: {
    color: '#fff',
    fontSize: 20,
  },
  parameter: {
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  reactIcon: {
    marginTop: 50,
    width: 300,
    height: 300
  },
  backIcon: {
    height: 25,
    width: 25,
    marginLeft: 20
  },
  parametrContainer: {
    flexDirection: 'row'
  },
  bar: {
    height: 70,
    width: '100%',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('RNTestScreen', () => App);
