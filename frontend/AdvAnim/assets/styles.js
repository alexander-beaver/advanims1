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
        fontSize:32
    },
    card: {
      borderRadius: 30,
      backgroundColor: B7B7B7,
      shadowColor: rgba(0,0,0,0.35),
      shadowOffset: {width: 0, height: 30},
      shadowOpacity: 0.35,
      shadowRadius: 46,
      width: '75vw',


    },
    cardMedia:{
      borderRadius: 30,
      width: "100%",
      height: "33vh"

    },
    cardSubtitle:{
      fontSize: 24
    },
    cardDescription:{
      fontSize: 14
    }

});