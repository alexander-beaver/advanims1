
import {createStackNavigator} from 'react-navigation-stack';

import {Forward} from '../primary/forward';
import {UserPicker} from '../primary/userPicker';
import SubPrimary from './subPrimaryNavBar';
import { TInput } from '../primary/textInput';

const PrimaryStack = createStackNavigator({
    SubPrimary: SubPrimary,
    Forward: {screen: Forward},
    UserPicker: {screen: UserPicker},
    TextInput: {screen: TInput}
},{
    initialRouteName: 'SubPrimary',
},);

export default PrimaryStack;