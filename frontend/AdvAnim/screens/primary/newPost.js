import React from 'react';
import {Component, Progres} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    RefreshControl,
    PermissionsAndroid
} from 'react-native';
import {Card} from '../uielements/card';
import {Header, Input} from "react-native-elements";
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
export class NewPost extends Component{

    constructor(props){
        super(props);

    }

    static navigationOptions = {
        title: 'New Post',
        header: null
    }


    getData() {

    }


    render(){
        return(
            <View nativeID="Page">
                <Header
                    placement="center"
                    centerComponent={{ text: 'New Post', style: { color: '#fff' } }}
                />
                <View nativeID="Content">
                    <View nativeID="forwardWrapper">
                        <Button title="Attach Media" colored="true" callback={()=>this.takePhoto()}/>

                        <Text>Message ID: {this.props.navigation.getParam('id',null)}</Text>

                        <Input placeholder="Recipient"/>

                    
                  


                    </View>
                </View>
            </View>
        );
    }
    async checkPermissions(){
        if(!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)){
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
            console.info("GRANTED: "+granted);

        } else{
            console.info("Permission already granted");
        }

        if(!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)){
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
            console.info("GRANTED: "+granted);

        } else{
            console.info("Permission already granted");
        }

    }
    takePhoto() {
        /*this.checkPermissions().then(r =>


        );*/
        ImagePicker.showImagePicker(ipOptions, (response) => {
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
                console.log(this.state.imageSource);
            }
        })



    }


}