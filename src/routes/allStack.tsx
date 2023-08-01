import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, TouchableOpacity} from 'react-native';
import {slideFromBottom, fadeInFadeOut} from '../utils/pageTransition';
import {colors} from '../styles';
import {checkIsAuth} from '../utils/loginCheck';

import {Home, Login, Register, User, AddUser} from '../pages';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  User: undefined;
  AddUser: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AllStack() {
  const isAuth = checkIsAuth();
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerTitleAlign: 'center'}}
        initialRouteName="Login">
        {isAuth ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false, ...fadeInFadeOut()}}
            />
            <Stack.Screen
              name="User"
              component={User}
              options={{headerShown: false, ...slideFromBottom()}}
            />
            <Stack.Screen
              name="AddUser"
              component={AddUser}
              options={{headerShown: false, ...slideFromBottom()}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false, ...slideFromBottom()}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false, ...slideFromBottom()}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
