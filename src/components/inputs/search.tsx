import React, {useState} from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  onChangeText: (e: string) => void;
}

export const SearchInput = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      style={[
        style.container,
        isFocused
          ? {
              ...colors.boxShadow,
              borderColor: isFocused ? colors.primary : colors.darkGray,
            }
          : null,
      ]}>
      <Icon
        name={'account-search'}
        style={[
          style.inputIcon,
          {
            color: isFocused ? colors.primary : colors.darkGray,
          },
        ]}
      />
      <TextInput
        style={style.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={'Search Name Here'}
        placeholderTextColor={colors.darkGray}
        // onChangeText={onChangeText}
      />
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderColor: '#f0f1f2',
    borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f3f4f5',
  },
  inputIcon: {
    paddingRight: 10,
    fontSize: wp(6),
    color: '#dedfe1',
  },
  input: {
    width: '90%',
    height: '100%',
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
});
