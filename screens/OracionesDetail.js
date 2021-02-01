/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Image,
  Slider
} from 'react-native';

import Menu from '../components/Menu';
import {serverPublic} from '../Env'  

import SoundPlayer from 'react-native-sound-player'
//import Sound from 'react-native-sound'
import { Icon } from 'react-native-eva-icons';


import { WebView } from 'react-native-webview';
import Sound from 'react-native-sound';


const img_speaker = require('../src/resources/ui_speaker.png');
const img_pause = require('../src/resources/ui_pause.png');
const img_play = require('../src/resources/ui_play.png');
const img_playjumpleft = require('../src/resources/ui_playjumpleft.png');
const img_playjumpright = require('../src/resources/ui_playjumpright.png');


function Index(props) {  


  const [Data, SetData] = useState(props.route.params.data);

  const [Play, SetPlay]    = useState(false);
  const [PlayerAudio, SetPlayerAudio]    = useState(false);
  const [playState, SetPlayState] = useState("paused");
  const [playSeconds, SetPlaySeconds] = useState(1);
  const [duration, SetDuration] = useState(0);
  const [sliderEditing, SetSliderEditing] = useState(false);
  const [seconds, Setseconds] = useState(false);
  
  
  const [Opacity, setOpacity] = useState(0);
 
  const {navigation} = props
  function goToScreen(screen, Audio)
  {   
        navigation.navigate(screen, {"audio" : Audio, randomCode : Math.random()})

  }
  
    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = Math.random()
    }

  useEffect(()=>{
    SetData(props.route.params.data)
    console.log(props.route.params.data.id)
    setOpacity(0)
  },[randomCode])



  useEffect(()=>{

    console.log(sliderEditing, "SCONS")
    setTimeout(()=>{
      if(PlayerAudio && PlayerAudio.isLoaded() && playState == 'playing' && !sliderEditing){
        PlayerAudio.getCurrentTime((seconds, isPlaying) => {
        // console.log(seconds)
            SetPlaySeconds(seconds)
        })
      }
    }, 1000)
  },[playSeconds])





  function PlaySound(){
    Alert.alert("asfasf")
  }



 const onSliderEditStart = () => {
      SetSliderEditing(true);
 }

 const onSliderEditEnd = () => {
    SetSliderEditing(true);
 }
 const onSliderEditing = value => {

  console.log(value, "EDINT")
    if(PlayerAudio){
        PlayerAudio.setCurrentTime(value);
        SetPlaySeconds(value)
        SetSliderEditing(false)
    }
 }



  const play = async (audio) => {
      if(PlayerAudio){
        PlayerAudio.play(playComplete());
          SetPlayState("playing")
          SetPlaySeconds(playSeconds + 1)
      }else{
          const filepath = audio;
          console.log('[Play]', filepath);

         let sound = new Sound(filepath, '', (error) => {
              if (error) {
                  console.log('failed to load the sound', error);
                  SetPlayState("paused")
              }else{
                  console.log("AJA")

                  SetPlayState("playing")
                  SetDuration(sound.getDuration())
                  sound.play(playComplete());
                //  count()
                SetPlaySeconds(0)
              }
          })

          SetPlayerAudio(sound)
          console.log(PlayerAudio)
          
      }
  }



  const pause = () => {
    console.log(playState)
    PlayerAudio.pause();
    SetPlayState("paused")
}


  const playComplete = (success) => {
    if(PlayerAudio){
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
           // Alert.alert('Notice', 'audio file error. (Error code : 2)');
        }
       // SetPlayState("paused")
       // SetPlaySeconds(0)
       // PlayerAudio.setCurrentTime(0);
    }
}



async function back(){

  if(PlayerAudio){
    await PlayerAudio.stop();
  }
  props.navigation.goBack()
  
}



function getAudioTimeString(seconds){
  const h = parseInt(seconds/(60*60));
  const m = parseInt(seconds%(60*60)/60);
  const s = parseInt(seconds%60);

  return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
}



const currentTimeString = getAudioTimeString(playSeconds);
const durationString    = getAudioTimeString(duration);




  return (
    
    <>
      <StatusBar backgroundColor="transparent" translucent/>


        <ScrollView
          style={styles.scrollView}>
            


            
          <ImageBackground source={{uri: `${serverPublic}/img/oraciones/image/${Data.image}`}}
                                              style={{ width : "100%",height : 200}}
                                              imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>


              
                
            <View style={styles.overlay} />
                <TouchableOpacity onPress={()=>back()} style={{marginTop: 30, marginLeft: 20}}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>         
              <View style={{ flex: 1,  paddingTop: 0,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                  {playState == 'paused' && 
                    <TouchableOpacity onPress={() => play(`https://caballeros.chseguros.com.co/img/oraciones/audio/${Data.audio}`)} style={{marginHorizontal:20}}>
                      <Image source={img_play} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                  }


                  {playState == 'playing' && 
                    <TouchableOpacity onPress={ () => pause()} style={{marginHorizontal:20}}>
                        <Image source={img_pause} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                  }
              </View>


              <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row'}}>
                    <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={ () => onSliderEditStart()}
                        // onTouchMove={() => console.log('onTouchMove')}
                        onTouchEnd={() => onSliderEditEnd()}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        onValueChange={(value) => onSliderEditing(value)}
                        value={playSeconds} maximumValue={duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                    <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
                </View>




              
              

              


          </ImageBackground>


          {Opacity == 0 &&
            <ActivityIndicator size="large" color="#fff" />
          }
          <View style = {{marginTop: 14, padding: 10, width : "100%", alignItems: "center"}} opacity={Opacity}>
              
              <View style={{width:  "85%", alignItems : "center", justifyContent : "center", paddingBottom:10}}>
                <Text style={{color : "#fff", textAlign : "center",fontWeight : "bold", fontSize : 20, alignSelf : "center", fontFamily:"Lobster-Regular"}}>{Data.titulo}</Text>
              </View>
              <WebView
                 source={{ uri: `https://caballeros.chseguros.com.co/view/oraciones/${Data.id}` }} 
                 style={{width: 400, height: (Dimensions.get('window').height - 300), marginLeft:80, flex: 1}}
                 onLoad={() => setOpacity(1)}
              />
          </View>

         
                                   
        </ScrollView>
       
        
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%', backgroundColor: "#0E1257", marginBottom: 0
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

