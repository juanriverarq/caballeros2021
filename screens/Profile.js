import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import {Api, base_url} from '../Env'    
import axios from 'axios'
import { useState } from 'react';
function Index(props){

  
    const { navigation } = props
    const userDetails     = useContext(UserContext)
    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const [Days, setDays] = useState(0);

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



    useEffect(()=>{

        axios.get( base_url(Api,`GetDaysUser/${userDetails.user_id}`)).then(function (response) {
            console.log(response.data)
            setDays(response.data)
        })
        .catch(function (error) { console.log(error.message)})
        .then(function () {console.log("response.data")});

    },[randomCode])





    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@Passport');
            console.log('logout')
            setUserDetails({})
            goToScreen("Home")
        } catch (error) {
            console.log(error.message);
        }
    }

      return(

        <View style={styles.container} >
             <StatusBar backgroundColor="transparent" translucent/>
                     <ImageBackground source={require('../src/guiada.png')}
                                              style={{ width : "100%",height : 180}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
              
            <View style={{ flex: 1,  paddingTop: 0,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 0,fontFamily:"Lobster-Regular"}}>Mi Perfil</Text>
            </View>
          </ImageBackground>
         




            <ScrollView style={styles.scrollView}>

                            
                    <View style={{marginBottom: 0}}>
                         

                        <TouchableOpacity onPress={()=>goToScreen('ChangePassword')}>
                            <View style={styles.card}>
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>Cambiar contraseña</Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                      
                       
                        <TouchableOpacity onPress={()=>logout()}>
                             
                                <View>
                                    <Text style={{textAlign:'center', marginTop:50, color:'red'}}>Cerrar sesión</Text>
                                </View>
                        </TouchableOpacity>

                    </View>

            </ScrollView>
             <View style={{marginBottom:70, width:'100%'}}>
                <Text style={{textAlign:'center', marginTop:40, fontWeight:'500',backgroundColor:'#0E1257',padding:5,  color:'white'}}>Te quedan <Text style={{textAlign:'center', marginTop:40, fontWeight:'800',padding:5, borderRadius:10, color:'red'}}>{Days}</Text> días de acceso</Text>
              </View>
<Menu props = {props} />
        </View>


    )


    
}

export default Index;



const styles = StyleSheet.create({
	scrollView: {
    width:'100%',marginBottom: 70,paddingTop:40
  },

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
        marginHorizontal: 90,
        marginBottom: 80,
        width : "90%",
        height : "100%"
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
        borderBottomColor: "#005b3b",
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
        backgroundColor:"#005b3b",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:100
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

