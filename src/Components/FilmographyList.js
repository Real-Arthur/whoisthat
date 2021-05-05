import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
// redux related
import { connect } from 'react-redux';
import mapStoreToProps from '../../mapStoreToProps';
// internals
import FilmographyListItem from './FilmographyListItem';

const FilmographyList = (props) => {
  let libraryIndices = [];
  props.store.libraryReducer.map(item => {
    libraryIndices.push(Number(item['Movie']))
   });

  const window = useWindowDimensions();
  // console.log('results', props.results[0]);
  // console.log('state results', results);
  
    return (
      <View style={{width: window.width, marginBottom: 20}}>
        <FlatList 
          data={props.results}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <FilmographyListItem item={item} user={props.store.userReducer} navigation={props.navigation} libraryIndices={libraryIndices}/>
          )}
        />
      </View>
    );
}
 
export default connect(mapStoreToProps)(FilmographyList);