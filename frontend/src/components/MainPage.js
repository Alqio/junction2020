import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View , Image} from 'react-native';

import PersonWithDrone from '../../images/person_with_drone.png'
import {start, stop, takeOff, land, forward, back,right,left,up, down, cw,ccw, curve, rc, getAttitude, listenState} from '../tello-native'


export default MainPage = ({ navigation }) => {

  const [isReady, setIsReady] = React.useState(true)
  const [updater, setUpdater] = React.useState(0)

  let leftEarDone = false
  let rightEarDone = false

  let intervalli = null
/*
  React.useEffect(() => {
    const asyncFunc = async () => {

            const attitude = await getAttitude()
            if(attitude != undefined){
              const yawInfo = attitude.split(";")[2] 
              if(yawInfo){
                const yaw = parseInt(yawInfo.split(":")[1])
                console.log(yaw)
                const absoluteYaw = Math.abs(yaw)
                if(false){
                  //-------------------
                  clearInterval(intervalli)

                    await handleMessage("rcreset")
                    console.log("calling forward in function")
                    await handleMessage("forward")
                    if(absoluteYaw != 90){
                      if(yaw < 0){
                        if(yaw > -90){
                          await ccw(yaw+90)
                        }else if(yaw < -90){
                          await cw(-90-yaw)
                        }
                      }else if(yaw > 0){
                        if(yaw > 90){
                          await ccw(yaw-90)
                        }else if(yaw < 90){
                          await cw(90-yaw)
                        }
                      }
                    }
                    await checkEar()
                    await handleMessage("back")
                    await handleMessage("rc")
                    intervalli = setInterval(asyncFunc, 1000)
                  }
              }
            }

    }
    intervalli = setInterval(asyncFunc, 1000)
  }, [])
*/
  const checkEar = async () => {
    console.log("ear function started")
    await right(10)
    await new Promise(r => setTimeout(r, 500));
    await ccw(5)
    await new Promise(r => setTimeout(r, 500));
    await cw(5)
    await new Promise(r => setTimeout(r, 500));
    await left(20)
    await new Promise(r => setTimeout(r, 500));
    await cw(5)
    await new Promise(r => setTimeout(r, 500));
    await ccw(5)
    console.log("ear function compelted")
  }

  
  const handleMessage = async (msg) => {
    setIsReady(false)
    console.log(msg)
    new Promise(async (res, rej) => {
      switch(msg) {
        case "command":
          await start()
          break
        case "stop":
          await stop()
          break
        case "takeoff":
          await takeOff()
          await stop()
          break
        case "land":
          await land()
          break
        case "curve":
          await curve({x:29,y:-71,z:0}, {x:100,y:-100,z:0}, 10)
          break
        case "rotate":
          await rotate(90)
          break
        case "forward":
          await forward(50)
          break
        case "back":
          await back(50)
          break
        case "up":
          await up(30)
          break
        case "down":
          await down(30)
          break
        case "rc":
          await rc(10, 0,0,-15)
          break
        case "rcreset":
          await rc(0, 0,0,0)
          break
        
        default:
          console.log("invalid message: ", msg)
      }
      res()
    }).then(() => {
      setIsReady(true)
    })
  }


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={PersonWithDrone} style={styles.image}/>
        </View>
        {isReady ? <View style={{backgroundColor: "#00ff00", height: 50, width: 50}}/> : <View style={{backgroundColor: "#ff0000", height: 50, width: 50}}/>}
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={() => handleMessage('command')} style={styles.button}>
            <Text style={styles.buttonText}>CONNECT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMessage('stop')} style={styles.button}>
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMessage('takeoff')} style={styles.button}>
            <Text style={styles.buttonText}>TAKEOFF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMessage('land')} style={styles.button}>
            <Text style={styles.buttonText}>LAND</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMessage('rcreset')} style={styles.button}>
            <Text style={styles.buttonText}>RC RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMessage('rc')} style={styles.button}>
            <Text style={styles.buttonText}>RC</Text>
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
    flex:  1
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  infoContainer: {
    flex:  1,
    backgroundColor: '#585858',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  button:{
    backgroundColor: "#14d2ff",
    width: "60%",
    height: 50,
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


