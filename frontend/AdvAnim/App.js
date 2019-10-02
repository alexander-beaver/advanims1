/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import PrimaryStack from './screens/navigation/primaryStack';
import AuthStack from "./screens/navigation/authStack";



export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
          Inbox: PrimaryStack,


        },
        {
          initialRouteName: 'Auth',
        },
    ),
);
