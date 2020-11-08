import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View , Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TopBar from './src/components/TopBar'
import ConnectPage from './src/components/ConnectPage'
import MainPage from './src/components/MainPage'


const Stack = createStackNavigator();

const headerOptions ={
          title: 'Dronelysis',
          headerStyle: {
            backgroundColor: '#585858',
          },
          headerTintColor: '#14d2ff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
          },
          headerLeft: null
          
        }

export default function App() {

  return(

    <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName="Connect">
              <Stack.Screen name="Connect" component={ConnectPage} options={headerOptions}/>
              <Stack.Screen name="Main" component={MainPage} options={headerOptions}/>
          </Stack.Navigator>
        </View>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a6a6a',
  },
 
});
