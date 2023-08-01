import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {colors} from '../../styles';

interface Props {
  isOnline: boolean;
  image: string;
}

export const Avatar = (props: Props) => {
  const {isOnline, image} = props;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: '90%',
          height: '90%',
          borderRadius: 8,
        }}
        alt="avatar"
        resizeMode="contain"
      />
      {isOnline && <View style={styles.dot} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    position: 'relative',
    // backgroundColor: colors.darkGray,
  },
  dot: {
    backgroundColor: '#37bcac',
    width: 16,
    height: 16,
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 16 / 2,
  },
});
