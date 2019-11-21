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
import {InitialRouter} from "./screens/initalRouter";


export default createAppContainer(
    createSwitchNavigator(
        {
            InitialRouter:InitialRouter,
            Auth: AuthStack,
          Inbox: PrimaryStack,


        },
        {
          initialRouteName: 'InitialRouter',
        },
    ),
);
