
import {createBottomTabNavigator, BottomTabBar} from "react-navigation-tabs";
import {SignIn} from '../auth/signIn';
import {SignUp} from '../auth/signUp';
import {React} from 'react';
const TabBarComponent = props => <BottomTabBar {...props} />;
import Ionicons from 'react-native-vector-icons/Ionicons';


const AuthStack = createBottomTabNavigator({
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp}
});

export default AuthStack;