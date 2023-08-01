import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {moderateScale as ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  bodyText: string;
  modalVisible: boolean;
  footer: React.ReactNode;
}

export const ModalComponents = (props: Props) => {
  const {bodyText, modalVisible, footer} = props;
  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              {/* <Text style={styles.title}>Are you sure want to delete ?</Text> */}
              <TouchableOpacity activeOpacity={0.8}>
                <Icon name="close" style={styles.closeBtn} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.bodyText}>{bodyText}</Text>
            </View>

            <View style={styles.modalFooter}>{footer}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: '100%',
    width: '100%',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: colors.white,
    minWidth: wp(80),
    minHeight: hp(20),
    borderRadius: 10,
    flexDirection: 'column',
  },
  modalHeader: {
    borderBottomColor: colors.gray,
    height: hp(5),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  closeBtn: {
    fontSize: 25,
    marginRight: ms(6),
    color: colors.absoluteBlack,
  },
  title: {
    marginLeft: ms(6),
    color: colors.absoluteBlack,
    fontFamily: 'Poppins-Bold',
    fontSize: wp(4),
  },
  modalFooter: {
    borderTopColor: colors.gray,
    height: hp(6),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  modalBody: {
    minHeight: hp(9),
    justifyContent: 'center',
    paddingHorizontal: ms(6),
  },
  bodyText: {
    color: colors.absoluteBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: wp(3.5),
  },
});
