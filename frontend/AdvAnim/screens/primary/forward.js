import React from 'react';
import {Component, Progres} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    RefreshControl,
} from 'react-native';
import {Card} from '../uielements/card';
import {Header, Input} from "react-native-elements";
import {Button} from '../uielements/button';

var globalStyles = require('../../assets/styles');



export class Forward extends Component{
    constructor(props){
        super(props);

    }

    static navigationOptions = {
        title: 'Forward',
    }


    getData() {

    }


    render(){
        return(
            <View nativeID="Page">
                <Header
                    placement="center"
                    centerComponent={{ text: 'Forward Message', style: { color: '#fff' } }}
                />
                <View nativeID="Content">
                    <View nativeID="forwardWrapper">
                        


                    
                        



                    </View>
                </View>
            </View>
        );
    }


}