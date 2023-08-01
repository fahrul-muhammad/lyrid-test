import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {showToast} from '../../utils/toast';

interface Props {
  isDisabled: () => boolean;
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

export const RegularButton = (props: Props) => {
  const {isDisabled, title, onPress, isLoading} = props;
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={[
          style.button,
          {
            backgroundColor: isDisabled() ? colors.gray : colors.primary,
          },
        ]}
        disabled={isLoading || isDisabled()}
        activeOpacity={0.7}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <Text style={style.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...colors.boxShadow,
    height: hp(6.5),
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
    fontSize: wp(4),
  },
});
