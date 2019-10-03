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
import FAB from 'react-native-fab';

var globalStyles = require('../../assets/styles');



export class Inbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static navigationOptions = {
        title: 'Inbox',
    }


    getData() {
        fetch('http://ec2-3-19-228-116.us-east-2.compute.amazonaws.com/posts', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'username': this.state.un,
                'token':this.state.token
            },

        });
        return [
            {key: 0, origin: 'Alex Beaver', message: 'Check out this cool thing', sent: false},
            {key: 1, origin: 'Alex Krantz', message: 'Check out this cool thing', sent: false},
            {key: 2, origin: 'Aidan Sacco', message: 'Check out this cool thing', sent: false},
            {key: 3, origin: 'Guy Wilks', message: 'Check out this cool thing', sent: false},




        ];
    }

    
    render(){
        return(
        <View nativeID="Page">
            <View nativeID="Content">

                <View nativeID="messages-wrapper">

                    <FlatList
                    data={this.getData()}
                    renderItem = {({item}) => <Card title={item.origin} body={item.message} onPress={()=>{
                        this.props.navigation.navigate('UserPicker', {'callback':
                            function(str) {
                                

                                                                    
                            }
                        });
                    }}
                        
                        ></Card>}
                    keyExtractor={item => item.key}

                    >
                        
                    </FlatList>
                </View>
            </View>
        </View>
        );
    }
}