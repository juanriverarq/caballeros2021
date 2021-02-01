/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Accordion from 'react-native-collapsible/Accordion';

import React, {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Picker,
  Button,
  ActionSheetIOS,
  Alert
} from 'react-native';

import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import Video from "react-native-video";

import UserContext from '../contexts/UserContext'


import {Api, base_url} from '../Env'    
import axios from 'axios'

import TimePicker from 'react-native-simple-time-picker';

import { ActionSheet } from 'react-native-cross-actionsheet'



function Index(props) {  




    

  const {navigation} = props
  async function goToScreen(screen)
  {   
    await setModalVisibleCheck(false)
    await navigation.navigate(screen, {randomCode : Math.random()})
  }


  let randomCode 
  if(props){
      randomCode = props.route.params.randomCode
  }else{
      randomCode = Math.random()
  }





  return (
    <>
       
<ImageBackground source={require('../src/fondo1.jpg')}
                                              style={{ width : "100%",height : "100%"}}>  
        <ScrollView
          style={styles.scrollView}>
            <StatusBar backgroundColor="transparent" translucent/>
          
  

          <ImageBackground source={require('../src/confe.jpg')}
                                              style={{ width : "100%",height : 200}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
                <View style={styles.overlay} />
              <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginTop: 30, marginLeft: 20}}>

                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>
            <View style={{ flex: 1,  paddingTop: 0,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: -40}}>Cómo confersarse</Text>
            </View>
          </ImageBackground>



          <View style = {{marginTop: 4, padding: 20, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 15,  marginBottom: 10, width : "90%", textAlign:'center'}}>
              En esta sección aprenderás a confesarte paso a paso,  <Text style={{fontWeight : "bold"}} >¡Salve María!</Text>
            </Text>
          </View>


      


          <View style = {{marginTop: 4, padding: 18, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 16, color: "#8F0D0F",  marginBottom: 10, width : "90%", textAlign: "center", fontWeight: "bold"}}>
                Oraciones del día
                
            </Text>
           
          </View>


          
          
        </ScrollView>
  </ImageBackground>   

       
  <Menu props = {props} /> 
      
    </>
  );

}

export default Index;
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%",
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

  BtnPrimary:{
    width:"40%",
    backgroundColor:"green",
    borderRadius:25,
    height:35,
    alignItems:"center",
    justifyContent:"center",
    marginTop:0,
  },
  modalView: {
    padding: 0,
    alignItems: "center",
    backgroundColor : 'white',
    height: "100%",
    shadowOffset: {
    width: 0,
    height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 160
  },


  select: {
   width: 250,
    color: "#777",
    borderBottomColor: "#0093d9",
    marginBottom:10,
    
  },

  backgroundVideo: {
    height: (height - 380),
    width: "100%",
    alignSelf : "center",
    
  },



  menu: {
    padding:10 ,
    width: "100%",
    backgroundColor: 'white',
    flexDirection  : "row",
    justifyContent : "space-evenly",
    position: "absolute",
    bottom: 0,
    borderTopColor: "#ddd",
    borderTopWidth: 1
},

itemMenu : {
    alignItems: "center"
},


texMenu : {
    color : "#777"
},

texMenuActive : {
    color : "#0093d9"
},
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity:0.4,
    borderRadius:50
  },





});

