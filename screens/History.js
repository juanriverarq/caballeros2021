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
  Image,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList
} from 'react-native';

import Menu from '../components/Menu';

import { WebView } from 'react-native-webview';
import {Api, serverPublic, base_url} from '../Env'    
import axios from 'axios'

import Share from 'react-native-share';


function Index(props) {  


  const [modalVisible, setModalVisible] = useState(false);
  const [ShowImage, setShowImage]    = useState("galley1.png");
  const [Images, setImages]    = useState([]);
  const [ImagesBase64, setImagesBase64]    = useState([]);

  const [Videos, setVideos] = useState([]);


  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})
  }



  useEffect(()=>{
    console.log('Enviando formulario')
    console.log(base_url(Api,`historias`))
    axios.get( base_url(Api,`historias`)).then(function (response) {
        setVideos(response.data)
    })
    .catch(function (error) { console.log(error.message)})
    .then(function () {console.log("response.data")});
  },[])


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F3E1"/>
      <SafeAreaView style = {{backgroundColor : "#F8F3E1"}}>


        <ScrollView
          style={styles.scrollView}>

          <ImageBackground source={require('../src/background.jpg')}
                                              style={{ width : 0,height : 0,}}
                                              imageStyle={{resizeMode : 'repeat', }}>
          </ImageBackground>



          <View style = {{marginTop: 40, padding: 10, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 20, color: "#464646",  marginBottom: 1, width : "90%", textAlign: "center", fontWeight: "bold", fontFamily:"Lobster-Regular"}}>
                Historias religiosas
            </Text>
          </View>


            <View style={{backgroundColor : "white",borderRadius: 10}}>
                {
                  Videos.map((item, key) =>{
                      return <View style = {{flexDirection  : "row", justifyContent : "space-around", padding: 10, }}>
                                <WebView source={{ uri: `${item.video}` }}  style={{width: '100%', height: 200}}/>
                            </View>
                  })
                } 
            </View>

                                   
        </ScrollView>

        <Menu props = {props} />

        
      </SafeAreaView>
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%", padding : 16
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
    width:"90%",
    backgroundColor:"#8F0D0F",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
  },

  loginText:{
    color:"white"
  },

  modalView: {
    padding: 35,
    alignItems: "center",
    backgroundColor : 'rgba(52, 52, 52, 0.8)',
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
  share: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


});

