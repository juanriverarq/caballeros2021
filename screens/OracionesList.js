/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,

} from 'react-native';

import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';

import {Api, serverPublic, base_url} from '../Env'    
import axios from 'axios'



function Index(props) {  

    
  const {navigation} = props
  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }


    let categoria 
    if(props){
      categoria = props.route.params.category
    }else{
      categoria = props.route.params.category
    }



  const [Category, SetCategory] = useState(false);
  const [Oraciones, SetOraciones] = useState(false);
  const [OracionesSubCategoria, SetOracionesSubCategoria] = useState(false);
  const [Load, SetLoad] = useState(true);

 

  //console.log(props.route.params.category, "categori")
   useEffect(()=>{

      SetLoad(true)
      console.log('Enviando formulario')
      console.log(base_url(Api,`get/oraciones/${props.route.params.category}`))
      axios.get( base_url(Api,`get/oraciones/${props.route.params.category}`)).then(function (response) {
        //   console.log(response.data)
        SetOraciones(response.data.categorias)
        SetOracionesSubCategoria(response.data.sub_categorias)
        SetLoad(false)
      })
      .catch(function (error) { console.log(error.message)})
      .then(function () {console.log("response.data")});


      //SetCategory(categoria)
      //GetDetail(categoria)
  },[categoria])

  
  async function GetDetail(categoria){
     await SetCategory(categoria)

     
      

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
              <TouchableOpacity onPress={()=>goToScreen('Oraciones')} style={{marginTop: 30, marginLeft: 20}}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>  
              <Text style={{ marginLeft: 35, fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 70, fontFamily:"Lobster-Regular"}}>Oraciones</Text>
              <Text style={{ marginLeft: 35, color: "#fff", fontSize: 20, marginBottom: 15}}>{props.route.params.category}</Text>
              </ImageBackground>
          </View>

          {Load &&
            <ActivityIndicator style={{marginTop: 30}}  size="large" color="#0E1257"  />
          }

          {Oraciones &&
            <View style={{marginTop : 10}}>
                {
                    Oraciones.map((item, key) =>{
                        return <View style = {{marginTop: 17, paddingHorizontal: 17, width : "100%"}} key={key}>
                                    <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("OracionesDetail", {"data" : item, "randomCode" : Math.random()}) }>
                                            <ImageBackground source={{uri: `${serverPublic}/img/oraciones/image/${item.image}`}} style={{ width : "100%",height : 150,justifyContent: "flex-end", alignItems : "flex-end"}}
                                             imageStyle={{ borderRadius: 20 }}
                                              resizeMode= "cover"
                                            >
                                            <View style={styles.overlay} />
                                            <Text style={{color : "white", fontWeight : "bold",  fontSize: 20, textAlign: "center", marginBottom: 10, marginRight: 12, fontFamily:"Lobster-Regular"}}>{item.titulo}</Text>
                                            </ImageBackground>                                                                             
                                    </TouchableOpacity>
                                </View>
                    })
                }
            </View> 
          }



          {OracionesSubCategoria &&
            <View style={{marginBottom: 100}}>
                {
                    OracionesSubCategoria.map((item, key) =>{
                        return <View style = {{marginTop: 17, paddingHorizontal: 17, width : "100%"}} key={key}>
                                    <TouchableOpacity style={styles.itemMenu} onPress={ ()=> navigation.navigate("OracionesListSubCategoria", {"data" : item, "randomCode" : Math.random()}) }>
                                    <ImageBackground source={{uri: `${serverPublic}/img/oraciones/image/${item.image}`}} style={{ width : "100%",height : 150,justifyContent: "flex-end", alignItems : "flex-end"}}
                                             imageStyle={{ borderRadius: 20 }}
                                              resizeMode= "cover"
                                            >
                                            <View style={styles.overlay} />
                                            <Text style={{color : "white", fontWeight : "bold",  fontSize: 20, textAlign: "center", marginBottom: 10, marginRight: 12, fontFamily:"Lobster-Regular"}}>{item.title_sub_categoria}</Text>
                                            </ImageBackground>                                              
                                            
                                    </TouchableOpacity>
                                </View>
                    })
                }
            </View> 
          }




        </ScrollView>
</ImageBackground>
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%'
   
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity:0.6,
    borderRadius:20
  },
  body: {
    backgroundColor: "white",
  },
  sectionContainer: {
    marginTop: 2,
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

