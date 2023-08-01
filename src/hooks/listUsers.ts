import React, {useEffect, useState} from 'react';
import {selectUsers} from '../redux/store';
import {dispatch, useSelector} from './dispatch';
import {GetAllUsers} from '../redux/slice/users';

export const ListUsers = (deps: any) => {
  const [user, setUser] = useState();
  const dispatchAPI = dispatch;
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatchAPI(GetAllUsers(1));
  }, [deps]);
  return {user, setUser};
};
