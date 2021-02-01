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
import { Icon } from 'react-native-eva-icons';

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
       <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
       
         

          <ImageBackground source={require('../src/fondo1.jpg')}
                                                style={{ width : "100%",height : "100%"}}>    

<ScrollView
            style={styles.scrollView}>

            <View style={{alignItems: "center",top:'5%', marginBottom:'5%'}}>
                <Image style={{width: 100, height: 100, resizeMode: "contain"}} source={require('../src/logo.png')}/>
                <Text style={{fontWeight : "bold", color: "#8F0D0F", fontSize: 20, fontFamily:"Lobster-Regular"}}>¡Salve María!</Text>
                <Text style={{fontWeight : '400', color: "black", fontSize: 20}}>{userDetails.name}</Text>
            </View>


            <View style={{backgroundColor : "#0E1257", padding : 20, color: "white", marginTop : 30}}>
              <View style = {{flexDirection  : "row", justifyContent : "space-between",}}>
                <Text style={{color: "white", fontWeight : "bold", fontSize: 20, fontFamily:"Lobster-Regular"}}>Espacio de Oración</Text>
                <TouchableOpacity onPress={ ()=> goToScreen("Oraciones") } >
                <Text style={{color: "white", marginTop:5, fontWeight:'400'}}>Ver Todas</Text>
                </TouchableOpacity>
              </View>


              <ScrollView horizontal={true} style={{marginTop: 20}}>
              <TouchableOpacity onPress={ ()=> goToScreen("Live") } >
                  <ImageBackground source={require('../src/misa2.jpg')}
                                                    style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                    imageStyle={{ borderRadius: 20 }}>
                       <View style={styles.overlay} />
                      <View  style={{marginBottom:-4}}><Icon name='radio-outline' width={20} height={20} fill='white' /></View>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Santa Misa</Text>
                        <Text style={{color : "white"}}>En vivo</Text>
                        
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=> goToScreen("OracionGuiada") } >
                  <ImageBackground source={require('../src/guiada.png')}
                                                    style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                    imageStyle={{ borderRadius: 20 }}>
                      <View  style={{marginBottom:-10}}><Icon name='arrow-right' width={25} height={25} fill='white' /></View>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Oración guiada</Text>
                        <Text style={{color : "white"}}>Iniciar a orar</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=> goToScreen("Confe") } >
                  <ImageBackground source={require('../src/confe.jpg')}
                                                    style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                    imageStyle={{ borderRadius: 20 }}>
                      <View  style={{marginBottom:-10}}><Icon name='arrow-right' width={25} height={25} fill='white' /></View>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Confesarme</Text>
                        <Text style={{color : "white"}}>Paso a paso</Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Santo Rosario"}) } >
                <ImageBackground source={require('../src/rosarioo.jpg')}
                                                  style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                  imageStyle={{ borderRadius: 20 }}>

                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Santo Rosario</Text>
                      
                </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Letanías"}) } >
                <ImageBackground source={require('../src/leta.png')}
                                                  style={{ width : 130,height : 75, marginRight: 15, justifyContent: "center", alignItems: "center"}}
                                                  imageStyle={{ borderRadius: 20 }}>
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Letanías</Text>
                  
                </ImageBackground>
                </TouchableOpacity>

              </ScrollView>

            </View>





              <View style = {{flexDirection  : "row", justifyContent : "space-around", marginTop: 0, paddingBottom: 16,paddingTop: 16, width:'100%'}}>

                <TouchableOpacity onPress={ ()=> goToScreen("History") } >
                  <ImageBackground source={require('../src/history.png')}
                                                    style={{ width : 160,height : 180, justifyContent: "flex-end", padding: 12}}
                                                    imageStyle={{ borderRadius: 20 }}>


                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Historias</Text>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Religiosas</Text>
                        
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={ ()=> goToScreen("ShareImage") } >
                  <ImageBackground source={require('../src/share_image.png')}
                                                    style={{ width : 160,height : 180,  justifyContent: "flex-end",  padding: 12}}
                                                    imageStyle={{ borderRadius: 20 }}>


                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Imágenes</Text>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>para compartir</Text>
                  </ImageBackground>
                </TouchableOpacity>
                

              </View>




              <TouchableOpacity onPress={ ()=> goToScreen("Donate") } >
                <View style = {{marginTop: -20, padding: 18, width : "100%"}}>
                  <ImageBackground source={require('../src/dona.png')}
                                                    style={{ width : "100%",height : 130,justifyContent: "center", alignItems : "center"}}
                                                    imageStyle={{ borderRadius: 20 }}>


                        <Text style={{color : "white", fontSize: 14, textAlign: "center"}}>Estos jóvenes necesitan de ti para seguir su formación como apóstoles de María.</Text>
                        <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>¡Quiero suscribirme!</Text>
                        
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              </ScrollView>
          </ImageBackground>   
              
                                               
        
        
        <Menu props = {props} />
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',
    marginBottom: "20%"
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
    opacity:0.4,
    borderRadius:20
  },

});

