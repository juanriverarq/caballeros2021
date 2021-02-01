/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

import Menu from '../components/Menu';

import { Icon } from 'react-native-eva-icons';


function Index(props) {  


  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})

  }





  return (
    <>
        <StatusBar backgroundColor="transparent" translucent/>
        <ImageBackground source={require('../src/fondo1.jpg')}
                                              style={{ width : "100%",height : "100%"}}>
        <ScrollView
          style={styles.scrollView}>

            
        

          <View>
          <ImageBackground source={require('../src/images/arriba.jpg')}
                                              style={{ flex: 1, paddingTop: 0}}
                                              imageStyle={{resizeMode : 'cover',borderBottomEndRadius: 60, borderBottomStartRadius: 60 }}>
              <Text style={{ marginLeft: 35, fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 125, marginBottom:40, fontFamily:"Lobster-Regular"}}>Oraciones</Text>
                            </ImageBackground>

          </View>


          <View style = {{marginTop: 20, padding: 18, width : "100%"}}>


            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> goToScreen("OracionGuiada") }>

                <ImageBackground source={require('../src/guiada.png')}
                                                  style={{ width : "100%",height : 135,justifyContent: "center", alignItems : "center"}}
                                                  imageStyle={{ borderRadius: 20 }}>
                     <View style={styles.overlay} />
                     <View  style={{marginBottom:-10}}><Icon name='arrow-right' width={34} height={34} fill='white' /></View>
                      <Text style={{color : "white", fontWeight : "bold",  fontSize: 26, textAlign: "center", fontFamily:"Lobster-Regular"}}>Oración guiada</Text>
                      <Text style={{color : "white", fontSize: 14}}>Iniciar oración</Text>
                      
                </ImageBackground>

            </TouchableOpacity>




              
            </View>


            <View style = {{flexDirection  : "row", justifyContent : "space-between", padding: 18, paddingBottom: 15, paddingTop: 0}}>



            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Santo Rosario"}) }>
              <ImageBackground source={require('../src/rosarioo.jpg')}
                                                style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                imageStyle={{ borderRadius: 20 }}>
                                                <View style={styles.overlay} />
                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Santo Rosario</Text>
               </ImageBackground>
            </TouchableOpacity>


            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Letanías"}) }>
              <ImageBackground source={require('../src/leta.png')}
                                                style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                imageStyle={{ borderRadius: 20 }}>
                                                <View style={styles.overlay} />
                    <Text style={{color : "white", fontWeight : "bold", fontSize: 16, fontFamily:"Lobster-Regular"}}>Letanías</Text>
               </ImageBackground>
            </TouchableOpacity>
               

            </View>



            <View style = {{flexDirection  : "row", justifyContent : "space-between", padding: 18, paddingBottom: 15, paddingTop: 0}}>


              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Oraciones Diversas"}) }>
                <ImageBackground source={require('../src/diver.png')}
                                                  style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                  imageStyle={{ borderRadius: 20 }}>
                                                  <View style={styles.overlay} />
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, textAlign: "center", fontFamily:"Lobster-Regular"}}>Oraciones Diversas</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Oraciones de la Confianza"}) }>
                <ImageBackground source={require('../src/confi.png')}
                                                  style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                  imageStyle={{ borderRadius: 20 }}>
                                                  <View style={styles.overlay} />
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, textAlign: "center", fontFamily:"Lobster-Regular"}}>Oraciones de la Confianza</Text>
                </ImageBackground>
              </TouchableOpacity>

            </View>




            <View style = {{flexDirection  : "row", justifyContent : "space-between", padding: 18, paddingBottom: 15, paddingTop: 0}}>

              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Coronilla de la Misericordia"}) }>
                <ImageBackground source={require('../src/coro.jpg')}
                                                  style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                  imageStyle={{ borderRadius: 20 }}>
                                                  <View style={styles.overlay} />
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, textAlign: "center", fontFamily:"Lobster-Regular"}}>Coronilla de la Misericordia</Text>
                </ImageBackground>
              </TouchableOpacity>


              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("ListOraciones", {"category" : "Oraciones por la Familia"}) }>
                <ImageBackground source={require('../src/fami.png')}
                                                  style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12}}
                                                  imageStyle={{ borderRadius: 20 }}>
                                                  <View style={styles.overlay} />
                      <Text style={{color : "white", fontWeight : "bold", fontSize: 16, textAlign: "center",fontFamily:"Lobster-Regular"}}>Oraciones por la Familia</Text>
                </ImageBackground>
              </TouchableOpacity>

            </View>



                                            
        </ScrollView>
 </ImageBackground>   
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
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity:0.4,
    borderRadius:20
  },

});

