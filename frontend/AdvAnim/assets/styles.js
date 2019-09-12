'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;


module.exports = StyleSheet.create({
    fbVert: {
      display: "flex",
      flexDirection: "column"
    },
    cardHeader: {
        fontSize:32,
        flex: 2,
        color: "#FFFFFF"

    },
    cardText:{
      flex: 1,
        color: "#FFFFFF"

    },
    card: {


      borderRadius: 30,
      backgroundColor: "#21313F",
      shadowColor: "#000000",
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 1,
      shadowRadius: 10,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        elevation: 2



    },
    cardInterior:{
        padding: 30,
        paddingTop: 10,

        display: "flex",
        flexDirection: "column"
    },
    cardMedia:{
      borderRadius: 30,
      width: '100%',
        height: 300,
      flex: 2

    },
    cardSubtitle:{
      fontSize: 24,
        color: "#FFFFFF"
    },
    cardDescription:{
      fontSize: 14,
        color: "#FFFFFF"
    },


    customButton:{
        borderWidth: 3,
        borderRadius: 30,
        textAlign: "center",
        alignContent: "center",
        margin: 20
    },
    customButtonText:{
        textAlign: "center",
        fontSize: 24,
        margin: 10
    },
    buttonColorBlack:{
        borderColor: "#000000",
        color: "#000000",
    },
    buttonTextColorBlack:{
        color: "#000000"
    },
    buttonColoredBKG:{
        borderColor: "#78FA9F",

        color: "#FFFFFF",

    },
    buttonColoredBKGText:{
        color: "#78FA9F",

    }

});