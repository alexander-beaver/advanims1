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

  getData() {}
  submit(){
  if(this.state.media && this.state.dest && this.state.msg){


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
                title="Choose Destination"
                colored="true"
                callback={() => this.userPicker()}
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
      callback: function(msg){
        console.log("MESSAGE");
        console.log(msg);


      }
    });
  }
  userPicker(){
    this.props.navigation.navigate('UserPicker', {
      callback: function(usr) {
        //Do Stuff here
        console.log(usr);
      },
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

        this.setState({
          imageSource: 'data:image/jpeg;base64,' + response.data,
        });


        
        
        
      }
    });
  }
}
