import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
// internals
import UserLibraryItem from './UserLibraryItem';

const UserLibraryList = (props) => {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('');
  const [isModal, setIsModal] = useState(false);
  const window = useWindowDimensions();
  useEffect(() => {
    setResults(props.results);
  }, [props])
  // console.log('results', props.results);
  // console.log('state results', results);
  
    return (
      <View style={{width: window.width}}>
        <TextInput
          // autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          // onFocus={()=> clearInput()}
          inlineImageLeft='search_icon'
          value={query}
          onChangeText={queryText => setQuery(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
        <FlatList 
          data={props.results}
          keyExtractor={item => item.Movie}
          renderItem={({ item }) => (
            <UserLibraryItem item={item}/>
          )}
        />
      </View>
    );
}
 
export default connect(mapStoreToProps)(UserLibraryList);