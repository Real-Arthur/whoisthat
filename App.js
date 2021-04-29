import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/Views/Home';
import LibraryScreen from './src/Views/Library';
import CastScreen from './src/Views/Cast';
import Filmography from './src/Views/Filmography';

// aws and aws accessories
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

// react nav
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore( // mount it on the Store
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

function NavigatorTabs() {
  return(
  <Tab.Navigator style={{marginTop: 50}}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />

  </Tab.Navigator>
  )
}

function App( {} ) {

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <Provider store={store}>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          height: "0%"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name='Tabs' component={NavigatorTabs}/>
        <Stack.Screen name="Cast" component={CastScreen}/>
        <Stack.Screen name="Filmography" component={Filmography}/>
      </Stack.Navigator>

    </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 6,
  },
});

export default withAuthenticator(App);