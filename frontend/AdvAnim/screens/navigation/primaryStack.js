
import {createStackNavigator} from 'react-navigation-stack';
import {Inbox} from '../primary/inbox';
const PrimaryStack = createStackNavigator({
    Inbox: {screen: Inbox},
});

export default PrimaryStack;