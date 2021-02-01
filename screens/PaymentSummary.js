import React, {useEffect, useState, useContext}  from 'react';
import { StyleSheet,Text,  View, TouchableOpacity, StatusBar, ImageBackground, ActivityIndicator, ScrollView, Dimensions} from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';


import {Api, base_url, token_wompi, ApiWompi} from '../Env' 
import axios from 'axios'
import Video from "react-native-video";


function Index(props){


    const userDetails  = useContext(UserContext)

    const [requesting , setRequesting ]  = useState(false)
    const [requestingNequi , setRequestingNequi ]  = useState(false)
    const [PaySuccess, setPaySuccess]  = useState(false)
    const [PayDeclined, setPayDeclined]  = useState(false)
    const [MessageError, setMessageError]  = useState(false)

    const [IdTransaction, setIdTransaction]  = useState()
 
    const [RefferedPay, setRefferedPay] = useState();
    const [Period, setPeriod] = useState();
    const [Discount, setDiscount] = useState(false);
    const [Total, setTotal] = useState(0);

      

    const { navigation } = props
    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
        //randomCode = Math.random()
    }else{
        randomCode = Math.random()
    }


    function goToScreen(screen)
    {   
      setPayDeclined(false)
       navigation.navigate(screen, {randomCode : Math.random()})
    }




    useEffect(()=>{
      Init()
    }, [randomCode])

    async function Init(){
      setRequesting(false)
      setRequestingNequi(false)
      setPaySuccess(false)
      setPayDeclined(false)
      setMessageError(false)
      setRefferedPay(`${props.route.params.payment_concept}-${ Math.floor(Math.random() * 999999999) }`)

      await SettingDiscount()
      
    }


    async function SettingDiscount(){
      if(props.route.params.period == 1){
        setPeriod("1 Mes")
        await setDiscount(0)
      }
      if(props.route.params.period == 6){
        setPeriod("6 Meses")
        await setDiscount(10)
      }
        
      if(props.route.params.period == 12){
        setPeriod("1 Año")
        await setDiscount(20)
      }
    }


    useEffect(()=>{
      CalcDiscuount()
    }, [Discount])


    

    async function CalcDiscuount(){
      let amount = props.route.params.amount_in_cents * props.route.params.period

      if(Discount > 0){
        console.log("aqui no")
        const discuount = ((amount / 100) * Discount)
        await setTotal(amount - discuount)
      }else{
        console.log("entro aqui")
        await setTotal(amount)
      }
      
    }


    function GotoPay() { 
        const data = {
          "acceptance_token" : props.route.params.acceptance_token,
          "amount_in_cents"  : Total * 100,
          "currency"         : "COP",
          "customer_email"   : "cardenascarlos18@gmail.com",
          "payment_method"   : props.route.params.payment_method,
          "reference"        : RefferedPay
        }

        const config = {
            headers: {
              "Authorization": `Bearer ${token_wompi}`,
            }
        }

        if(props.route.params.payment_method.type == "NEQUI"){
          setRequestingNequi(true)
        }else{
          setRequesting(true)
        }
        

        axios.post(`${ApiWompi}/transactions`, data, config).then(function (response) {
          console.log(response.data.data, "PAGO EXISTOSO")
          console.log(response.data.data.id, "ID DE TRANSACCION")
          setIdTransaction(response.data.data.id)

        }).catch(function (error) {
            setRequestingNequi(false)
            setRequesting(false)
            console.log('Error al enviar formulario2')
          //console.log(error);
            console.log(error.response, "EL ERROR2");
            setMessageError("Error en al transaccion")
              
          }).then(function () {
          
        });

        // console.log(data, "DATA PAY")
    }



    function verifyTransaction(){

      console.log("EJECUTANDO VERIFICACION")
      console.log(`${ApiWompi}transactions/${IdTransaction}`)
      axios.get(`${ApiWompi}transactions/${IdTransaction}`).then(function (response) {


        console.log(response.data.data.status, "STATUS")


        if(response.data.data.status == "PENDING"){
          verifyTransaction()
        }else{
            if(response.data.data.status == "APPROVED"){
              console.log(response.data.data.status, "STATUS DE TRANSAACCION")


              saveDataFee()
                
              setPaySuccess(true)
              setRequesting(false)
              setRequestingNequi(false)
            }else{
              setPayDeclined(true)
              setRequesting(false)
              setRequestingNequi(false)
              setMessageError(response.data.data.status_message)
            }
        }
        
        

      }).catch(function (error) {
            console.log('Error al enviar formulariossssssssssssss')
            console.log(error);
            console.log(error.response, "EL ERRORsssssss");
            
        }).then(function () {
  
      });

    }


    function saveDataFee(){

      const data = {
        "id_user"         : userDetails.user_id,
        "id_transaccion"  : IdTransaction,
        "amount"          : Total,
        "method_pay"      : props.route.params.payment_method.type,
        "period"          : props.route.params.period
      }

      console.log(data, "SAVE FEE")
      console.log(base_url(Api,`save/pay`))
      axios.post(base_url(Api,`save/pay`), data).then(function (response) {


      }).catch(function (error) {
          setRequesting(false)
          console.log('Error al enviar formulario2')
        //console.log(error);
          console.log(error.response, "EL ERROR2");
            
        }).then(function () {
        
      });
  }

      


    useEffect(()=>{
      verifyTransaction()
    }, [IdTransaction])


    if(requestingNequi){

      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>

            <ActivityIndicator size="large" color="#0093d9" />
            <Text style={{
              width : "80%",
              lineHeight : 25,
              fontSize: 19,
              textAlign: "center"
            }}>Por favor confirma la transacción en tu celular cuando te llege la <Text style={{fontWeight : "bold"}}>Notificacion</Text>. Si no te ha llegado, verifica que tengas Nequi instalado en tu celular y que ya estés registrado</Text>
        </View>)
    }

    if(requesting){
      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>

            <ActivityIndicator size="large" color="#0093d9" />
            <Text style={{

            }}>Estamos procesando tu pago . . .</Text>
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


          <View style={{width:'100%', height: 500, borderBottomEndRadius: 40, borderBottomStartRadius: 40,backgroundColor : "white"}}>
              <Video
                source={require("../src/pay_succes.mp4")}
                style={styles.backgroundVideo}
                resizeMode={"contain"}
                rate={1.0}
              />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("Dashboard")}   >
              <Text style={styles.loginText}>Continuar</Text>
            </TouchableOpacity>
        </View>)
    }



    if(PayDeclined){
      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1,
            backgroundColor: "white"
        }}>


            <View><Icon name='close-circle-outline' width={200} height={200} fill='#e34c4c' /></View>

            <Text style={styles.title_succesfull } >Transacción DECLINADA</Text>


            {MessageError &&
                <Text>{MessageError}</Text>
            }

            <Text style={styles.title } >Información de la transacción</Text>
            <Text style={styles.item_succesfull }>Transacción # <Text style={styles.item_succesfull_bold}>{IdTransaction}</Text></Text>
            <Text style={styles.item_succesfull }>Referencia <Text style={styles.item_succesfull_bold}>{RefferedPay}</Text></Text>
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
            <ImageBackground source={require('../src/donate.png')}
                                                style={{ width : "100%",height : 130}}
                                                imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>

              <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                  <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 0}}>Tajeta de crédito</Text>
              </View>
            </ImageBackground>
            

            <ScrollView style={styles.scrollView}>
                  
                <View style={styles.card}>
                      {
                        MessageError &&
                        <Text>{MessageError}</Text>
                      }
                    
                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Concepto</Text>   : {props.route.params.payment_concept}</Text>
                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Referencia :</Text> {RefferedPay}</Text>
                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Periodo :</Text> {Period}</Text>
                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Monto :</Text> {currencyFormat(props.route.params.amount_in_cents * props.route.params.period)}</Text>
                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Descuento :</Text> {Discount} %</Text>

                    <Text style={styles.card_item}><Text style={styles.card_item_bold}>Monto a pagar :</Text> {currencyFormat(Total)}</Text>

                    <TouchableOpacity style={styles.loginBtn} onPress={()=>GotoPay()}   >
                      <Text style={styles.loginText}>Pagar</Text>
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

const { height } = Dimensions.get("window");

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

    card_item : {
      padding : 7
    },  

    card_item_bold : {
      fontWeight : "bold"
    },

    card_content_title : {
        width : "80%",
        justifyContent : "space-evenly"
    },



      loginBtn:{
        width:"100%",
        backgroundColor:"#0093d9",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
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

      title_succesfull :{
        fontSize: 20,
        fontWeight : "bold",
        padding: 10
      },
      title : {
        fontWeight: "bold",
        color : "#0093d9",
        padding: 5
      },
      item_succesfull : {
        padding: 5
      },
      item_succesfull_bold : {
        fontWeight :  "bold"
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

