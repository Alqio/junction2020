import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


export default TopBar = () => (
    <View style={styles.topbar}>
        <Text style={styles.title}>Dronelysis</Text>
    </View>
)

const styles = StyleSheet.create({
  topbar: {
      width: '100%',
      height: 60,
      backgroundColor: "#585858",
      justifyContent: 'center'

  },
  title: {
      color: "#14d2ff",
      fontSize: 32, 
      marginLeft: 10
  }
});