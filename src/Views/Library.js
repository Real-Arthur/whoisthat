import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Auth, API } from 'aws-amplify';
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps'
import UserLibraryList from '../Components/UserLibraryList';
const { width } = Dimensions.get('window');

const LibraryScreen = (props) => {
  console.log('libscr', props.store.userReducer);
  
  const [results, setResults] = useState([])
  const test = 'working';
  useEffect(() => {
    getLibrary();
  }, [props.store.userReducer])

  const getLibrary = () => {
    // console.log('props', typeof props.store.userReducer)
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
          setResults(response);
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

  const getSomething = () => {
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
          setResults(response);
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

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <UserLibraryList results={props.store.libraryReducer}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingVertical: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: width,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
 
export default connect(mapStoreToProps)(LibraryScreen);