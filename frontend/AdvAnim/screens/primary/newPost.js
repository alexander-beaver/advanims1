import React from 'react';
import {Component, Progres} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  PermissionsAndroid, AsyncStorage,
} from 'react-native';
import {Card} from '../uielements/card';
import {Header, Input} from 'react-native-elements';
import {Button} from '../uielements/button';
import ImagePicker from 'react-native-image-picker';
import ProcessOperation from '../Processing/ProcessOperation';
var globalStyles = require('../../assets/styles');

const ipOptions = {
  title: 'Select Media',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: "",
      dest: "",
      msg: ""
    }
  }

  static navigationOptions = {
    title: 'New Post',
    header: null,
  };

  submit = async () =>{
    var po = new ProcessOperation();
    if(this.state.media && this.state.msg){
      this.state.media = po.convertBase64ToEncodableFormat(this.state.media);
      console.info(this.state.media);

      const userToken = await AsyncStorage.getItem('@token');
      const username = await AsyncStorage.getItem('@un');
      console.info({
        "method": "POST",
        "headers": {
          "token": `${userToken}`,
          "username": `${username}`,
          "message": `${this.state.msg}`,
          "content-type": "application/json"
        },
        "body": {
          "content":`${this.state.media}`
        }
      });

      fetch("http://ec2-18-217-231-79.us-east-2.compute.amazonaws.com/posts", {
        "method": "POST",
        "headers": {
          "token": `${userToken}`,
          "username": `${username}`,
          "message": `${this.state.msg}`,
          "content-type": "application/json"
        },  
        "body": {
          "content":`${this.state.media}`
        }
      })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });

    }
    else{
      console.log("NOT ALL VALUES FILLED");
      console.log(this.state.media);
      console.log(this.state.dest);
      console.log(this.state.msg);
    }
  }

  render() {
    return (
      <View nativeID="Page">
        
        <View nativeID="Content">
          <View nativeID="forwardWrapper">
            <Button
              title="Attach Media"
              colored="true"
              callback={() => this.takePhoto()}
            />
            <Button
                title="Add Message"
                colored="true"
                callback={() => this.textInput()}
            />

            <Button
                title="Submit"
                colored="true"
                callback={() => this.submit()}
            />
          </View>
        </View>
      </View>
    );
  }

  async checkPermissions() {
    if (
      !(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA))
    ) {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.info('GRANTED: ' + granted);
    } else {
      console.info('Permission already granted');
    }

    if (
      !(await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ))
    ) {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.info('GRANTED: ' + granted);
    } else {
      console.info('Permission already granted');
    }
  }
  textInput(){
    this.props.navigation.navigate('TextInput',{
      title: "Enter your message",
      callback: msg => {
        console.log("MESSAGE");
        console.log(msg);
        this.state.msg = msg;

      }
    });
  }

  takePhoto() {
    /*this.checkPermissions().then(r =>


        );*/
    ImagePicker.showImagePicker(ipOptions, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const po = new ProcessOperation();
        this.state.media = po.convertBase64ToEncodableFormat(response.data);

      }
    });
  }
}
