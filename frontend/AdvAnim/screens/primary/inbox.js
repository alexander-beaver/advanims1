import React from 'react';
import {Component} from 'react';
import {
    View,
    FlatList
} from 'react-native';
import {Card} from '../uielements/card';


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

    _onRefresh() {
        this.setState({refreshing: true});
        // .then( () => {
        this.setState({refreshing: false});
        // });
    }

    getData() {
        return [
            {key: 0, origin: 'Alex Beaver', message: 'Check out this cool thing', sent: false},
            {key: 1, origin: 'Aidan Sacco', message: 'Check out this cool thing', sent: false},
            {key: 2, origin: 'Guy Wilks', message: 'Check out this cool thing', sent: false},



        ];
    }
    
    render(){
        return(
        <View nativeID="Page">
            <View nativeID="Content">
                <View nativeID="messages-wrapper">
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