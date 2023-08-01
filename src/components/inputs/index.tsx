import React, {useState} from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  secureTextEntry?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  iconName: string;
  onChangeText: (e: string) => void;
  value: string;
}

export const Input = (props: Props) => {
  const {
    secureTextEntry,
    isPassword,
    placeholder,
    iconName,
    onChangeText,
    value,
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      style={[
        style.container,
        {
          borderColor: isFocused ? colors.primary : colors.darkGray,
        },
      ]}>
      {iconName.length > 0 && (
        <Icon
          name={iconName}
          style={[
            style.inputIcon,
            {
              color: isFocused ? colors.primary : colors.darkGray,
            },
          ]}
        />
      )}
      <TextInput
        style={style.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        secureTextEntry={
          isPassword ? (showPassword ? false : true) : secureTextEntry
        }
        placeholderTextColor={colors.darkGray}
        onChangeText={onChangeText}
        value={value}
      />
      {isPassword && (
        <Icon
          onPress={() => setShowPassword(!showPassword)}
          name={showPassword ? 'eye' : 'eye-off'}
          color={!isFocused ? colors.darkGray : colors.primary}
          style={style.eyeIcon}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderColor: colors.darkGray,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1.7,
  },
  inputIcon: {
    paddingRight: 10,
    fontSize: wp(6),
  },
  input: {
    width: '90%',
    height: '100%',
    fontFamily: 'Poppins-Regular',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 16,
    fontSize: wp(5),
  },
});
