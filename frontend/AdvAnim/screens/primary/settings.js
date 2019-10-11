import React from 'react';
import {Component, Progres} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  PermissionsAndroid,
} from 'react-native';
import {Card} from '../uielements/card';
import {Header, Input} from 'react-native-elements';
import {Button} from '../uielements/button';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';


var globalStyles = require('../../assets/styles');


export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: "",
      dest: "",
      msg: ""
    }
  }

  static navigationOptions = {
    title: 'Settings',
    header: null,
  };

  logout(){
    var getToken = async() => {
      const userToken = await AsyncStorage.getItem('@token');
      return getToken();
    }
    fetch ('http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/logout',{
      method: 'PUT',
      headers: {
        token: getToken()

      }}).then((res)=>{
        if(res.status == 200){
          var removeValue = async () => {
            try {
              await AsyncStorage.removeItem('@token');
              this.props.navigation.navigate('InitialRouter');

            } catch(e) {
              // remove error
            }
            console.log('Done.')
          }
          removeValue();
        }
        else{
          console.log(res.status);
        }


    });


  }

  render() {
    return (
      <View nativeID="Page">
        
        <View nativeID="Content">
          <View nativeID="forwardWrapper">
            <Button
              title="Log Out"
              colored="true"
              callback={() => this.logout()}
            />

          </View>
        </View>
      </View>
    );
  }


}
