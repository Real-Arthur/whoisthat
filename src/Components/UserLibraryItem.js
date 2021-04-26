import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';

const UserLibraryItem = (props) => {
  // console.log('People props', props.item['Poster']);
  const [isModal, setIsModal] = useState(false);
  return (
    <View>
    <TouchableOpacity onPress={()=> setIsModal(!isModal)}>
    <Image source={{uri: `https://image.tmdb.org/t/p/w300${props.item['Poster']}`}} // Use item to set the image source
    key={props.item.id} // Important to set a key for list items
    style={{
      width:200,
      height:200,
      borderWidth:2,
      borderColor:'#d35647',
      resizeMode:'contain',
      margin:8
    }}
    />
    <Text>{props.item['Title']}</Text>
    </TouchableOpacity>

    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModal(!isModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{uri: `https://image.tmdb.org/t/p/w300${props.item.profile_path}`}} // Use item to set the image source
              key={props.item.id} // Important to set a key for list items
              style={{
                width:200,
                height:200,
                borderWidth:2,
                borderColor:'#d35647',
                resizeMode:'contain',
                margin:8
              }}
            />
            <Text style={styles.modalText}>{props.item.name}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModal(!isModal)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModal(!isModal)}
            >
              <Text style={styles.textStyle}>How Do I know them?</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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

const mapStateToProps = (state) => {
  const { library, user } = state
  return { library, user }
};
 
export default connect(mapStoreToProps)(UserLibraryItem);