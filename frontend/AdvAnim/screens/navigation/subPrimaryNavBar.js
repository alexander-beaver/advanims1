import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Inbox} from '../primary/inbox';
import {NewPost} from '../primary/newPost';
import {Settings} from '../primary/settings';
const SubPrimary = createBottomTabNavigator({
    Inbox: {screen: Inbox},
    NewPost: {screen: NewPost},
    Settings: {screen: Settings}
},{
    title: "EggChat"
});
export default SubPrimary;