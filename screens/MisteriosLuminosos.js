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
      <StatusBar barStyle="light-content" backgroundColor="#0E1257"/>
      <SafeAreaView style={{backgroundColor: "#0E1257"}}>


        <ScrollView
          style={styles.scrollView}>

          <ImageBackground source={require('../src/background.jpg')}
                                              style={{ width : 0,height : 0,}}
                                              imageStyle={{resizeMode : 'repeat', }}>
          </ImageBackground>



          <ImageBackground source={require('../src/luminosos_back.png')}
                                              style={{ width : "100%",height : 230}}
                                              imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>

            <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 35}}>Oración guiada</Text>
            </View>
          </ImageBackground>



          <View style = {{marginTop: 4, padding: 18, width : "100%", alignItems: "center"}}>

            <Text style={{color : "black", fontSize: 16,  marginBottom: 10, width : "90%", color: "white", fontWeight : "bold"}}>
                Ofrecimiento del Rosarios
            </Text>


            <Text style={{color : "black", fontSize: 13,  marginBottom: 10, width : "90%", color: "white"}}>
                Me uno a todos los santos que están el cielo, 
                a todos los justos que están en la tierra, a 
                todas las almas fieles que están en este lugar.</Text>


            <Text style={{color : "black", fontSize: 13,  marginBottom: 10, width : "90%", color: "white"}}>
                Me uno a Vos oh Jesús, para alabar 
                dignamente a vuestra Santa Madre y 
                alabaros a Vos en Ella y por Ella.</Text>

            <Text style={{color : "black", fontSize: 13,  marginBottom: 10, width : "90%", color: "white"}}>
                Renuncio a todas las distracciones que me 
                vinieren durante este rosario, que quiero 
                recitar con modestia, atención y devoción 
                como si fuera el ultimo de mi vida. Amén.</Text>


            <Text style={{color : "black", fontSize: 16,  marginBottom: 10, width : "90%", color: "white", fontWeight : "bold"}}>
               Señal de la Cruz
            </Text>


            <Text style={{color : "black", fontSize: 13,  marginBottom: 10, width : "90%", color: "white"}}>
                Por la señal de la Santa Cruz, de nuestros 
                enemigos, líbranos Señor, Dios nuestro.
                En el nombre del Padre y del Hijo y del 
                Espíritu Santo. Amén.
            </Text>




            



                


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
    width:'100%',marginBottom: 70, height: "90%"
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

