/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackground,
  
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu';
import { WebView } from 'react-native-webview';



function Index(props) {  

  const userDetails     = useContext(UserContext)
  const {navigation} = props
  function goToScreen(screen)
  {   
        navigation.navigate(screen, {randomCode : Math.random()})
  }


  function goToScreen2(screen, data)
  {   
        navigation.navigate(screen, {"Data" : data})
  }



  let randomCode 
    if(props){
      randomCode = props.route.params.randomCode
    }else{
      randomCode = props.route.params.randomCode
    }

  const [Html, setHtml] = useState(false);


  useEffect(()=>{
      console.log(props.route.params.Data)
      setHtml('<style> div, span, p{ font-size: 45px !important }</style>' + props.route.params.Data.descripcion_evangelio + '')
  },[randomCode])






  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#0E1257"/>
        <ScrollView
          style={styles.scrollView}>
             
           <View style={{backgroundColor : "#0E1257", padding : 20,paddingTop:30, color: "white", borderBottomEndRadius: 60, borderBottomStartRadius: 60}}>
             <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>
           <Text style={{color:'white', fontWeight : "bold", fontSize: 18, textAlign:'center', marginBottom:10, marginTop:10, fontFamily:"Lobster-Regular"}}>{props.route.params.Data.evangelio} de {props.route.params.Data.fecha}</Text>      
          </View>

            <View style={{padding : 20, marginTop : 0}}>

                  
                  <View style = {{justifyContent : "space-between",width:'100%', marginBottom:10, backgroundColor:'white', padding:10, borderRadius:20}}>
                      <View style = {{width:'100%', marginLeft:10}}>

                         <WebView
                            originWhitelist={['*']}
                            source={{ html: `${Html}` }}
                            style={{width:'100%',height: (Dimensions.get('window').height - 350)}}
                            scalesPageToFit={true}
                          />

                                      
                      <Text style={{ fontWeight : "300", fontSize: 13, paddingRight:20}}>{/*props.route.params.Data.descripcion_evangelio*/}</Text>
                      </View>
                  </View>



            </View>

                                              
        </ScrollView>


        <View style={{backgroundColor : "#0E1257", padding : 20,paddingTop:0, color: "white", marginTop : -20}}>
            <View style = {{flexDirection  : "row", justifyContent : "space-between",marginBottom:10,paddingTop:10}}>
              <Text style={{color: "white", fontWeight : "bold", fontSize: 16,fontFamily:"Lobster-Regular"}}>Santo del día</Text>      
              <TouchableOpacity onPress={ ()=> goToScreen2("SantoDetail", props.route.params.Data) } >
              <Text style={{color: "white", marginTop:0, fontWeight:'400'}}>Ver reseña completa</Text>
              </TouchableOpacity>
            </View>



              <View style = {{flexDirection  : "row", justifyContent : "space-between",width:'100%'}}>
                <View style = {{width:'15%'}}>
               <ImageBackground source={{uri : `https://caballeros.chseguros.com.co/img/evangelios/${props.route.params.Data.foto_santo}`}}
                                                style={{ width : '100%',height : 30, marginRight: 0, justifyContent: "center", alignItems: "center"}}
                                                imageStyle={{ borderRadius: 10 }}>               
               </ImageBackground>
                </View>
                <View style = {{width:'85%', marginLeft:6}}>
                  <WebView
                            originWhitelist={['*']}
                            source={{ html: `<style>
                            
                                               </style><div style="color: white; margin: 0; font-size: 40px !important">${props.route.params.Data.name_santo}, ${props.route.params.Data.descripcion_santo.substring(0,60)}</div>` }}
                            style={{width:300, height: 700,  backgroundColor: 'transparent'}}
                            scalesPageToFit={false}
                          />
               
                </View>
                 </View>

          </View>
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%', paddingTop:0, marginTop:0,
    height: 100
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

