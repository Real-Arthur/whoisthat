import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Person from './Person';
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
// window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CastList = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [isIn, setIsIn] = useState(false);
    const [seenInList, setSeenIsInList] = useState([]);
  // console.log('cl', props.item.id)
  // console.log('cl', props.item.character)
  // console.log('cl', props.item.name)

  useEffect(() => {
    inLibraryCheck();
  }, [])

  const inLibraryCheck = () => {
    let check = false;
    let checkList = [];
    for(let item of props.store.libraryReducer) {
      for(let item2 of item['Cast']) {
        // console.log('ee', item2.name)
        // console.log('ee', item2.id)
        if(item2.id === props.item.id) {
          console.log(item2.name);
          console.log('as', item2.character);
          console.log('in', item['Title']);
          checkList.push({
            name: item2.name,
            character: item2.character,
            title: item['Title'],
            poster: item['Poster'],
            id: item['Movie']
          })
          check = true
        }
      }
    }
    setIsIn(check);
    setSeenIsInList(checkList);
  }

  return (
    <View>
    <TouchableOpacity onPress={()=> setIsModal(!isModal)}>
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
    <Text>{props.item.name} as {props.item.character}</Text>
    </TouchableOpacity>

    <View style={styles.modalContainer}>
      <Modal
        animationType="fade"
        presentationStyle="fullScreen"
        visible={isModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModal(!isModal);
        }}
      >
        {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>How Do I Know {props.item.name}?</Text>
            <Image source={{uri: `https://image.tmdb.org/t/p/w300${props.item.profile_path}`}} // Use item to set the image source
              key={props.item.id} // Important to set a key for list items
              style={styles.modalImage}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModal(!isModal)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            {isIn && 
              <FlatList
                data={seenInList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <Person item={item} />
                )}
              />
            }
          </View>
        {/* </View> */}
      </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    padding: windowHeight * 0.05,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode:'contain',
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
 
export default connect(mapStoreToProps)(CastList);