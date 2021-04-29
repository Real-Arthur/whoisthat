import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Dimensions, SafeAreaView, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
import { FlatList } from 'react-native-gesture-handler';
import CastList from '../Components/CastList';
const { width } = Dimensions.get('window');

const CastScreen = (props) => {
  // console.log('cs props', props.navigation);
  
  // console.log('castscreen movie -', props.route.params.movie);
  // console.log('castscreen movie cast-', props.route.params.movieCast);
  // console.log('lib', props.store.libraryReducer);
  
  // const [library, setLibrary] = useState([]);
  const [movie, setMovie] = useState('');
  const [castList, setCastList] = useState([]);
  useEffect(() => {
    setMovie(props.route.params.movie.title);
    setCastList(props.route.params.movieCast);
    // setLibrary(props.store.libraryReducer);
  }, [props.route.params.movie]);
  
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  
  return (
    <SafeAreaView>
        <Button 
          title="Back"
          onPress={() => props.navigation.goBack()} 
          />
        <Text>Cast List Of {movie}</Text>
        <FlatList
          data={castList}
          extraData={movie}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CastList item={item} navigation={props.navigation}/>
          )}
        />
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