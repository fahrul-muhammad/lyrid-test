import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import {Avatar} from '../avatar/onlineAvatar';

interface Props {
  name: string;
  image: string;
  email: string;
  onPress: () => void;
}

function ContactCard(props: Props): JSX.Element {
  const {image = '', name, email, onPress} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <Avatar image={image} isOnline={false} />
      <View>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactEmail}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(9),
    width: '100%',
    marginVertical: ms(2),
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
  },
  contactName: {
    marginLeft: ms(10),
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    fontSize: wp(4),
  },
  contactEmail: {
    marginLeft: ms(10),
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    fontSize: wp(3.5),
  },
});

export default ContactCard;
