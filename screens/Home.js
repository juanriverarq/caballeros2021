import React, {useState, useEffect, useContext}  from 'react';
import { StyleSheet, Text, Picker, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid} from 'react-native';

import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

import RequestPermission from '../permission';
import Login from './Login'
import Dashboard from './Dashboard'
import ScreenInactive from './ScreemInactive'

import {Api, serverPublic, base_url} from '../Env'    
import axios from 'axios'


function Index(props){


    const { setUserDetails } = useContext(UserContext)
    const userDetails  = useContext(UserContext)
    const [userStatus, setUserStatus]  = useState(false)

    const _retrieveData = async () => {

       
        try {
            const value = JSON.parse(await AsyncStorage.getItem('@Passport'));

            if (value) {
                setUserDetails(value)
                return value
          }else{
            }  
        } catch (error) {
          // Error retrieving data
        }
      };



      useEffect(()=>{
        if (Platform.OS === 'android') {
            RequestPermission().then(_ => {
              console.log('requested!');
            });
        }
        _retrieveData()
    },[])




    function setDone(){
        setIsIntro(false)
    }
    
    function onAuthSuccess(){
        _retrieveData()
    }


    async function VerifyUser(id_user){
        console.log('Enviando formulario')
        console.log(base_url(Api,`get/status/user/${id_user}`))
        await axios.get( base_url(Api,`get/status/user/${id_user}`)).then(function (response) {
            setUserStatus(response.data)
        })
        .catch(function (error) { console.log(error.message)})
        .then(function () {console.log("response.data")});
    }


    if( !userDetails.email){
        return <Login {...props}/>
    }
        


    if(userDetails.email){
        VerifyUser(userDetails.user_id)
        if(userStatus != false && userStatus == "Inactivo"){
            return <ScreenInactive {...props}/>
        }else{
            return <Dashboard {...props}/>
        }
    }
        




    return <></>
}



export default Index;


const styles = StyleSheet.create({

    header: {
        padding        : 30,
        backgroundColor: 'white',
        paddingBottom: 50,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        position: "absolute",
        top: 0
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
        color : "#0093d9"
    },


    ItemsHeaderFlex: {
        flexDirection  : "row",
        justifyContent : "space-between",
       
    },

    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%"
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
        marginTop: 30
    },

    SubtittleHeader:{
        color: '#777'
    },


    card:{
        color: '#777',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
        width: "85%",
        flexDirection  : "row",

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

        borderBottomColor: "#0093d9",
        borderBottomWidth: 5
    },

    card_image_content:{
        color: "black",
        marginRight: 10
    },

    card_title : {
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 15
    },
    card_subtitle : {
        color: "#777",
    },

    card_image : {
        width: 80,
        height: 80
    },

    cardTitleLong : {
        color: "#777",
        fontWeight: "bold",
        fontSize: 20
    },
    amountRequest: {
        color:  "#0093d9",
        fontWeight: "bold",
        fontSize: 39,
        marginTop: 10,
        marginBottom: 10
    },
    plazos: {
        fontWeight: "bold"
    },

    contentCuotasStatus : {
        flexDirection  : "row",
        justifyContent : "space-between",
        marginTop: 10
    },
    cuotas: {
        color:  "#0093d9",
        fontWeight: "bold",
    },
    statusPendiente : {
        color: "red",
        position: "relative",
        fontWeight: "bold"
    },
    statusAprovado : {
        color: "green",
        position: "relative",
        fontWeight: "bold"
    }
  
  });

