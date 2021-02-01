import React, {useEffect, useState, useContext}  from 'react';
import { StyleSheet,Text, View, TouchableOpacity, StatusBar, Image, ToastAndroid, ScrollView} from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';


import {serverQa, base_url} from '../Env' 
import axios from 'axios'

import PhotoUpload from 'react-native-photo-upload'


function Index(props){

    const [requesting , setRequesting ]  = useState(false)
    const [Error , setError ]            = useState(false)
 
    const [PaySuccess, setPaySuccess]  = useState(false)
   
    const [acceptance_token, setacceptance_token]  = useState(false)

    const userDetails  = useContext(UserContext)
    const { setUserDetails } = useContext(UserContext) 
    const [ fileToUpload , setFileToUpload ] = React.useState(false)



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



    const { navigation } = props
    
    function goToScreen(screen)
    {   
        navigation.navigate(screen)
    }



    useEffect(()=>{
        setPaySuccess(false)

        console.log(props.route.params.payment_concept)
    }, [randomCode])




    function GotoPay() { 

        if(!fileToUpload){

            ToastAndroid.showWithGravity(
                "Debe seleccionar una Imagen",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );

              return false;
               
        }

        if(props.route.params.payment_concept == "Estudio de Credito" || props.route.params.payment_concept == "Estudio de Credito + Valoracion"){
            saveDataStudyCredit()
          }else{
            saveDataFee()
          }

     }






     function saveDataStudyCredit(){

        const data = {
          "id_client"       : userDetails.id_client,
          "id_transactions" : "null",
          "amount"          : props.route.params.amount_in_cents,
          "payment_method"  : props.route.params.payment_method.type,
          "photo_recived"   : fileToUpload
        }

            setRequesting(true)
        axios.post(base_url(serverQa,`client/pay/to/study/credit`), data).then(function (response) {
            setRequesting(false)
            setPaySuccess(true)
        }).catch(function (error) {
            setRequesting(false)
            console.log('Error al enviar formulario2')
          //console.log(error);
            console.log(error.response, "EL ERROR2");
              
          }).then(function () {
          
        });
    }



    function saveDataFee(){

        console.log("HELLO")
        const data = {
            "id_client"       : userDetails.id_client,
            "id_transactions" : "null",
            "amount"          : props.route.params.amount_in_cents,
            "payment_method"  : props.route.params.payment_method.type,
            "id_fee"          : props.route.params.id_fee,
            "photo_recived"   : fileToUpload
        }

      setRequesting(true)
      axios.post(base_url(serverQa,`client/pay/to/fee`), data).then(function (response) {
        setRequesting(false)
        setPaySuccess(true)

      }).catch(function (error) {
          setRequesting(false)
          setPaySuccess(true)
          console.log('Error al enviar formulario2')
        //console.log(error);
          console.log(error.response, "EL ERROR2");
            
        }).then(function () {
        
      });
  }







      React.useEffect(() => {
       // console.log(fileToUpload)

      }, [fileToUpload]);

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





      if(PaySuccess){

        return(
          <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flex : 1,
              backgroundColor: "white"
          }}>
  
  
              <View><Icon name='checkmark-circle-2-outline' width={200} height={200} fill='#1c712e' /></View>
  
              <Text style={styles.title_succesfull } >Transacción APROBADA</Text>
  
              <Text style={styles.title } >Información de la transacción</Text>
              <Text style={styles.item_succesfull }>Email <Text style={styles.item_succesfull_bold}>{userDetails.email}</Text> </Text>
  
              <Text style={styles.title } >Información del pagador</Text>
              <Text style={styles.item_succesfull }>Nombre <Text style={styles.item_succesfull_bold}>{userDetails.nombres}</Text></Text>
              
              
              <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("Dashboard")}   >
                    <Text style={styles.loginText}>Finalizar</Text>
              </TouchableOpacity>
             
  
              
          </View>)
  
      }



      


    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(

        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
            <View style={styles.header}>

                <View  style={styles.ItemsHeaderFlex}>
                    <View><View><Icon name='bell-outline' width={35} height={35} fill='#0093d9' /></View></View>
                    <View>
                        <Image
                            style={styles.profile}
                            source={{
                            uri: 'https://image.flaticon.com/icons/png/512/306/306473.png',
                            }}/>
                    </View>
                </View>


                <View><Text style={styles.tittleHeader}>Ingresa tus datos</Text></View>
                <View><Text style={styles.SubtittleHeader}>Paga tu {props.route.params.payment_concept}.</Text></View>
                <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(props.route.params.amount_in_cents)}</Text></Text></View>
            </View>
            

            <ScrollView style={styles.scrollView}>
                            
                <View>
                    
                    <View style={styles.card}>

                        {
                            Error &&
                            <Text style={styles.TextError} >Los datos ingresados son incorrectos</Text>
                        }
                       
                        <View style={styles.inputView} >
                            <Text>Toca y sube tu comprobante</Text>
                        </View>


                        <PhotoUpload onPhotoSelect={avatar => {
                            if (avatar) {
                                setFileToUpload(avatar) }}
                            }>
                            <Image style={{
                                paddingVertical: 30,
                                width: 200,
                                height: 150,
                            }}

                            title = "jaja"
                            source={require('../src/images/fileuploadicon.png')} />
                            </PhotoUpload>


                    </View>


                    <TouchableOpacity style={styles.loginBtn} onPress={()=>GotoPay()}   >
                        <Text style={styles.loginText}>Enviar</Text>
                    </TouchableOpacity>


                </View>



            </ScrollView>



             <View style={styles.menu}>

                <View>

                    <TouchableOpacity onPress={ ()=> goToScreen("Dashboard") } >
                        <View style={styles.itemMenu}>
                            <View><Icon name='navigation-2-outline' width={25} height={25} fill='#999' /></View>
                            <Text  style={styles.texMenu}>Crédito</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>

                
                <View >
                     <View style={styles.itemMenu}>
                        <View><Icon name='credit-card-outline' width={25} height={25} fill='#999' /></View>
                        <Text  style={styles.texMenu}>Pagar</Text>
                    </View>
                </View>

                <View >
                     <View style={styles.itemMenuActive}>
                        <TouchableOpacity onPress={()=>goToScreen('FaQ')}>
                            <View><Icon name='alert-circle-outline' width={25} height={25} fill='#999' /></View>
                            <Text  style={styles.texMenu}>FaQ</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>



                <View >
                     <TouchableOpacity style={styles.itemMenu} onPress={ ()=> logout() }>
                        <View><Icon name='log-out-outline' width={25} height={25} fill='#999' /></View>
                        <Text  style={styles.texMenu}>Salir</Text>
                    </TouchableOpacity>
                </View>
               
            </View>

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
        color : "#0093d9"
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
        marginTop: 10
    },

    SubtittleHeader:{
        color: '#777'
    },

    SubtittlePrice : {
        color: '#0093d9',
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
        width: "100%",

        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

        borderLeftColor: "#0093d9",
        borderLeftWidth: 5
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
        width : "60%",
    },


    card_content_title : {
        width : "80%",
        justifyContent : "space-evenly"
    },


    inputView:{
        width:"100%",
        borderBottomColor: "#0093d9",
        borderBottomWidth: 1,
        
      
        justifyContent:"center",

        paddingStart: 0,
        marginBottom : 20
      },
      inputText:{
        height:50,
        color:"#777",
        backgroundColor : "#eee",
        paddingLeft: 10
      },
      icon_money : {
          color : "#0093d9",
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
          color : "#0093d9"
      },

      loginBtn:{
        width:"100%",
        backgroundColor:"#0093d9",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:100
      },

      btnCLose : {
        width:"100%",
        color:"#3f4a56",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
      },

      CloseText : {
        color:"#3f4a56",
        fontSize : 17
      },

      loginText:{
        color:"white"
      },


      btnQuote:{
        width:"100%",
        backgroundColor:"#0093d9",
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
      },

      selects_row : {
        flexDirection  : "row",
        
      } ,


      select_month_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#0093d9",
        backgroundColor: "#eee",
        marginRight : 20
      },
      select_month: {
        height: 40,
        color: "#777",
        
      },

      

      select_year_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#0093d9",
        backgroundColor: "#eee"
      },
      select_year: {
        width : 100,
        height: 40,
        color: "#777",
      },

      Instrucciones : {
        padding: 10,
        marginTop: 15,  
        backgroundColor: "#f2f9ff",
        borderRadius: 5,
        borderColor: "#bfe1ff",
        borderWidth: 1,
          
      },
      TextInstrucciones : {
          marginBottom: 10,
          color: "#3f4a56",
          lineHeight: 18
      },
      bold : {
          fontWeight : "bold"
      },
      contentImageCard : {
          flexDirection : "row",
          justifyContent : "space-between"
      },

      ImageCard : {
        resizeMode: "contain",
        width : 120
      },



      contentAcceptCard  :{
        flexDirection : "row",
        justifyContent : "space-between",
        backgroundColor : "#f7f9fa",
        borderColor : "#dfe6ee",
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        marginBottom : 20,
        alignItems: "center",
      },

      contentAcceptCardText : {
        color : "#777",
        fontSize : 12
      },

      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop : 20
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
        color : "#777",
        lineHeight : 20 
      },


      TextError : {
          color : "red",
          marginBottom : 10
      }



  
  });

