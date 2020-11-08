import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View , Image} from 'react-native';
import Drone from '../../images/drone.png'

export default ConnectPage = ({navigation}) => {

  return(
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={Drone} style={styles.image}/>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Connect to drone via WiFi and continue</Text>
          <View style={styles.divider}/>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.button}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a6a6a',
  },
  imageContainer: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "90%",
    resizeMode: "contain"
  },
  infoContainer: {
    flex:  1,
    backgroundColor: '#585858',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  divider:{
    backgroundColor: "#b5b5b5",
    height: 1,
    width: "90%"
  },
  infoText: {
    fontSize: 32,
    color: '#bebebe',
    width: "70%",
    textAlign: 'center'
  },
  button:{
    backgroundColor: "#14d2ff",
    width: "60%",
    height: 70,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#fff"
  }
});