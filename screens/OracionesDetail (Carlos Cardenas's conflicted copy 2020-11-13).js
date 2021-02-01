/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  BackHandler
} from 'react-native';

import Menu from '../components/Menu';
import {serverPublic} from '../Env'  

import SoundPlayer from 'react-native-sound-player'
import Sound from 'react-native-sound'
import { Icon } from 'react-native-eva-icons';

import { WebView } from 'react-native-webview';
function Index(props) {  

  const [Data, SetData] = useState(props.route.params.data);

  const [Play, SetPlay]    = useState(false);
  const [Paused, SetPaused] = useState(false);
  const [Resume, SetResume] = useState(false);

  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})

  }
  


    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = Math.random()
    }



  function PlaySound(Audio){



   /* const track = new Sound(`https://caballeros.chseguros.com.co/img/oraciones/audio/${Audio}`, null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
        SetPlay(true)
      }
    })*/
    console.log(`https://caballeros.chseguros.com.co/img/oraciones/audio/${Audio}`)
    try {
      SoundPlayer.playUrl(`https://caballeros.chseguros.com.co/img/oraciones/audio/${Audio}`)
      SetPlay(true)

      //await SoundPlayer.loadUrl(`https://caballeros.chseguros.com.co/img/oraciones/audio/${Audio}`)
      //await SoundPlayer.play()
     // await  SetPlay(true)

    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }


  function PausedSound(){
    SetPaused(true)
    try {
      SoundPlayer.pause()
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }


  function ResumeSound(){
    SetPaused(false)
    try {
      SoundPlayer.resume()
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }

  function StopSound(audio){
    try {
      SoundPlayer.stop(audio)
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }




  useEffect(()=>{
    SetData(props.route.params.data)
    SoundPlayer.stop()
    SetPlay(false)
    SetPaused(false)
    SetResume(false)

    //StopSound(Data.audio)
  },[randomCode])



  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0E1257"/>


        <ScrollView
          style={styles.scrollView}>

          <ImageBackground source={require('../src/background.jpg')}
                                              style={{ width : 0,height : 0,}}
                                              imageStyle={{resizeMode : 'repeat', }}>
          </ImageBackground>



          <ImageBackground source={{uri: `${serverPublic}/img/oraciones/image/${Data.image}`}}
                                              style={{ width : "100%",height : 230}}
                                              imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <View style={styles.overlay} />
                                  
            <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>

                {!Play &&
                    <TouchableOpacity style={styles.itemMenu} onPress={ ()=> PlaySound(Data.audio) }>
                      <View><Icon name='play-circle' width={70} height={70} fill='white' /></View>
                    </TouchableOpacity>
                }
                {Play  && !Paused &&
                    <TouchableOpacity style={styles.itemMenu} onPress={ ()=> PausedSound(Data.audio) }>
                      <View><Icon name='pause-circle' width={70} height={70} fill='white' /></View>
                    </TouchableOpacity>
                }


                {Play && Paused &&
                    <TouchableOpacity style={styles.itemMenu} onPress={ ()=> ResumeSound(Data.audio) }>
                      <View><Icon name='play-circle' width={70} height={70} fill='white' /></View>
                    </TouchableOpacity>
                }
                

            </View>
          </ImageBackground>



          <View style = {{marginTop: 4, padding: 18, width : "100%", alignItems: "center"}}>
              <WebView source={{ uri: `https://caballeros.chseguros.com.co/view/oraciones/${Data.id}` }}  style={{width: 300, height: 900}}/>
          </View>



                                   
        </ScrollView>

        <Menu props = {props} />

        
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%",backgroundColor: "#0E1257"
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: "white",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color:  "black",
  },
  highlight: {
    fontWeight: '700',
  },

  footer: {
    color:  "black",
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity:0.6,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },

});

