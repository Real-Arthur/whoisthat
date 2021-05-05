import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { API } from 'aws-amplify';
import {API_KEY} from '@env';
import axios from 'axios';
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';

const Titles = (props) => {  
  const [isModal, setIsModal] = useState(false);

  let isInLibrary = props.libraryIndices.includes(props.item.id);
  let user = props.user;
  let movie = props.item.id.toString();
  let title = props.item.title;
  let poster = props.item.poster_path;

  const getLibrary = () => {
    let mounted = true;
    const apiName = 'whoisrestapi';
    const path = `/library/${props.store.userReducer}`; 
    const myInit = { // OPTIONAL
        User: props.store.user
    };
    API
      .get(apiName, path, myInit)
      .then(response => {
        if(mounted) {
          // console.log('library response dig in', response);
          props.dispatch({
            type: 'SET_LIBRARY',
            payload: response
          })
        }
      })
      .catch(error => {
        console.log(error);
     });
     return () => mounted = false;
  }
 
  const setAsSeen = () => {
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${props.item.id}/credits`,
      params: {
        api_key: API_KEY,
      }
    }).then(response => {
      // console.log('Titles API cast response', response.data.cast);
      let castList = [];
      response.data.cast.map(item => {
        // console.log('people', item.character, item.id, item.name, item.profile_path);
        castList.push({
          character: item.character,
          id: item.id,
          name: item.name,
          profile_path: item.profile_path
        })
      })

      // console.log('addtolibrary', castList);
      ////
      const apiName = 'whoisrestapi'; // replace this with your api name.
      const path = '/library'; //replace this with the path you have configured on your API
      const myInit = {
        body: {
          User: user,
          Movie: movie,
          Cast: castList,
          Poster: poster,
          Title: title
      }, // replace this with attributes you need
      };
      API
      .post(apiName, path, myInit)
      .then(response => {
      console.log('response', 200);
      getLibrary();
      })
      .catch(error => {
      console.log(error.response);
      });
    ////
    }).catch(err => {
      console.log('err setasseen', err);
    })
  }

  const gotToCast = (movie, id) => {
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: {
        api_key: API_KEY,
      }
    }).then(response => {
      // console.log('Titles API cast response', response.data.cast);
      let castList = [];
      response.data.cast.map(item => {
        // console.log('people', item.character, item.id, item.name, item.profile_path);
        castList.push({
          character: item.character,
          id: item.id,
          name: item.name,
          profile_path: item.profile_path
        })
      })
      // sends movie and cast list to castscreen
      // and navigates to castscreen
        props.navigation.navigate('Cast', {
        movie: movie,
        movieCast: castList
      });
      setIsModal(!isModal)
    }).catch(err => {
      console.log('err gotocast', err);
    })
  }

  return (
    <View className={isInLibrary && styles.inLibrary }>

    <TouchableOpacity onPress={()=> setIsModal(!isModal)}>
    <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w300${props.item.poster_path}`}} // Use item to set the image source
    key={props.item.id} // Important to set a key for list items
    style={{
      width:200,
      height:200,
      resizeMode:'contain',
      margin:8
    }}
    />
    <Text>{props.item.title}</Text>
    </TouchableOpacity>

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModal(!isModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.exitButton]}
              onPress={() => setIsModal(!isModal)}
            >
              <Text style={styles.exitTextStyle}>Close <AntDesign name="close" color="black" size={15}/></Text>
            </Pressable>
            <Image source={{uri: `https://image.tmdb.org/t/p/w300${props.item.poster_path}`}} // Use item to set the image source
              key={props.item.id} // Important to set a key for list items
              style={{
                width:200,
                height:200,
                resizeMode:'contain',
                margin:8
              }}
            />
            <Text style={styles.modalText}>{props.item.title}</Text>
            { isInLibrary 
              ?
                <Text style={styles.inactiveButton}>Seen <AntDesign name="check" color="green" size={20}/></Text>
              :
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setAsSeen()}
                >
                  <Text style={styles.textStyle}>Mark As Seen</Text>
                </Pressable>
            }
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => gotToCast(props.item, props.item.id)}
              >
                <Text style={styles.textStyle}>See Cast</Text>
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
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  exitButton: {
    backgroundColor: 'red',
    marginBottom: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  exitTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  inactiveButton: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inLibrary: {
    backgroundColor: 'red'
  },
  notInLibrary: {
    backgroundColor: 'blue'
  }
});

const mapStateToProps = (state) => {
  const { library, user } = state
  return { library, user }
};
 
export default connect(mapStoreToProps)(Titles);