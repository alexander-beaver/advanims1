import React from 'react';
import {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

var globalStyles = require('../../assets/styles');

export class Card extends Component{
    
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
        return(
        <View style={globalStyles.card}>
            <View>
                <Image style={globalStyles.cardMedia} source={{uri: 'https://images.unsplash.com/photo-1518810765707-4f7d5d811ce0'}} />
                <View style={globalStyles.cardInterior}>
                    <Text style={globalStyles.cardHeader}>{this.props.title}</Text>
                    <Text style={globalStyles.cardText}>{this.props.body}</Text>
                    <TouchableOpacity style={[globalStyles.customButton,globalStyles.buttonColoredBKG]}><Text style={[globalStyles.customButtonText,globalStyles.buttonColoredBKGText]}>Forward</Text></TouchableOpacity>
                </View>

            </View>

        </View>
        );
    }
}
