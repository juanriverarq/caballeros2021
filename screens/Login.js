import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ImageBackground, Alert} from 'react-native';

import {Api, base_url} from '../Env'    
import axios from 'axios'


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen)
  }


    
    const [notificationToken , setNotificationToken] = React.useState('')
    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const [editable, setEditable] = React.useState(false)



    const getToken = async () => {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    };


    const checkPermission = async () => {
      firebase
      .messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch(error => {
        console.warn(`${error} permission rejected`);
      });
    };






    
    React.useEffect(()=>{

      checkPermission()
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    React.useEffect(()=>{
      async function getToken(){
          const fcmToken = await messaging().getToken();
        
          if (fcmToken)
              {setNotificationToken(fcmToken)} 
          else
          {console.log('user doesnt have a device token yet')}

          console.log(fcmToken, "TOKEN12")
        }
        getToken()
    },[])





    const [formInfo , setFormInfo]       = React.useState({
        email     : '',
        password  : ''
    })



    React.useEffect(()=>{

      console.log(UserDetails, "DATA")
      async function getToken(){
          const fcmToken = await messaging().getToken();
          if (fcmToken)
              {setNotificationToken(fcmToken)} 
          else
          {console.log('user doesnt have a device token yet')}

        //  console.log(fcmToken, "TOKENSSSSSS")
        }
        getToken()
    },[])



    const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
      
      }
      catch (error) {
        // Error saving data
      }
    }







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

      if( data.email === '' || data.password === ''){
        Alert.alert("Introduce tus datos de acceso")
        
           
        return false;
      }


      console.log('Enviando formulario')
      console.log(base_url(Api,`authApp`))
     // console.log(data)


      axios.post( base_url(Api,`authApp`), data ).then(function (res) {

        //console.log(res.data)
        _storeData(res.data)

        props.navigation.navigate("Home")
        
    
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
          Alert.alert("Correo o clave invalida")


      })
      .then(function () {


      });
     
    }




  return (
    <View style={styles.container}>
      
      <StatusBar backgroundColor="transparent" translucent/>

      <ImageBackground source={require('../src/images/arriba.jpg')}
                      style={{flex: 1,
                          resizeMode: "cover",
                          width : "100%",
                          height : "42%"
                      }}
                      >

            <View style={{width : "100%",alignItems: 'center', position: "relative", top : "25%"}}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://i2.wp.com/caballerosdelavirgen.org/wp-content/uploads/2019/02/logo2.png?w=320&ssl=1',
                  }}/>
            </View>
            <View style={{width : "100%",alignItems: 'center', position: "relative", top : "30%"}}>
                <View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Correo eléctronico" 
                    placeholderTextColor="#777"
                    keyboardType={'email-address'}
                    editable={editable}

                    onChangeText={text => onChangeText(text, 'email')}/>
                </View>
                <View style={styles.inputView} >
                  <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Contraseña" 
                    placeholderTextColor="#777"
                    onChangeText={text => onChangeText(text, 'password')}/>
                </View>
                <TouchableOpacity onPress={()=>goToScreen('RecoveryAccount') }>
                  <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
                  <Text style={styles.loginText}>INGRESAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>goToScreen('Register') }>
                  <Text style={styles.register}>Registrarme (recibe 30 días gratis)</Text>
                </TouchableOpacity>
            </View>



      </ImageBackground>
    </View>
  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
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
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#5C101A",
    borderRadius:15,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:40
  },
  loginText:{
    color:"white"
  },

  register:{
    fontSize:15,
    marginTop: -0,
    color:"#5C101A"
  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom:40
  }


});