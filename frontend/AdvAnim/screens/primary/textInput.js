import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import {Button} from '../uielements/button';
export class TInput extends Component{

    navigationOptions = {
        title: "Enter Text"
    }
    constructor(props) {
        super(props);
        this.state = {text: ''};


    }


    btnCallback(){
        console.log(this.state.text);
        this.props.navigation.getParam('callback')(this.state.text);


        console.log("Input Done");
        this.props.navigation.goBack();
    }

    render(){
        return(
            <View>
                <TextInput
       // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={64}
      multiline
      placeholder= "Your Message"
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}

    />
    
    <Button title = "Submit" callback = {
        ()=>this.btnCallback()
    } />
            </View>
        )
    }
}