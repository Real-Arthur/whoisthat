import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
// aws
import { Auth } from 'aws-amplify';
import Titles from './Titles';


const APITitleSearch = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [libraryList, setLibraryList] = useState([]);
  const window = useWindowDimensions();

 let libraryIndices = [];
props.store.libraryReducer.map(item => {
  libraryIndices.push(Number(item['Movie']))
 });
 
  //// tmdb-api /////
  useEffect(() => {
    if(query.length > 0) {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie`,
        params: {
          api_key: '36bae393f2101cebae067cf801a8fab7',
          query: query,
          page: 1
        }
      }).then(response => {
        // console.log('response', response.data.results);
        setResults(response.data.results);
      }).catch(err => {
        console.log('err', err);
      })
    }
    if(query.length === 0) {
      setResults([])
    }
  }, [query])

  const clearInput = () => {
    setQuery('');
    setResults([]);
  }
  // console.log('libraryIndices', libraryIndices);
  
    return (
      <View style={{width: window.width}}>
        <TextInput
          // autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onFocus={()=> clearInput()}
          inlineImageLeft='search_icon'
          value={query}
          onChangeText={queryText => setQuery(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
        <FlatList
          data={results}
          extraData={query}
          numColumns="2"
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Titles item={item} user={props.store.userReducer} libraryIndices={libraryIndices} navigation={props.navigation}/>
          )}
        />
      </View>
    );
}
 
export default connect(mapStoreToProps)(APITitleSearch);