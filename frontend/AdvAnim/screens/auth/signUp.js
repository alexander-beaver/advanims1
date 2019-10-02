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
            name:"",
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
                    placeholder='Name'
                    onChangeText={(text) => this.state.name={text}}

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
        /*
        if(this.state.name && this.state.un && this.state.pw){
            fetch('http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'username': this.state.un,
                    'name': this.state.name,
                    'password': this.state.pw
                },

            }).then(r =>{
                console.log(r);
                if(r.status == 200){
                    fetch ('http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/login',{
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'username': this.state.un,
                            'password': this.state.pw
                        }
                    }).then(res => {

                      if(res.status == 200){
                          var token = res;
                          console.log(token);
                      }
                    })
                }

            });
        }*/

    }


}