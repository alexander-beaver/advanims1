import React from 'react';
import {Component} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {Button} from './button';

var globalStyles = require('../../assets/styles');
import ProcessOperation from "../Processing/ProcessOperation";
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
        var po = new ProcessOperation();
        return(
        <View style={globalStyles.card}>
            <View>
                <Image style={globalStyles.cardMedia} source={{uri:this.props.media}} />
                <View style={globalStyles.cardInterior}>
                    <Text style={globalStyles.cardHeader}>{this.props.title}</Text>
                    <Text style={globalStyles.cardText}>{this.props.body}</Text>
                    <Button title={"forward"} colored={"true"} callback= {this.props.onPress}/>
                </View>

            </View>

        </View>
        );
    }
}
