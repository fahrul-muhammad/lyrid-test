import {useState, useEffect} from 'react';
import {selectUsers} from '../redux/store';
import {dispatch, useSelector} from '../hooks/dispatch';
import {GetAllUsers} from '../redux/slice/users';

export const userHandler = (navigation: any) => {
  const dispatchAPI = dispatch;
  const {dataUser, isLoading}: any = useSelector(selectUsers);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState();

  useEffect(() => {
    if (dataUser.length <= 0) {
      dispatchAPI(GetAllUsers()).then(() => {
        setData(data);
      });
    }
  }, []);

  useEffect(() => {
    setData(dataUser);
  }, [dataUser]);

  return {data, setData, isLoading, setSearch, search};
};
