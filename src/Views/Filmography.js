import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Dimensions, SafeAreaView, Text } from 'react-native';
import axios from 'axios';
import {API_KEY} from '@env';
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
import { FlatList } from 'react-native-gesture-handler';
import CastList from '../Components/CastList';
import FilmographyList from '../Components/FilmographyList';
const { width } = Dimensions.get('window');

const Filmography = (props) => {
  // console.log('filmography', props.route.params.person);
  // console.log('nav', props.navigation);
  const [results, setResults] = useState([]);
  useEffect(() => {
    getFilmography(props.route.params.person.id)
  }, [props.route.params.person]);

  const getFilmography = (id) => {
    // console.log('', id);
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      params: {
        api_key: API_KEY
      }
    }).then(response => {
      // console.log('response', response.data.cast);
      setResults(response.data.cast);
    }).catch(err => {
      console.log('err', err);
    })
  }
  
  return (
    <SafeAreaView>
      <Text>Films Of {props.route.params.person.name}</Text>
      <Button title="Back" onPress={() => props.navigation.goBack()}/>
      <Button title="Back Home" onPress={() => props.navigation.navigate('Home')} />
      <FilmographyList results={results} navigation={props.navigation}/>
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
 
export default connect(mapStoreToProps)(Filmography);