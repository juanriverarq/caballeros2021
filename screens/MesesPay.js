import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView,ImageBackground} from 'react-native';
import { Icon } from 'react-native-eva-icons';

function Index(props){

  
    const { navigation } = props


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




    async function GoToStepTwo(type_pay, period){
       
        let  screen = "MethodPay"

        await navigation.navigate(screen, {
            randomCode : Math.random(),
            amount_in_cents  : props.route.params.amount_in_cents,
            payment_concept  : props.route.params.payment_concept,
            period           : period,
        })

    }





    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(

        <View style={styles.container} >
             <StatusBar backgroundColor="transparent" translucent/>
           
            
          <ImageBackground source={require('../src/donate.png')}
                                              style={{ width : "100%",height : 130}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>



                {!props.route.params.inactive &&
                    <TouchableOpacity onPress={()=>goToScreen('Donate')} style={{marginTop: 30, marginLeft: 20}}> 
                    <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
                  </TouchableOpacity>        
                }
                                    

            <View style={{ flex: 1,  paddingTop: 30,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: 0}}>¿Por cuantos meses?</Text>
            </View>
          </ImageBackground>




            <ScrollView style={styles.scrollView}>
                            
                    <View style={{marginBottom: 200}}>
                        <TouchableOpacity onPress={()=>GoToStepTwo('MethodPay', 1)}>
                            <View style={styles.card}>
                            
                               
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>1 mes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>GoToStepTwo('MethodPay', 6)}>
                            <View style={styles.card}>
                            
                                
                            
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>6 meses</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>GoToStepTwo('MethodPay', 12)}>
                            <View style={styles.card}>
                            
                                
                            
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>1 año</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>

            </ScrollView>

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
        width : "60%",
        fontWeight: "bold",
        fontSize:16,
    },


    card_content_title : {
        width : "80%",
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

