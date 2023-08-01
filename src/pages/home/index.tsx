import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ContactCard, SearchInput, Avatar, Loading} from '../../components';
import {moderateScale as ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/allStack';
import {userHandler} from '../../hooks/userData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props): JSX.Element {
  const {data, isLoading}: any = userHandler();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <ScrollView
            style={{
              backgroundColor: colors.white,
            }}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.searchWrapper}>
              <Text style={styles.blueTitle}>Contact</Text>
              <Text style={styles.subTitle}>Welcom To myContact.</Text>
            </View>
            <View style={styles.contactWrapper}>
              <Text style={styles.blackTitle}>Online</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {data?.map((val: any, idx: number) => (
                  <View
                    style={{
                      marginRight: ms(5),
                    }}>
                    <Avatar key={idx} isOnline={true} image={val?.avatar} />
                    <Text style={styles.contactName}>{val?.first_name}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.myContactWrapper}>
                <Text
                  style={
                    styles.blackTitle
                  }>{`My Contact(${data?.length})`}</Text>
                <FlatList
                  data={data}
                  scrollEnabled={true}
                  renderItem={({index, item}) => {
                    return (
                      <>
                        <ContactCard
                          onPress={() => {
                            let data = item;
                            navigation.navigate('User', data);
                          }}
                          key={index}
                          email={item?.email}
                          image={item?.avatar}
                          name={`${item?.first_name} ${item?.last_name}`}
                        />
                      </>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.btnAdd}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddUser')}>
            <Icon name="adduser" style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: '2%',
    marginBottom: ms(15),
    position: 'relative',
  },

  blueTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(7),
    color: colors.primary,
    marginBottom: ms(15),
  },
  contactWrapper: {
    paddingHorizontal: '2%',
    flex: 1,
    backgroundColor: colors.white,
  },
  blackTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(5),
    color: colors.black,
    marginVertical: ms(2),
  },
  myContactWrapper: {
    marginTop: ms(5),
    position: 'relative',
  },
  contactName: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  btnAdd: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  addIcon: {
    fontSize: wp(7),
    color: colors.white,
  },
  subTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(5),
    color: colors.primary,
  },
});

export default Home;
