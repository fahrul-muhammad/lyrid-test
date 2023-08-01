import {selectAuth} from '../redux/store';
import {useSelector} from '../hooks/dispatch';

export const checkIsAuth = () => {
  const {isLoginSuccess, isRegisterSuccess} = useSelector(selectAuth);
  if (isLoginSuccess || isRegisterSuccess) {
    return true;
  }
  return false;
};
