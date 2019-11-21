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
import ProcessOperation from "../Processing/ProcessOperation";

var globalStyles = require('../../assets/styles');



export class Inbox extends Component{
    refreshing = false;
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
        this.setState({loading: true});
        const userToken = await AsyncStorage.getItem('@token');
        const un = await AsyncStorage.getItem('@un');

        console.info(userToken);
        console.info(un);
        fetch("http://ec2-18-217-231-79.us-east-2.compute.amazonaws.com/posts/", {
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
        const po = new ProcessOperation();
        console.info("Generating Card");

        console.log(item.pic);

        if(item.lastUser == null){
            item.lastUser = "You are the first to see this!"
        }
        const encMed = "data:image/jpeg;base64,"+po.convertEncodableFormatToBase64(item.pic);
        console.info(encMed);
        console.warn("Length: "+encMed.length)
        return(
            <Card title={item.lastUser} body={item.message} media={encMed} onPress={()=>{
                this.props.navigation.navigate('UserPicker', {'callback':
                        async function(str) {
                            var postID = item["_id"];
                            const userToken = await AsyncStorage.getItem('@token');
                            const un = await AsyncStorage.getItem('@un');

                            fetch("http://ec2-18-217-231-79.us-east-2.compute.amazonaws.com/send", {
                                "method": "PUT",
                                "headers": {
                                    "token": userToken,
                                    "currentuser": un,
                                    "newuser": str,
                                    "id": item["_id"]
                                }
                            })
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err);
                                });

                        }


                });
            }}

            ></Card>
        );
    }



    async onRefresh(){
        await this.getData();
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
                                refreshControl={
                                    <RefreshControl refreshing={this.refreshing} onRefresh={this.onRefresh} />
                                }

                            >

                            </FlatList>
                        </View>
                    </View>
                </View>
            );

        }

    }
}
