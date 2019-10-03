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
import md5 from "md5";

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
                    onChangeText={(text) => this.state.pw=md5({text} + "&CG7AVTZ?AM+H*^BESY7Z$ANHSU==FF7KR5H@FFQ5&D=Z$WF$3LPH+9%2PSM5*--N#FBR5K26X*M@KK-W*+%C3$X&AZN%#X+QT=D?BZBVUGJ!7=E7JZ4@EUHBV7L@NJ-AM3-5Z7QB7JLNT^#T2E#Z9Z#H=8SLJLSD^!A-$2VXPEW88TUD!KGYFPW?$JRVNF3SH!LY=JAS%BRQZ+K!A_WK#EXJLPM$GLGBNZEP!B=#NLSHEV-EFEP!NK6E@F_KLZ5")}
                />
                <Button title={"Sign Up"} callback={()=>this.processSignUp()} />


            </View>

        );
    }

    processSignUp(){

        if(this.state.name && this.state.un && this.state.pw){
            console.info(this.state.pw);
            fetch('http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
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
                          res.json().then(data => {
                              // do something with your data
                              console.log(data);
                              if(data.token){
                                  console.log(data.token);
                              }
                          }).catch(error => {
                              console.error(error);
                          });

                      }
                    });
                }

            });
        }

    }


}