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


  async function GoToPay(amount, concept) {

    await navigation.navigate("MesesPay", {
        randomCode       : Math.random(),
        amount_in_cents  : amount,
        payment_concept  : concept,
        inactive         : false
    }) 
}




  return (
    <>
        <StatusBar backgroundColor="transparent" translucent/>


        <ScrollView
          style={styles.scrollView}>

          <ImageBackground source={require('../src/background.jpg')}
                                              style={{ width : 0,height : 0,}}
                                              imageStyle={{resizeMode : 'repeat', }}>
          </ImageBackground>



          <ImageBackground source={require('../src/donate.png')}
                                              style={{ width : "100%",height : 230}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>

            <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 35}}></Text>
            </View>
          </ImageBackground>




          <View style = {{marginTop: 4, padding: 10, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 16, color: "#464646",  marginBottom: 1, width : "90%", textAlign: "center", fontWeight: "bold"}}>
            Para continuar esta bella misión necesitamos de ti

            </Text>
          </View>

          <View style = {{marginTop: 1, padding: 18, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 13,  marginBottom: 10, width : "90%", textAlign : "center"}}>
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


        {
        /*  <View style={{justifyContent: "center", alignItems : "center"}}>
          <TouchableOpacity style={styles.BtnPrimary} onPress={()=>sendForm()}>
              <Text style={styles.loginText}>Donar</Text>
          </TouchableOpacity>
          </View>*/
        }

                                   
        </ScrollView>

        <Menu props = {props} />

        
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%",backgroundColor : "#F8F3E1",
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
  }


});

