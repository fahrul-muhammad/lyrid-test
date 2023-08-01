import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../routes/allStack';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {
  SocialMedia,
  Input,
  RegularButton as Button,
  Modal,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {selectUsers} from '../../redux/store';
import {useSelector} from '../../hooks/dispatch';
import {handleEditUser, handleDeleteUser} from '../../hooks/userHandler';
import {modalHandler} from '../../hooks/modalHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

function User({navigation, route}: Props): JSX.Element {
  const user: any = route.params;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [body, setBody] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    job: 'software developer',
  });
  const {isLoading, dataUser} = useSelector(selectUsers);
  const {showModal, setShowModal} = modalHandler();
  const objIndex = dataUser.findIndex((data: any) => data.id == user.id);

  return (
    <View
      style={{
        backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : colors.primary,
      }}>
      <View style={styles.heading}>
        <Image
          source={{
            uri: user.avatar,
          }}
          style={[
            styles.avatar,
            {
              height: '150%',
              width: '100%',
            },
          ]}
          resizeMode="cover"
          blurRadius={2}
        />
        <TouchableOpacity
          style={styles.btnBackPage}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: user.avatar,
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
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
          <Text
            style={
              styles.userName
            }>{`${dataUser[objIndex]?.first_name} ${dataUser[objIndex]?.last_name}`}</Text>
          <TouchableOpacity
            style={[
              styles.editContactBtn,
              {
                backgroundColor: isEdit ? colors.red : colors.primary,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => setIsEdit(!isEdit)}>
            <Icon name={isEdit ? 'x' : 'edit-3'} style={styles.editBtnIcon} />
            <Text style={styles.editBtnText}>
              {isEdit ? 'Cancel' : 'Edit Contact'}
            </Text>
          </TouchableOpacity>
          {isEdit && (
            <>
              <View style={{width: '100%'}}>
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
                  Job
                </Text>
                <Input
                  placeholder="Job"
                  iconName=""
                  secureTextEntry={false}
                  onChangeText={e => setBody({...body, job: e})}
                  isPassword={false}
                  value={body.job}
                />
                <View style={{marginTop: ms(10)}}>
                  <Button
                    isDisabled={() => isLoading}
                    onPress={() =>
                      handleEditUser({body, objIndex, user: user.id})
                    }
                    title="Save"
                    // isLoading={isLoading}
                  />
                </View>
              </View>
            </>
          )}
          <View style={styles.socialMediaWrapper}>
            <SocialMedia
              socialMedia="WhatsApp"
              account="+62823456789"
              icon={require(`../../assets/img/whatsapp-logo.png`)}
            />
            <SocialMedia
              socialMedia="Email"
              icon={require(`../../assets/img/email-logo.png`)}
              account={`${user.first_name}.${user.last_name}@gmail.com`}
            />
            <SocialMedia
              socialMedia="Line"
              icon={require(`../../assets/img/line-logo.png`)}
              account={`@${user.first_name}.${user.last_name}`}
            />
            <SocialMedia
              socialMedia="Telegram"
              icon={require(`../../assets/img/telegram-logo.png`)}
              account={`@${user.first_name}.${user.last_name}`}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginBottom: ms(30)}}
          onPress={() => {
            setShowModal(true);
          }}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Text style={styles.deleteBtn}>Delete Contact</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        modalVisible={showModal}
        bodyText="Are you sure want to delete this contact?"
        footer={
          <>
            <View
              style={{
                width: '65%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: ms(6),
              }}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={[
                  styles.btnConfirm,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
                activeOpacity={0.8}>
                <Text style={styles.btnConfirmText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  handleDeleteUser({
                    objIndex,
                    userID: user.id,
                    navigation: navigation,
                  });
                }}
                style={[
                  styles.btnConfirm,
                  {
                    backgroundColor: colors.darkGray,
                  },
                ]}
                activeOpacity={0.8}>
                <Text style={styles.btnConfirmText}>yes</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  heading: {
    width: '100%',
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  body: {
    backgroundColor: colors.white,
    width: '100%',
    height: '45%',
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
    backgroundColor: colors.primary,
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
});

export default User;
