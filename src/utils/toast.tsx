import Toast, {
  ToastPosition,
  ToastType,
  BaseToast,
  ErrorToast,
} from 'react-native-toast-message';
import {colors} from '../styles';

type Props = {
  position: ToastPosition;
  type: ToastType;
  title: string;
  text: string;
};

export const showToast = (props: Props) => {
  const {position, type, title, text} = props;
  Toast.show({
    type: type,
    text1: title,
    text2: text,
    position: position,
  });
};

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        width: '95%',
        borderLeftColor: colors.green,
      }}
      text1Style={{
        fontSize: 15,
        color: colors.black,
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '600',
        color: colors.darkGray,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        width: '95%',
        borderLeftColor: colors.red,
      }}
      text1Style={{
        fontSize: 15,
        color: colors.black,
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '600',
        color: colors.darkGray,
      }}
    />
  ),
};
