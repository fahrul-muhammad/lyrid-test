import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import {Input, RegularButton as Button} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/allStack';
import {LoginUser} from '../../redux/slice/auth';
import {dispatch, useSelector} from '../../hooks/dispatch';
import {selectAuth} from '../../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: Props): JSX.Element {
  const [body, setBody] = useState({
    email: '',
    password: '',
  });
  const dispatchAPI = dispatch;
  const {isLoading} = useSelector(selectAuth);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>myContact.</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.loginTxt}>Login</Text>
          <Text style={styles.desc}>
            Login to your existing account to access all the features in
            myContact.
          </Text>
          <View style={styles.inputWrapper}>
            <Input
              value={body.email}
              placeholder="Email"
              isPassword={false}
              iconName="email-outline"
              secureTextEntry={false}
              onChangeText={e => setBody({...body, email: e})}
            />
            <Input
              value={body.password}
              placeholder="Password"
              isPassword={true}
              iconName="lock-outline"
              onChangeText={e => setBody({...body, password: e})}
              secureTextEntry={true}
            />
            <Text style={styles.forgotPasswordText}>
              Forgot your password ?
            </Text>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              isDisabled={() => {
                if (!body.email && !body.email) {
                  return true;
                }
                return false;
              }}
              title="Login"
              onPress={() => {
                dispatchAPI(LoginUser(body));
              }}
              isLoading={isLoading}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.textRegister}>
                Don’t have an account?{' '}
                <Text
                  style={{
                    color: colors.primary,
                  }}>
                  Let’s Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    position: 'relative',
  },
  heading: {
    backgroundColor: colors.primary,
    width: '100%',
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: wp(6),
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    backgroundColor: colors.white,
    width: '100%',
    height: hp(72),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: ms(20),
    alignItems: 'center',
  },
  loginTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    fontSize: wp(5),
  },
  desc: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: colors.darkGray,
    fontSize: wp(3.5),
    paddingHorizontal: ms(50),
    marginTop: ms(12),
  },
  inputWrapper: {
    width: '95%',
    marginTop: ms(50),
    height: hp(19),
    justifyContent: 'space-between',
  },
  btnWrapper: {
    width: '95%',
    marginTop: ms(120),
    alignItems: 'center',
  },
  textRegister: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: ms(10),
    color: colors.darkGray,
  },
  forgotPasswordText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
    fontSize: 13,
  },
});

export default Login;
