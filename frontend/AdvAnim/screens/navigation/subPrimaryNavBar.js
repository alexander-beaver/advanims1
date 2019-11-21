import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Inbox} from '../primary/inbox';
import {NewPost} from '../primary/newPost';
import {Settings} from '../primary/settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";

const SubPrimary = createBottomTabNavigator({
    Inbox: {screen: Inbox},
    NewPost: {screen: NewPost},
    Settings: {screen: Settings}
},{
    title: "EggChat",
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'Inbox') {
                iconName = `ios-home`;
            } else if (routeName === 'Settings') {
                iconName = `ios-options`;
            } else if(routeName == 'NewPost'){
                iconName = `ios-add-circle-outline`
            }

            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor}/>;

        },
    })
});
export default SubPrimary;