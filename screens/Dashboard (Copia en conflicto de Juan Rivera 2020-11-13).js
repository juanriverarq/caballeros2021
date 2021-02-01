/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  ImageBackground,
  
  Text,
  TouchableOpacity
} from 'react-native';


import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu';




function Index(props) {  

  const userDetails     = useContext(UserContext)
  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})
  }



  useEffect(()=>{
      console.log(userDetails)
  },[])







  return (
    <>
      <StatusBar backgroundColor="transparent" translucent/>
        <ScrollView
          style={styles.scrollView}>
          <ImageBackground source={require('../src/fondo1.jpg')}
                                              style={{ width : "100%",height : "100%"}}
                                            >

    
          <View style={{alignItems: "center", marginTop:30}}>
              <Image style={{width: 100, height: 100, resizeMode: "contain"}} source={require('../src/logo.png')}/>
              <Text style={{fontWeight : "bold", color: "#8F0D0F", fontSize: 20}}>¡Salve María!</Text>
              <Text style={{fontWeight : '400', color: "black", fontSize: 20}}>{userDetails.name}</Text>
          </View>

         
          <View style={{backgroundColor : "#0E1257", padding : 20, color: "white", marginTop : 30}}>
            <View style = {{flexDirection  : "row", justifyContent : "space-between",}}>
              <Text style={{color: "white", fontWeight : "bold", fontSize: 20}}>Oraciones</Text>
              <TouchableOpacity onPress={ ()=> goToScreen("Oraciones") } >
              <Text style={{color: "white", marginTop:5, fontWeight:'400'}}>Ver Todas</Text>
               </TouchableOpacity>
            </View>


            <ScrollView horizontal={true} style={{marginTop: 20}}>




              <TouchableOpacity onPress={ ()=> goToScreen("OracionGuiada") } >
                <ImageBackground source={require('../src/oracion.png')}
                                                  style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                  imageStyle={{ borderRadius: 20 }}>


                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Oración guiada</Text>
                      <Text style={{color : "white"}}>Iniciar a orar</Text>
                </ImageBackground>
                </TouchableOpacity>

              
               <ImageBackground source={require('../src/rosarioo.jpg')}
                                                style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                imageStyle={{ borderRadius: 20 }}>

                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Santo Rosario</Text>
                    
               </ImageBackground>
               <ImageBackground source={require('../src/leta.png')}
                                                style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                imageStyle={{ borderRadius: 20 }}>
                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Letanías</Text>
                 
               </ImageBackground>

            </ScrollView>

          </View>





            <View style = {{flexDirection  : "row", justifyContent : "space-between", marginTop: 0, padding: 18, width:'100%'}}>
              
                <ImageBackground source={require('../src/history.png')}
                                                style={{ width : 160,height : 200, marginRight: 20, justifyContent: "flex-end", padding: 12}}
                                                imageStyle={{ borderRadius: 20 }}>


                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Historias</Text>
                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Religiosas</Text>
                    
               </ImageBackground>


               <TouchableOpacity onPress={ ()=> goToScreen("ShareImage") } >
                <ImageBackground source={require('../src/share_image.png')}
                                                  style={{ width : 160,height : 200, marginRight: 20, justifyContent: "flex-end",  padding: 12}}
                                                  imageStyle={{ borderRadius: 20 }}>


                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>Imágenes</Text>
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>para compartir</Text>
                </ImageBackground>
              </TouchableOpacity>
               

            </View>




            <TouchableOpacity onPress={ ()=> goToScreen("Donate") } >
              <View style = {{marginTop: -20, padding: 18, width : "100%"}}>
                <ImageBackground source={require('../src/dona.png')}
                                                  style={{ width : "100%",height : 130,justifyContent: "center", alignItems : "center"}}
                                                  imageStyle={{ borderRadius: 20 }}>


                      <Text style={{color : "white", fontSize: 14, textAlign: "center"}}>Estos jóvenes necesitan de ti para seguir su formación como apóstoles de María.</Text>
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16}}>¡Quiero donar!</Text>
                      
                </ImageBackground>
              </View>
            </TouchableOpacity>


  </ImageBackground>
            
                                              
        </ScrollView>

        <Menu props = {props} />

        
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70
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


});

