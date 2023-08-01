import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RootStackParamList} from '../../routes/allStack';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Input, RegularButton as Button} from '../../components';
import {selectUsers} from '../../redux/store';
import {useSelector} from '../../hooks/dispatch';
import {launchImageLibrary} from 'react-native-image-picker';
import {handleAddNewUser} from '../../hooks/userHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'AddUser'>;
let uid = new Date().getTime().toString(36);

function AddUser({navigation}: Props) {
  const [body, setBody] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    id: uid,
  });
  const {isLoading} = useSelector(selectUsers);

  const options: any = {includeBase64: true};

  const openLibrary = () => {
    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel) {
        setBody({
          ...body,
          avatar: response.assets[0].uri,
        });
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.btnBackPage}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.avatarWrapper}>
          {body.avatar ? (
            <Image
              source={{
                uri: body.avatar,
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome name="user" style={styles.userIcon} />
          )}
        </View>
        <View
          style={{
            marginTop: 60,
          }}></View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.editContactBtn,
              {
                backgroundColor: colors.primary,
              },
            ]}
            activeOpacity={0.8}
            onPress={async () => openLibrary()}>
            <Icon name={'add'} style={styles.editBtnIcon} />
            <Text style={styles.editBtnText}>Add Image</Text>
          </TouchableOpacity>
          <>
            <View style={{width: '100%', marginTop: ms(25)}}>
              <Text style={styles.label}>First Name</Text>
              <Input
                placeholder="First Name"
                iconName=""
                secureTextEntry={false}
                onChangeText={e =>
                  setBody({
                    ...body,
                    first_name: e.charAt(0).toLocaleUpperCase() + e.slice(1),
                  })
                }
                isPassword={false}
                value={body.first_name}
              />
              <Text
                style={[
                  styles.label,
                  {
                    marginTop: ms(10),
                  },
                ]}>
                Last Name
              </Text>
              <Input
                placeholder="Last Name"
                iconName=""
                secureTextEntry={false}
                onChangeText={e =>
                  setBody({
                    ...body,
                    last_name: e.charAt(0).toLocaleUpperCase() + e.slice(1),
                  })
                }
                isPassword={false}
                value={body.last_name}
              />
              <Text
                style={[
                  styles.label,
                  {
                    marginTop: ms(10),
                  },
                ]}>
                Email
              </Text>
              <Input
                placeholder="Email"
                iconName=""
                secureTextEntry={false}
                onChangeText={e => setBody({...body, email: e})}
                isPassword={false}
                value={body.email}
              />
              <View style={{marginTop: ms(120)}}>
                <Button
                  isDisabled={() => isLoading}
                  onPress={() =>
                    handleAddNewUser({body, data: body, navigation})
                  }
                  title="Save"
                  isLoading={isLoading}
                />
              </View>
            </View>
          </>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  heading: {
    width: '100%',
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.primary,
  },
  body: {
    backgroundColor: colors.white,
    width: '100%',
    height: hp(75),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: ms(20),
    alignItems: 'center',
    position: 'relative',
  },
  avatarWrapper: {
    width: 120,
    height: 125,
    borderRadius: 30,
    position: 'absolute',
    top: '-10%',
    ...colors.boxShadow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  avatar: {
    height: '95%',
    width: '95%',
    borderRadius: 30,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: wp(4.8),
  },
  editContactBtn: {
    backgroundColor: colors.primary,
    width: wp(35),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    ...colors.boxShadow,
  },
  editBtnText: {
    color: colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: wp(3.5),
  },
  editBtnIcon: {
    color: colors.white,
    fontSize: wp(4),
    marginRight: ms(8),
  },
  socialMediaWrapper: {
    width: '100%',
    marginTop: ms(10),
  },
  label: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: wp(3.5),
  },
  btnBackPage: {
    position: 'absolute',
    ...colors.boxShadow,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    top: '2%',
    left: '2%',
  },
  backIcon: {
    fontSize: 25,
    color: colors.black,
  },
  deleteBtn: {
    color: colors.red,
    fontFamily: 'Poppins-SemiBold',
  },
  btnConfirm: {
    width: wp(25),
    height: hp(5),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConfirmText: {
    color: colors.white,
    fontFamily: 'Poppins-Medium',
  },
  userIcon: {
    color: colors.black,
    fontSize: wp(10),
  },
});

export default AddUser;
