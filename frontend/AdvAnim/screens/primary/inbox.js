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
        header: null
    }


    getData() {
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

                    <TouchableOpacity style={globalStyles.customButton}><Text style={globalStyles.customButtonText}>Refresh</Text></TouchableOpacity>
                    <FlatList
                    data={this.getData()}
                    renderItem = {({item}) => <Card title={item.origin} body={item.message}></Card>}
                    keyExtractor={item => item.key}


                    >
                        
                    </FlatList>
                </View>
            </View>
        </View>
        );
    }
}