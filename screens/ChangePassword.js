import React, {useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView,ImageBackground, ToastAndroid} from 'react-native';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import {Api, serverPublic, base_url} from '../Env'    
import axios from 'axios'


function Index(props){

  
    const { navigation } = props
    const userDetails     = useContext(UserContext)
    function goToScreen(screen)
    {   
        navigation.navigate(screen, {randomCode : Math.random()})
    }

    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
        //randomCode = Math.random()
    }else{
        randomCode = Math.random()
    }


    const [formInfo , setFormInfo]       = React.useState({
        current_password  : '',
        new_password      : '',
        user_id : userDetails.user_id
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
        console.log(data)
        if( data.current_password === '' || data.new_password === ''){
  
          ToastAndroid.showWithGravity(
              "Debes completar todos los campos",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
             
          return false;
        }
  
        console.log('Enviando formulario')
        console.log(base_url(Api,`UpdatePassword`))
  
        axios.post( base_url(Api,`UpdatePassword`), data ).then(function (res) {

            ToastAndroid.showWithGravity(
                "La contraseña se cambio correctamente",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
            goToScreen("Dashboard")
        })
        .catch(function (error) {
            console.log('Error al enviar formulario')
            console.log(error.response.data)
            ToastAndroid.showWithGravity(
                error.response.data,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
        })
        .then(function () {
  
  
        });
       
      }







      return(

        <View style={styles.container} >
             <StatusBar backgroundColor="transparent" translucent/>
                     <ImageBackground source={require('../src/guiada.png')}
                                              style={{ width : "100%",height : 180}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
              
            <View style={{ flex: 1,  paddingTop: 0,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 0}}>Mi Perfil</Text>
            </View>
          </ImageBackground>
         


            <ScrollView style={styles.scrollView}>

                            
                    <View >
                        <View style={styles.card}>
                            <View style={styles.card_content_title}>
                                <Text style={styles.card_subtitle}>Contraseña actual</Text>
                                <View style={styles.inputView} >
                                    <TextInput  
                                    style={styles.inputText}
                                    onChangeText={text => onChangeText(text, 'current_password')} />
                                </View>
                            </View>
                        </View>


                        <View style={styles.card}>
                            <View style={styles.card_content_title}>
                                <Text style={styles.card_subtitle}>Contraseña nueva</Text>
                                <View style={styles.inputView} >
                                    <TextInput  
                                    style={styles.inputText}
                                    onChangeText={text => onChangeText(text, 'new_password')} />
                                </View>
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
                    <Text style={styles.loginText}>Enviar</Text>
                    </TouchableOpacity>



            </ScrollView>
            
<Menu props = {props} />
        </View>


    )


    
}

export default Index;



const styles = StyleSheet.create({

    header: {
        padding        : 30,
        backgroundColor: 'white',
        paddingBottom: 20,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        width: "100%"
    },

    menu: {
        padding        : 10,
        width: "100%",
        backgroundColor: 'white',
        flexDirection  : "row",
        justifyContent : "space-evenly",
        position: "absolute",
        bottom: 0,
        borderTopColor: "#ddd",
        borderTopWidth: 1
    },

    itemMenu : {
        alignItems: "center"
    },
    

    texMenu : {
        color : "#777"
    },

    texMenuActive : {
        color : "#005b3b"
    },



    ItemsHeaderFlex: {
        flexDirection  : "row",
        justifyContent : "space-between",
       
    },

    container: {
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
    },

    icon: {
      width: 80,
      height: 80,
      marginTop: -20
    },
    profile: {
        width: 50,
        height: 50,
        marginTop: -10
    },

    tittleHeader:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20
    },

    SubtittleHeader:{
        color: '#777'
    },

    SubtittlePrice : {
        color: '#005b3b',
        fontSize: 20,
        marginTop: 10
    },

    Price : {
        fontWeight : "bold"
    },

    scrollView: {
        marginTop : 1,
   
        width : "90%"
      },
      
    card:{
        color: '#777',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
        marginBottom: -20,
        width: "100%",
        flexDirection  : "row",

        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

    },

    card_image:{
        color: "black",
        marginRight: 10
    },

    card_title : {
        fontWeight: "bold",
        marginTop: 15
    },

    card_title_center : {
        fontWeight: "bold",
        marginTop: 15,
        textAlign: "center"
    },
    card_subtitle : {
        color: "#777",
        marginLeft : 10,
        width : "100%",
        fontWeight: "400",
        fontSize:15,
    },


    card_content_title : {
        width : "100%",
        justifyContent : "space-evenly"
    },


    inputView:{
        width:"100%",
        borderBottomColor: "#5C101A",
        borderBottomWidth: 1,
        
        height:50,
        justifyContent:"center",
        padding:20,
        paddingStart: 0,
        marginBottom : 20
      },
      inputText:{
        height:50,
        color:"#777"
      },
      icon_money : {
          color : "#005b3b",
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 20,
          marginEnd: 20
      },


      icon_calendar : {
          marginTop: 25,
          marginRight: 10
      },

      amount : {
          fontSize: 20,
          marginTop: 10,
          color : "#005b3b"
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
      loginText:{
        color:"white"
      },


      btnQuote:{
        width:"100%",
        backgroundColor:"#005b3b",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
      },

      form : {
          width : "100%"
      },
      card_image_content : {
        marginRight: 10,
        borderRightWidth: 1,
        borderRightColor : "#eee",
        paddingRight : 10
      }
  
  });

