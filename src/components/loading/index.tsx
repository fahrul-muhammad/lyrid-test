import React from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

export const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <LottieView
        source={require('../../assets/animation/loading.json')}
        style={{
          width: '50%',
          height: '50%',
        }}
        autoPlay
        loop
        speed={1}
      />
    </View>
  );
};
