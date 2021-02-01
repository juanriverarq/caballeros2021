/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import Video from "react-native-video";

function Index(props) {  

  const {navigation} = props
  const [VideoVisible, setVideoVisible] = useState(true)

  async function GoToPay(amount, concept) {
    await navigation.navigate("MesesPay", {
        randomCode       : Math.random(),
        amount_in_cents  : amount,
        payment_concept  : concept,
        inactive         : true
    }) 
  }


  return (
    <>
        <StatusBar backgroundColor="transparent" translucent/>


        <ScrollView
          style={styles.scrollView}>

            <View style={{width:'100%', height: 250, borderBottomEndRadius: 40, borderBottomStartRadius: 40,backgroundColor : "white", padding : 0, margin :0}}>

              {VideoVisible &&
                  <Video
                  source={require("../src/pay.mp4")}
                  style={styles.backgroundVideo}
                  resizeMode={"contain"}
                  rate={1.0}
                  onEnd = {()=> setVideoVisible(false)}
                />
              }

              {!VideoVisible &&
                <Image style={{width: 100, height: 100, resizeMode: "contain", position: "absolute",
                alignSelf: "center",bottom: 10}} source={require('../src/logo.png')}/>
              }

            </View>

          <View style = {{marginTop: 4, padding: 10, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 16, color: "white",  marginBottom: 1, width : "90%", textAlign: "center", fontWeight: "bold"}}>
            Para continuar esta bella misión necesitamos de ti

            </Text>
          </View>

          <View style = {{marginTop: 1, padding: 18, width : "100%", alignItems: "center"}}>
            <Text style={{color : "white", fontSize: 13,  marginBottom: 10, width : "90%", textAlign : "center"}}>
             “Y todo aquel que dé de beber tan sólo un vaso de agua fresca a uno de estos pequeños, por ser discípulo, os aseguro que no perderá su recompensa.”  <Text style={{fontWeight : "bold"}} >Mt 10,42</Text>
            </Text>
          </View>





        <View style = {{flexDirection  : "row", justifyContent : "space-between", padding: 18, paddingBottom: 15, paddingTop: 0}}>

            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> GoToPay(15000, "Donar") }>
               <View style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12, borderRadius: 20, backgroundColor : "white"}} >
                    <Text style={{color : "#8F0D0F", fontWeight : "bold", fontSize: 16}}>$15.000</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> GoToPay(30000, "Donar") }>
               <View style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12, borderRadius: 20, backgroundColor : "white"}} >
                    <Text style={{color : "#8F0D0F", fontWeight : "bold", fontSize: 16}}>$30.000</Text>
               </View>
            </TouchableOpacity>
        </View>



        <View style = {{flexDirection  : "row", justifyContent : "space-between", padding: 18, paddingBottom: 15, paddingTop: 0}}>

            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> GoToPay(50000, "Donar") }>
               <View style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12, borderRadius: 20, backgroundColor : "white"}} >
                    <Text style={{color : "#8F0D0F", fontWeight : "bold", fontSize: 16}}>$50.000</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemMenu} onPress={ ()=> GoToPay(200000, "Donar") }>
               <View style={{ width : 150,height : 80, marginRight: 15, justifyContent: "center", alignItems: "center", padding: 12, borderRadius: 20, backgroundColor : "white"}} >
                    <Text style={{color : "#8F0D0F", fontWeight : "bold", fontSize: 16}}>$200.000</Text>
               </View>
            </TouchableOpacity>
        </View>
             
        </ScrollView>

      
    </>
  );

}

export default Index;
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 0, height: "90%",backgroundColor : "#0E1257",
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

  backgroundVideo: {
    height: (height - 370),
    width: "55%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor : "transparent",
    marginBottom:'-9.9%'
  }


});

