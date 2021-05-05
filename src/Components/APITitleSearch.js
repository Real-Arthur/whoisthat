// react/native imports
import React, { 
  useEffect, 
  useState 
} from 'react';
import { 
  View, 
  useWindowDimensions 
} from 'react-native';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';

// redux related
import { connect } from 'react-redux';

// internal imports
import Titles from './Titles';
import mapStoreToProps from '../../mapStoreToProps';

// Misc.
import { API_KEY } from '@env';
import axios from 'axios';

// handles searching of TMDB for movie titles
// child of Home.js
const APITitleSearch = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const window = useWindowDimensions();

  // finds ids of movies in library
  // passes array to Titles
  let libraryIndices = [];
  props.store.libraryReducer.map(item => {
    libraryIndices.push(Number(item['Movie']))
  });
 
  //// tmdb-api /////
  // queries tmdb for titles
  // fires on query change
  useEffect(() => {
    if(query.length > 0) {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie`,
        params: {
          api_key: API_KEY,
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
          style={{ 
            backgroundColor: '#fff', 
            paddingHorizontal: 20,
          }}
        />
        <FlatList
          data={results}
          extraData={query}
          numColumns="2"
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Titles 
              item={item} 
              user={props.store.userReducer} 
              libraryIndices={libraryIndices} 
              navigation={props.navigation}
            />
          )}
        />
      </View>
    );
}
 
export default connect(mapStoreToProps)(APITitleSearch);