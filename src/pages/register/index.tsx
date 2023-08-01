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
import {RegisterUser} from '../../redux/slice/auth';
import {dispatch, useSelector} from '../../hooks/dispatch';
import {selectAuth} from '../../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

function Register({navigation}: Props): JSX.Element {
  const [body, setBody] = useState({
    email: '',
    password: '',
  });
  const dispatchAPI = dispatch;
  const {isLoading} = useSelector(selectAuth);

  useEffect(() => {
    console.log(isLoading);
  }, [dispatchAPI]);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>myContact.</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.loginTxt}>Register</Text>
          <Text style={styles.desc}>
            Create your account to access myContact.
          </Text>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Email"
              isPassword={false}
              iconName="email-outline"
              secureTextEntry={false}
              onChangeText={e => setBody({...body, email: e})}
            />
            <Input
              placeholder="Password"
              isPassword={true}
              iconName="lock-outline"
              onChangeText={e => setBody({...body, password: e})}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              isDisabled={() => {
                if (!body.email && !body.email) {
                  return true;
                }
                return false;
              }}
              title="Register"
              onPress={() => dispatchAPI(RegisterUser(body))}
              isLoading={isLoading}
            />
            <TouchableOpacity>
              <Text
                style={styles.textRegister}
                onPress={() => navigation.navigate('Login')}>
                Already have an account?{' '}
                <Text
                  style={{
                    color: colors.primary,
                  }}>
                  Let’s Login
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
    height: hp(15),
    justifyContent: 'space-between',
  },
  btnWrapper: {
    width: '95%',
    marginTop: ms(150),
    alignItems: 'center',
  },
  textRegister: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: ms(10),
    color: colors.darkGray,
  },
});

export default Register;
