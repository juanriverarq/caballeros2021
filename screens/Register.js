import React from 'react';
import { StyleSheet, Text, Dimensions, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid,ImageBackground, Alert} from 'react-native';

import {Api, base_url} from '../Env'    
import axios from 'axios'
import DatePicker from 'react-native-datepicker'


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import { ScrollView } from 'react-native-gesture-handler';
import Video from "react-native-video";



function Index(props){

    const [selectedValue, setSelectedValue] = React.useState("Seleccione");

    const [requesting , setRequesting ]  = React.useState(false)
    const [sendSuccess, setSendSuccess]  = React.useState(false)


    const [notificationToken , setNotificationToken] = React.useState('')
    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const [editable, setEditable] = React.useState(false)

    const { navigation } = props

    function goToScreen(screen)
    {   
       navigation.navigate(screen, {randomCode : Math.random()})
    }


    React.useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])





    React.useEffect(()=>{
      async function getToken(){
          const fcmToken = await messaging().getToken();
          console.log(fcmToken, "FCM TOKEN")
          if (fcmToken)
              {setNotificationToken(fcmToken)} 
          else
          {console.log('user doesnt have a device token yet')}
        }
        getToken()
    },[])




    const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
         // props.navigation.navigate("Home")
      }
      catch (error) {
        // Error saving data
      }
    }






    
    const [formInfo , setFormInfo]       = React.useState({
        name             : '',
        email            : '',
        telefono         : '123',
        fecha_nacimiento : '2020-11-24',
        password         : '',
        repeat_password  : ''
    })


    function onChangeText(text, key){
      setFormInfo({
          ...formInfo,
          [key] : text
      })
    }


    function sendForm(){

      const data = {
        ...formInfo
      }

      data.fcmToken = notificationToken

      data.city = selectedValue
    
      if( data.nombres === '' || data.email === '' || data.password === ''){
        Alert.alert("Completa el formulario")
        return false;
      }

      data.telefono = `+57${data.telefono}`

      setRequesting(true)

      console.log('Enviando formulario')
      console.log(base_url(Api,`app/clients/request/credit`))
     // console.log(data)

      console.log(data)

      axios.post( base_url(Api,`storeUser`), data ).then(function (res) {

        console.log(res.data)
     
        _storeData(res.data)
        setSendSuccess(true)
        setRequesting(false)
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
          Alert.alert(error.response.data)
          setRequesting(false)
      })
      .then(function () {

          setRequesting(false)

      });
     
    }




    if(requesting){

      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>
            <Text style={{

            }}>Espere un momento por favor . . .</Text>
        </View>)
    }
   

    if(sendSuccess){
      return(
        


                <ImageBackground source={require('../src/fondo1.jpg')}
                                                style={{  justifyContent : 'center',
                                                alignItems : 'center',
                                                flex : 1,
                                                backgroundColor: "white"}}>


            <View style={{alignItems: "center",position:'absolute',top:'5%'}}>
                <Image style={{width: 100, height: 100, resizeMode: "contain"}} source={require('../src/logo.png')}/>
                <Text style={{fontWeight : "bold", color: "#8F0D0F", fontSize: 20, fontFamily:"Lobster-Regular"}}>¡Salve María!</Text>
                <Text style={{fontWeight : '400', color: "black", fontSize: 20}}>{formInfo.name}</Text>
            </View>


            <View style={{alignItems: "center", width:'100%', height: 380, marginLeft:'3%', position : 'absolute', bottom : '-10%'}}>
              <Video
                source={require("../src/welcome.mp4")}
                style={styles.backgroundVideo}
                resizeMode={"contain"}
                rate={1.0}
                onEnd = {()=> goToScreen("Home")}
              />
            </View>

            <TouchableOpacity style={styles.loginBtn2} onPress={()=>goToScreen("Home")}   >
              <Text style={styles.loginText1}>Saltar presentación</Text>
            </TouchableOpacity>
            </ImageBackground>
      )
    }

    return(

        <View style={styles.container}>
      
            <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
            <ImageBackground source={require('../src/images/arriba.jpg')}
                      style={{flex: 1,
                          justifyContent : "flex-end", 
                          resizeMode: "cover",
                          width : "100%",
                          height : 150,
                          alignItems:'center'                      
                      }}
                      >

            <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://i2.wp.com/caballerosdelavirgen.org/wp-content/uploads/2019/02/logo2.png?w=320&ssl=1',
                  }}/>


            <ScrollView style={{width: "80%", marginBottom: 0, marginTop:40}}>
             <View >
                <View style={styles.inputView} >

                  <TextInput  
                      style={styles.inputText}
                      placeholder="Nombre" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'name')}
                  />

              </View>

             {
               /*
                 <View style={styles.inputView} >
                  <TextInput  
                      style={styles.inputText}
                      placeholder="Teléfono" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'telefono')}
                      keyboardType={'numeric'}
                    />
              </View> 
              */
             }


              <View style={styles.inputView} >

                  <TextInput  
                      style={styles.inputText}
                      placeholder="Correo eléctronico" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'email')}
                      editable={editable}
                      keyboardType={'email-address'}
                    />

              </View>


              {
                /**
                 * 
                 * <View>
                  <DatePicker

                      style={{width : "100%", marginBottom: 20}}
                      mode="date"
                      date={formInfo.fecha_nacimiento}
                      placeholder="Fecha de Nacimiento"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirmar"
                      cancelBtnText="Cancelar"
                      customStyles={{
                      dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                      },
                      dateInput: {
                          marginLeft: 36,
                          width : "100%",
                          backgroundColor:"#fff",
                          borderColor: "#5C101A",
                          borderWidth: 1,
                          borderRadius:15,
                          height:50,
                      }
                  
                      }}

                      onDateChange={text => onChangeText(text, 'fecha_nacimiento')}
                  />
              </View>
                 */
              }





              <View style={styles.inputView} >
                  <TextInput  
                      secureTextEntry
                      style={styles.inputText}
                      placeholder="Contraseña" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'password')}
                    />
              </View>


              <View style={styles.inputView} >
                  <TextInput  
                      secureTextEntry
                      style={styles.inputText}
                      placeholder="Repite la contraseña" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'repeat_password')}
                    />
              </View>



              <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}   >
                <Text style={styles.loginText}>REGISTRARME</Text>
              </TouchableOpacity>

             
        </View>
            </ScrollView>
               </ImageBackground>
        </View>




    );
}

