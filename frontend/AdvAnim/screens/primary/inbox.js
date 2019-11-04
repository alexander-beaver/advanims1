import React from 'react';
import {Component, Progres} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    RefreshControl, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Card} from '../uielements/card';
import FAB from 'react-native-fab';

var globalStyles = require('../../assets/styles');



export class Inbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: {}
        }
    }

  

    static navigationOptions = {
        title: 'Inbox',
    }
    componentDidMount() {
        console.log("inbox.js mounted");

        this.runDataGet()
    }

    async runDataGet(){
        const a = await this.getData();
        console.log("Setting State");

    }


    async getData(){
        const userToken = await AsyncStorage.getItem('@token');
        const un = await AsyncStorage.getItem('@un');

        console.info(userToken);
        console.info(un);
        fetch("http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/posts/", {
            "method": "GET",
            "headers": {
                "token": userToken,
                "username": un
            }
        })
            .then(response => {
                console.info(response.status);
                return response.json();
            }).then(res => {
                console.info(res);
                console.info(JSON.stringify(res));
                if(res.result == null){
                    return (
                            {
                                "_id":"0",
                                "pic":"",
                                "currentUser": un,
                                "message": "You have no messages",
                                "lastUser": null,
                                "numberOfForwards":0
                            }

                    );
                }


                console.info(res.result);
                return res.result;

            }).then(res =>{
            this.setState({
                loading: false,
                data: res
            });
            })

            .catch(err => {
                console.log(err);
            });
    }

    generateCard(item){
        console.info("Generating Card");


        if(item.lastUser == null){
            item.lastUser = "You are the first to see this!"
        }
        return(
            <Card title={item.lastUser} body={item.message} media={item.pic} onPress={()=>{
                this.props.navigation.navigate('UserPicker', {'callback':
                        function(str) {

                        }


                });
            }}

            ></Card>
        );
    }

    
    render(){
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        else{
            console.log("RENDERING ALL CARDS");
            console.log(this.state.loading);
            console.log(this.state.data);
            return(
                <View nativeID="Page">
                    <View nativeID="Content">

                        <View nativeID="messages-wrapper">

                            <FlatList
                                data={this.state.data}
                                renderItem = {({item}) => this.generateCard(item)}
                                keyExtractor={item => item.key}

                            >

                            </FlatList>
                        </View>
                    </View>
                </View>
            );

        }

    }
}