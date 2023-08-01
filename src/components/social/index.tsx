import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  socialMedia: string;
  account: string;
  icon: any;
}

export const SocialMedia = (props: Props) => {
  const {socialMedia = '', account, icon} = props;
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo} />
      <View style={styles.textWrapper}>
        <Text style={styles.social}>{socialMedia}</Text>
        <Text style={styles.userAccount}>{account}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.8}>
          <Icon name="message1" style={styles.btnIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    marginVertical: ms(7),
  },
  logo: {
    width: 43,
    height: 43,
  },
  textWrapper: {
    marginLeft: ms(10),
  },
  userAccount: {
    color: colors.absoluteBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: wp(4),
  },
  social: {
    color: colors.darkGray,
    fontFamily: 'Poppins-Medium',
    fontSize: wp(3.5),
  },
  btnWrapper: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  btnContainer: {
    backgroundColor: colors.gray,
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    color: colors.darkGray,
    fontSize: wp(5),
  },
});
