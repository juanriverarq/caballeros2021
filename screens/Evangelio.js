/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';


import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu';
import { WebView } from 'react-native-webview';
import {Api, serverPublic, base_url} from '../Env'    
import axios from 'axios'



function Index(props) {  

  const userDetails           = useContext(UserContext)

  const [DataDay, setDataDay] = useState(false);
  const [DataLast, setDataLast] = useState([]);
  const [Opacity, setOpacity] = useState(0);

  const {navigation} = props
  function goToScreen(screen, data)
  {   
        navigation.navigate(screen, {randomCode : Math.random(), "Data" : data})
  }



  useEffect(()=>{

    setOpacity(0)


    console.log('Enviando formulario')
    console.log(base_url(Api,`evangelio/alls`))
    axios.get( base_url(Api,`evangelio/alls`)).then(function (response) {
      setDataDay(response.data.date_day)
      setDataLast(response.data.data_last)
      console.log(response.data.date_day.descripcion_evangelio)
    })
    .catch(function (error) { console.log(error.message)})
    .then(function () {console.log("response.data")});
  
  },[])







  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#0E1257"/>
        <ScrollView
          style={styles.scrollView}>

          <View style={{backgroundColor : "#0E1257", padding : 20,paddingTop:70, color: "white", marginTop : -20}}>
            <View style = {{flexDirection  : "row", justifyContent : "space-between",}}>
              <Text style={{color: "white", fontWeight : "bold", fontSize: 20, fontFamily:"Lobster-Regular"}}>Evangelio del Día</Text>      
              <TouchableOpacity onPress={ ()=> goToScreen("EvangelioDetail", DataDay) } >
              <Text style={{color: "white", marginTop:5, fontWeight:'400'}}>Leer todo</Text>
              </TouchableOpacity>
            </View>


            <ScrollView horizontal={false} style={{marginTop: 20}}>

              <View style = {{flexDirection  : "row", justifyContent : "space-between",width:'100%'}}>
                <View style = {{width:'30%'}}>
               <ImageBackground source={{
                 uri: `https://caballeros.chseguros.com.co/img/evangelios/${DataDay.foto_santo}`
               }}
                                                style={{ width : '100%',height : 75, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                                                imageStyle={{ borderRadius: 20 }}>               
               </ImageBackground>
                </View>
                <View style = {{width:'65%', marginLeft:10}} >
                 <Text style={{color : "white", fontWeight : "800", fontSize: 14}}>{DataDay &&

                   <Text>{DataDay.evangelio} de {DataDay.fecha}</Text>
                 } </Text>


                </View>
                 </View>
            </ScrollView>

          </View>

            <View style={{padding : 20, marginTop : 0}}>
                <Text style={{fontWeight : "bold", fontSize: 18, textAlign:'center', marginTop:-10, marginBottom:10, fontFamily:"Lobster-Regular"}}>Evangelios recientes</Text>    

                {
                  DataLast.map((item, key) =>{
                      return <TouchableOpacity onPress={ ()=> goToScreen("EvangelioDetail", item) } >
                              <View style = {{flexDirection  : "row", justifyContent : "space-between",width:'100%', marginBottom:10, backgroundColor:'white', padding:10, borderRadius:20}}>
                                  <View style = {{width:'30%'}}>
                                <ImageBackground source={{
                                    uri: `https://caballeros.chseguros.com.co/img/evangelios/${item.foto_santo}`
                                  }}
                                                                  style={{ width : '100%',height : 55, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                                                                  imageStyle={{ borderRadius: 20 }}>               
                                </ImageBackground>
                                  </View>
                                  <View style = {{width:'60%', marginLeft:10}}>
                                  <Text style={{ fontWeight : "600", fontSize: 14}}>{item.evangelio} de {item.fecha}</Text>

                                  </View>
                              </View>
                            </TouchableOpacity>
                  }).reverse()
                } 
                
            </View>






           

            
                                              
        </ScrollView>

        <Menu props = {props} />

        
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, paddingTop:0, marginTop:0
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

