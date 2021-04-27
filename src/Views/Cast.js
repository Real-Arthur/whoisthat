import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
const { width } = Dimensions.get('window');

const CastScreen = (props) => {
  console.log('castscreen movie -', props.route.params.movie);
  console.log('castscreen movie cast-', props.route.params.movieCast);
  const [movie, setMovie] = useState('');
  const [castList, setCastList] = useState([]);
  useEffect(() => {
    
  }, [props.route.params.movie])
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  
  return (
    <SafeAreaView>
        <Text>Cast List Of </Text>
    </SafeAreaView>
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
 
export default connect(mapStoreToProps)(CastScreen);