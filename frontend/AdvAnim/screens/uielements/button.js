import React from 'react';
import {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

var globalStyles = require('../../assets/styles');

export class Button extends Component{
    
    constructor(props){
        super(props);
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
        if(this.props.colored == "true"){
            return(
                <TouchableOpacity style={[globalStyles.customButton,globalStyles.buttonColoredBKG]} onPress={this.props.callback}><Text style={[globalStyles.customButtonText,globalStyles.buttonColoredBKGText]}>{this.props.title}</Text></TouchableOpacity>

            );
        }
        else{
            return(
                <TouchableOpacity style={[globalStyles.customButton, globalStyles.buttonColorBlack]} onPress={this.props.callback}><Text style={[globalStyles.customButtonText,globalStyles.buttonTextColorBlack]}>{this.props.title}</Text></TouchableOpacity>

            );
        }

    }
}
