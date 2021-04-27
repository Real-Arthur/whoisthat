import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';

const Person = (props) => {

  return (
    <View>
      <Image source={{uri: `https://image.tmdb.org/t/p/w300${props.item.poster}`}} // Use item to set the image source
        key={props.item.id} // Important to set a key for list items
        style={{
          width:100,
          height:100,
          resizeMode:'contain',
          margin:8
        }}
      />
      <Text>{props.item.character} in {props.item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

 
export default Person;