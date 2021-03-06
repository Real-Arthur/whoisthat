import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
import APITitleSearch from '../Components/APITitleSearch';
const { width } = Dimensions.get('window');

const HomeScreen = (props) => {
  Auth.currentUserInfo()
    .then(data => {
    //  console.log(data.attributes.sub)
     props.dispatch({
       type: 'CREATE_USER',
       payload: data.attributes.sub
     })
    })
    .catch(err => console.log(err));
  

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  
  return (
    <View style={styles.container}>
        <APITitleSearch navigation={props.navigation}/>
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
 
export default connect(mapStoreToProps)(HomeScreen);