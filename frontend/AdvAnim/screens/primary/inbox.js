import React from 'react';
import {Component} from 'react';
import {
} from 'react-native';

export default class Inbox extends Component{
    contructor(props){
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
            {data: [{key: 0, origin: 'abc', sent: false}]},
            
        ];
    }
    
}