export default Index;
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  select: {
    height: 50, width: 250,
    color: "#777",
    borderBottomColor: "#0093d9",
    backgroundColor:"red",
    marginBottom:10,
  },

  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"100%",
    backgroundColor:"#fff",
    borderColor: "#5C101A",
    borderWidth: 1,
    borderRadius:15,
  
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#777"
  },
  forgot:{
    color:"#777",
    fontSize:11
  },
  loginBtn:{
    width:"100%",
    backgroundColor:"#5C101A",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:0,
    borderRadius:15,
    
  },
  loginBtn2:{
    padding:10 ,
    width: "100%",
    backgroundColor:"#5C101A",
    height:50,
    position: "absolute",
    alignItems:"center",
    justifyContent:"center",
    bottom: 0,

  },
  loginText:{
    color:"white"
  },
  loginText1:{
    color:"white",
    fontFamily:"Lobster-Regular",
    fontSize:16
  },

  register:{
    marginTop: 0,
    color:"#777",
    width:"100%",
    marginBottom: 100,
    justifyContent: "center",
    textAlign: "center",
    fontSize:15,

  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginTop:30
  },

  backgroundVideo: {
    height: (height - 400),
    width: "90%",
    position: "absolute",
    top: 0,
    alignItems: "stretch",
    bottom: 0,
    alignSelf: "center"
  }
});