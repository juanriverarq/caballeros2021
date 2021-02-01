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


function Index(props) {  



  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})

  }


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0E1257"/>
      <SafeAreaView>


        <ScrollView
          style={styles.scrollView}>

          <ImageBackground source={require('../src/background.jpg')}
                                              style={{ width : 0,height : 0,}}
                                              imageStyle={{resizeMode : 'repeat', }}>
          </ImageBackground>

          <View style={{ flex: 1, backgroundColor: "#0E1257", paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60}}>
              
              <Text style={{ marginLeft: 35, fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 35}}>Oraciones</Text>
              <Text style={{ marginLeft: 35, color: "#fff", fontSize: 20, marginBottom: 15}}>Santo Rosario</Text>
          </View>


          <View style = {{marginTop: 20, padding: 18, width : "100%"}}>
              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> goToScreen("MisteriosLuminosos") }>

                <ImageBackground source={require('../src/oraciones4.png')}
                                                  style={{ width : "100%",height : 170,justifyContent: "flex-end", alignItems : "flex-end"}}
                                                  imageStyle={{ borderRadius: 20 }}>

                      <Text style={{color : "white", fontWeight : "bold",  fontSize: 20, textAlign: "center", marginBottom: 10, marginRight: 12}}>Misterios Luminosos</Text>
                </ImageBackground>

            </TouchableOpacity>
          </View>




          <View style = {{marginTop: 20, padding: 18, width : "100%"}}>
              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> goToScreen("OracionGuiada") }>

                <ImageBackground source={require('../src/gloriosos.png')}
                                                  style={{ width : "100%",height : 170,justifyContent: "flex-end", alignItems : "flex-end"}}
                                                  imageStyle={{ borderRadius: 20 }}>

                      <Text style={{color : "white", fontWeight : "bold",  fontSize: 20, textAlign: "center", marginBottom: 10, marginRight: 12}}>Misterios Gloriosos</Text>
                </ImageBackground>

            </TouchableOpacity>
          </View>



          <View style = {{marginTop: 20, padding: 18, width : "100%"}}>
              <TouchableOpacity style={styles.itemMenu} onPress={ ()=> goToScreen("OracionGuiada") }>

                <ImageBackground source={require('../src/dolorosos.png')}
                                                  style={{ width : "100%",height : 170,justifyContent: "flex-end", alignItems : "flex-end"}}
                                                  imageStyle={{ borderRadius: 20 }}>

                      <Text style={{color : "white", fontWeight : "bold",  fontSize: 20, textAlign: "center", marginBottom: 10, marginRight: 12}}>Misterios Dolorosos</Text>
                </ImageBackground>

            </TouchableOpacity>
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

