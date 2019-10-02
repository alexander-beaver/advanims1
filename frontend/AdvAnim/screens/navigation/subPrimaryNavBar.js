import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Inbox} from '../primary/inbox';
import {NewPost} from '../primary/newPost';
const SubPrimary = createBottomTabNavigator({
    Inbox: {screen: Inbox},
    NewPost: {screen: NewPost}
});
export default SubPrimary;