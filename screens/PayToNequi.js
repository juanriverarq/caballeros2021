import React, {useEffect, useState, useContext, useCallback}  from 'react';
import { StyleSheet, Alert,Text, Linking, CheckBox, Picker, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ScrollView, ImageBackground} from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';


import {token_wompi, ApiWompi} from '../Env' 
import axios from 'axios'



function Index(props){

    const [requesting , setRequesting ]  = useState(false)
    const [Error , setError ]            = useState(false)

    const [NumberPhone, setNumberPhone]              = useState("")
  
    const [isSelected, setSelection] = useState(false);
    const [Terminos, setTerminos]  = useState("#")

    const [acceptance_token, setacceptance_token]  = useState(false)

    const userDetails  = useContext(UserContext)
    const { setUserDetails } = useContext(UserContext) 



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





    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const link = await Linking.canOpenURL(url);
      
          if (link) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Text style={styles.bold}  onPress={handlePress}> {children} </Text>;
      };



    const { navigation } = props
    
    function goToScreen(screen)
    {   
        navigation.navigate(screen)
    }



    useEffect(()=>{


      
        axios.get(`${ApiWompi}merchants/${token_wompi}`).then(function (response) {

            const acceptance_token_generate = response.data.data.presigned_acceptance.acceptance_token

            setacceptance_token(acceptance_token_generate)

            setTerminos(response.data.data.presigned_acceptance.permalink)
        })
          .catch(function (error) {
              console.log('Error al enviar formulario')
              console.log(error);
              console.log(error.response);
              
              
          })
          .then(function () {
    
          });

    }, [randomCode])




    function GotoPay() { 

        if(!isSelected){

            ToastAndroid.showWithGravity(
                "Debes aceptar los terminos y condiciones",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

              return false;
               
        }

        const payment_method = {
            "type": props.route.params.payment_method.type,
            "phone_number": NumberPhone
        }



        if(NumberPhone == ""){

            ToastAndroid.showWithGravity(
                "Debes ingresar un número de teléfono",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

              return false;
               
        }




        console.log(acceptance_token, "TOKEN GENERADO")

        setError(false)

    
        navigation.navigate("PaymentSummary", {
            randomCode : Math.random(),
            amount_in_cents  : props.route.params.amount_in_cents,
            payment_concept  : props.route.params.payment_concept,
            payment_method   : payment_method,
            acceptance_token : acceptance_token,
            id_fee           : props.route.params.id_fee,
            period           : props.route.params.period
        })

       



        goToScreen("PaymentSummary")


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




     

      



    function Instructions(){
       
        if(!ShowInstructions)
            setShowInstructions(true)
        else
            setShowInstructions(false)
    }
  

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(

        <View style={styles.container}>
             <StatusBar backgroundColor="transparent" translucent/>
           
            
          <ImageBackground source={require('../src/donate.png')}
                                              style={{ width : "100%",height : 130}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
             <TouchableOpacity onPress={()=>goToScreen('MethodPay')} style={{marginTop: 30, marginLeft: 20}}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>  
            <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 0}}>Método de pago</Text>
            </View>
          </ImageBackground>

            <ScrollView style={styles.scrollView}>
                            
                <View>
                    
                    <View style={styles.card}>

                        {
                            Error &&
                            <Text style={styles.TextError} >Los datos ingresados son incorrectos</Text>
                        }
                       
                        <View style={styles.inputView} >
                            <Text style={{marginBottom:10, fontWeight:'500', textAlign:'center', color:"#5C101A"}}>Ingresa tu número de celular NEQUI:</Text>
                            <TextInput  
                                style={styles.inputText}
                                placeholder="EJ: 3152078965" 
                                placeholderTextColor="#777"
                                onChangeText={text => setNumberPhone(text)}
                                keyboardType={'numeric'}
                                value={NumberPhone}
                                
                            />
                        </View>


                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Acepto haber leído los <OpenURLButton url={Terminos}>Términos y Condiciones y la Política de Privacidad</OpenURLButton> para hacer esta compra.</Text>
                        </View>

                        


                        


                    </View>


                    <TouchableOpacity style={styles.loginBtn} onPress={()=>GotoPay()}   >
                        <Text style={styles.loginText}>Pagar</Text>
                    </TouchableOpacity>


                </View>



            </ScrollView>



            
        </View>
    )


    
}

export default Index;



const styles = StyleSheet.create({

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

        borderLeftColor: "#5C101A",
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
        borderBottomColor: "#5C101A",
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
        backgroundColor:"#5C101A",
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
        backgroundColor:"#5C101A",
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
        borderBottomColor : "#5C101A",
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
        borderBottomColor : "#5C101A",
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

