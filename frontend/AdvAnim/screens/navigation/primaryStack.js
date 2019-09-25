
import {createStackNavigator} from 'react-navigation-stack';
import {Inbox} from '../primary/inbox';
import {Forward} from '../primary/forward';
import {NewPost} from '../primary/newPost';
import {UserPicker} from '../primary/userPicker';
const PrimaryStack = createStackNavigator({
    Inbox: {screen: Inbox},
    Forward: {screen: Forward},
    NewPost: {screen: NewPost},
    UserPicker: {screen: UserPicker}
},{
    initialRouteName: 'UserPicker',
},);

export default PrimaryStack;