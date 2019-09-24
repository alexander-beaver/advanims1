
import {createStackNavigator} from 'react-navigation-stack';
import {Inbox} from '../primary/inbox';
import {Forward} from '../primary/forward';
import {NewPost} from '../primary/newPost';
const PrimaryStack = createStackNavigator({
    Inbox: {screen: Inbox},
    Forward: {screen: Forward},
    NewPost: {screen: NewPost}
},{
    initialRouteName: 'NewPost',
},);

export default PrimaryStack;