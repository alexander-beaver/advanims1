import React from 'react';
import {Component, Progres} from 'react';

import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    RefreshControl,

} from 'react-native';
import {Header, Input} from "react-native-elements";
import {Icon} from "react-native-elements";
import {Button} from "../uielements/button";

var globalStyles = require('../../assets/styles');

export class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            un:"",
            pw:""
        }

    }
    render(){
        return(
            <View>
                <Header
                    placement="center"
                    centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }}
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
                <Button title={"Sign Up"} callback={()=>this.processSignUp()} />


            </View>

        );
    }

    processSignUp(){

    }


}