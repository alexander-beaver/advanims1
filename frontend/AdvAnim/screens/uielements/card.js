import React from 'react';
import {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

var globalStyles = require('../../assets/styles');

export default class Card extends Component{
    contructor(props){
        this.state = {
            refreshing: false
        }
    }

   
    _onRefresh() {
        this.setState({refreshing: true});
        // .then( () => {
        this.setState({refreshing: false});
        // });
    }


    render(){
        return(
        <View style={globalStyles.card}>
            <Text style={globalStyles.cardHeader}>Card Header</Text>
            <Text>Lorem ipsum dolor sit amet amet.</Text>
        </View>
        );
    }
}