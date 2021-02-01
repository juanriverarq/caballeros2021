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
  Dimensions,
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
  function goToScreen(screen, data)
  {   
      //  navigation.navigate(screen, {randomCode : Math.random(), "Data" : data})
      props.navigation.goBack()
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
             <TouchableOpacity onPress={()=>goToScreen('EvangelioDetail', props.route.params.Data)}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>

              <ImageBackground source={{uri : `https://caballeros.chseguros.com.co/img/evangelios/${props.route.params.Data.foto_santo}`}}
                                                style={{ width : 80,height : 80, marginRight: 0, justifyContent: "center", alignItems: "center", alignSelf : "center"}}
                                                imageStyle={{ borderRadius: 10 }}>               
               </ImageBackground>


           <Text style={{color:'white', fontWeight : "bold", fontSize: 16, textAlign:'center', marginBottom:10, marginTop:10}}>{props.route.params.Data.name_santo} </Text>      
          </View>

            <View style={{padding : 20, marginTop : 20}}>

                  
                  <View style = {{justifyContent : "space-between",width:'100%', marginBottom:10, backgroundColor:'white', padding:10, borderRadius:20}}>
                      <View style = {{width:'100%', marginLeft:10}}>

                      <WebView
                            originWhitelist={['*']}
                            source={{ html: `${Html}` }}
                            style={{width:'100%',height: (Dimensions.get('window').height - 350)}}
                            scalesPageToFit={false}
                          />

                                      
                      <Text style={{ fontWeight : "300", fontSize: 13, paddingRight:20}}>{/*props.route.params.Data.descripcion_evangelio*/}</Text>
                      </View>
                  </View>



            </View>

                                              
        </ScrollView>

      
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

