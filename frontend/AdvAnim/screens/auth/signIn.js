import React from 'react';
import {Component, Progres} from 'react';

import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    RefreshControl,
    Alert

} from 'react-native';
import {Header, Input} from "react-native-elements";
import {Icon} from "react-native-elements";
import {Button} from "../uielements/button";

var globalStyles = require('../../assets/styles');

export class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            un: "",
            pw: ""
        }

    }
    render(){
        return(
            <View>
                <Header
                    placement="center"
                    centerComponent={{ text: 'Sign In', style: { color: '#fff' } }}
                />
                <Input
                    placeholder='Username'
                    onChangeText={(text) => this.state.un={text}}
                />

                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.state.pw={text}}
                />
                <Button title={"Sign In"} callback={()=>this.processSignIn()} />

            </View>

        );
    }

    processSignIn(){
        if(this.state.un !== "" && this.state.pw !== ""){
            this.props.navigation.navigate('Inbox')
        }
    }


}