/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Picker,
  Button,
  ActionSheetIOS,
  Alert
} from 'react-native';

import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import Video from "react-native-video";

import UserContext from '../contexts/UserContext'


import {Api, base_url} from '../Env'    
import axios from 'axios'

import TimePicker from 'react-native-simple-time-picker';

import { ActionSheet } from 'react-native-cross-actionsheet'



function Index(props) {  


  const userDetails     = useContext(UserContext)
  const [Load, SetLoad] = useState(true);
  const [Data, SetData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  
  const [Categoria, setCategoria] = React.useState("Seleccione una Categoria");
  const [Oracion, setOracion] = React.useState("Seleccione");
  const [OracionTitle, setOracionTitle] = React.useState("Selec. Oracion");
  const [Oraciones, setOraciones] = React.useState(["Seleccione"]);
  const [IdEdit, setIdEdit] = React.useState(false);


  const [Hours, setHours] = React.useState({
    "hours" : 0,
    "minutes" : 0
  });


  const [HoursEdit, setHoursEdit] = React.useState({
    "hours" : 0,
    "minutes" : 0
  });

  const optionsCategory = ["Santo Rosario", "Letanias", "Oraciones Diversas", "Oraciones de la Confianza", "Coronilla de la Misericordia", "Oraciones por la Familia"]


  const onPressCategoryIos = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: optionsCategory,
      },
      buttonIndex => {
        setCategoria(optionsCategory[buttonIndex])
      }
    );


    const hours2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    const onPressHour = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: hours2,
      },
      buttonIndex => {
        setHours({"hours": hours2[buttonIndex]})
        setHoursEdit({"hours": hours2[buttonIndex]})

      }
    );



    const minutes2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
                    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", 
                    "31", "32", "33", "34", "35", "36", "37", "38", "39" ,"40",
                    "41", "42", "43", "44", "45", "46", "47", "48", "49" ,"50",
                    "51", "52", "53", "54", "55", "56", "57", "58", "59" ,"60",
                              
    ]
    const onPressMinute = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: minutes2,
      },
      buttonIndex => {
        setHours({"hours": Hours.hours, "minutes" : minutes2[buttonIndex]})
        setHoursEdit({"hours": HoursEdit.hours, "minutes" : minutes2[buttonIndex]})
      }
    );




    function onPressOracionesIos(){
      console.log("HOLA")

      let options2 = ["Seleccione"]

      if(Oraciones.length > 0){
        options2 = Oraciones.map((item, index) => {
          //options.push()
          return ({ text: item.titulo, onPress: () => {setOracion(item.id), setOracionTitle(item.titulo)}}) 
        })
      }
        
      ActionSheet.options({
        options: options2,
        cancel: { onPress: () => console.log('cancel') }
      })
    }


    

  const {navigation} = props
  async function goToScreen(screen)
  {   
    await setModalVisibleCheck(false)
    await navigation.navigate(screen, {randomCode : Math.random()})
  }


  let randomCode 
  if(props){
      randomCode = props.route.params.randomCode
  }else{
      randomCode = Math.random()
  }


  useEffect(()=>{
    GetOraciones()
  },[randomCode])





  useEffect(()=>{
    console.log('Enviando formulario')
    console.log(base_url(Api,`get/oraciones2/${Categoria}`))
     axios.get( base_url(Api,`get/oraciones2/${Categoria}`)).then(function (response) {
         // console.log(response.data)
        setOraciones(response.data)
      })
      .catch(function (error) { console.log(error.message)})
      .then(function () {console.log("response.data")});
  },[Categoria])


  async function GetOraciones(){
    SetLoad(true)
    console.log('Enviando formulario')
    console.log(base_url(Api,`get/oraciones/guiadas/${userDetails.user_id}`))
    axios.get( base_url(Api,`get/oraciones/guiadas/${userDetails.user_id}`)).then(function (response) {

        SetData(response.data.data)

        if(response.data.data_inactive == 0){
          setModalVisibleCheck(true)
        }

        
        SetLoad(false)
    })
    .catch(function (error) { console.log(error.message)})
    .then(function () {console.log("response.data")});
  }


  async function saveData(){

    console.log(userDetails)
  
    const data = {
      "id_oracion" : Oracion,
      "time"    : `${Hours.hours}:${Hours.minutes}`,
      "id_user" : userDetails.user_id
    }

    console.log('Enviando formulario')
    console.log(base_url(Api,`oraciones/guiadas`))
    await axios.post( base_url(Api,`oraciones/guiadas`), data).then(function (response) {
      setModalVisible(false)
      GetOraciones()
    })
      .catch(function (error) { console.log(error.message)})
      .then(function () {console.log("response.data")});

  }






  async function Delete(id){
    console.log('Enviando formulario')
    console.log(base_url(Api,`oraciones/guiadas/delete/${id}`))
    await axios.get( base_url(Api,`oraciones/guiadas/delete/${id}`)).then(function (response) {
      GetOraciones()
    })
      .catch(function (error) { console.log(error)})
      .then(function () {console.log("response.data")});
  }


  async function Edit(data){
    setModalVisibleEdit(true)
    setHoursEdit({"hours": data.hour, "minutes" : data.minute})
    setIdEdit(data.id_oracion_guiada)
  }


  async function saveEdit(){

    const data = {
      "id" : IdEdit,
      "time"    : `${HoursEdit.hours}:${HoursEdit.minutes}`,
    }

    console.log('Enviando formulario')
    console.log(base_url(Api,`oraciones/guiadas/edit`))
    await axios.post( base_url(Api,`oraciones/guiadas/edit`), data).then(function (response) {
      setModalVisibleEdit(false)
      GetOraciones()
    })
      .catch(function (error) { console.log(error.message)})
      .then(function () {console.log("response.data")});

  }


  async function Check(id) {  
    const data = {
      "id_oracion" : id,
    }

    console.log('Enviando formulario')
    console.log(base_url(Api,`oraciones/guiadas/check`))
    await axios.post(base_url(Api,`oraciones/guiadas/check`), data).then(function (response) {
      GetOraciones()
    })
      .catch(function (error) { console.log(error.message)})
      .then(function () {console.log("response.data")});
  }








  return (
    <>
       
<ImageBackground source={require('../src/fondo1.jpg')}
                                              style={{ width : "100%",height : "100%"}}>  
        <ScrollView
          style={styles.scrollView}>
            <StatusBar backgroundColor="transparent" translucent/>
          
  

          <ImageBackground source={require('../src/guiada.png')}
                                              style={{ width : "100%",height : 200}}
                                              imageStyle={{borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
              <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginTop: 30, marginLeft: 20}}>
                  <View><Icon name='chevron-left-outline' width={30} height={30} fill='#fff' /></View>
              </TouchableOpacity>
            <View style={{ flex: 1,  paddingTop: 0,  borderBottomEndRadius: 60, borderBottomStartRadius: 60, justifyContent: "center", alignItems : "center" }}>
                <Text style={{fontWeight : "bold", color: "#fff", fontSize: 30, marginTop: -40, fontFamily:"Lobster-Regular"}}>Oración guiada</Text>
            </View>
          </ImageBackground>



          <View style = {{marginTop: 4, padding: 12, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 15,  marginBottom: 10, width : "90%", textAlign:'center'}}>
              En esta sección podrás agendar Oraciones diarias, funcionando tu celular como guía recordatoria, <Text style={{fontWeight : "bold"}} >¡Salve María!</Text>
            </Text>
          </View>


      


          <View style = {{marginTop: -14, marginBottom:22, padding: 18, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 18, color: "#8F0D0F",  marginBottom: 10, width : "90%", textAlign: "center", fontWeight: "bold", fontFamily:"Lobster-Regular"}}>
                Oraciones del día
                
            </Text>
            {Data.length > 0 && !Load && !modalVisibleCheck &&
                    <View style={{width:"15%", marginTop:0, marginBottom:0}}>
                      <TouchableOpacity style={{...styles.BtnPrimary, width: 50}} onPress={()=> setModalVisible(true) }>
                          <View><Icon name='plus' width={20} height={20} fill='white' /></View>
                      </TouchableOpacity>
                    </View>
             }
          </View>


          
          


          {Load &&
            <ActivityIndicator style={{marginTop: 30}}  size="large" color="#0E1257"  />
          }

          {Data.length > 0 && !Load && !modalVisibleCheck &&

            Data.map((item, index) => {
                console.log(item)
              return (
                <View style={{width: "100%", justifyContent: "center", alignItems : "center"}}>
                  <View style = {{marginTop: 1, width : "80%", paddingTop: 10,flexDirection: "row", flex : 1, justifyContent: "center",  borderColor: "#999", borderTopWidth: 1}}>

                      <TouchableOpacity onPress={ ()=> navigation.navigate("OracionesDetail", {"data" : item, "randomCode" : Math.random()}) }>
                            <Text style={{color : "black", fontSize: 16, color: "#8F0D0F",textAlign: "center", fontWeight: "bold"}}>
                              <Image style={{width: 30, height: 30}} source={require('../src/manos-orando.png')}/>
                            </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> Edit(item) } style={{marginLeft: "5%"}}>
                        <View style={{color : "black", color: "#444",  marginBottom: 10,fontWeight: "bold"}}>
                            <View >
                                <Text style={{fontWeight: "bold", fontSize: 16}}>
                                    {item.titulo.substring(0,24)}
                                </Text>
                            </View>
        
                            <View>
                                <Text style={{fontWeight: "normal"}}>
                                    Hoy, {item.time}
                                </Text>
                            </View>
        
                        </View>
                      </TouchableOpacity>
      
                      <Text style={{color : "black", fontSize: 16, color: "#8F0D0F",  marginBottom: 10,fontWeight: "bold", }}>


                        <TouchableOpacity onPress={()=> Check(item.id_oracion_guiada) }>
                          {item.status == 0 &&
                                <View><Icon name='checkmark-square-2' width={30} height={30} fill='#777' /></View>
                            }


                            {item.status == 1 &&
                                <View><Icon name='checkmark-square-2' width={30} height={30} fill='green' /></View>
                            }
                        </TouchableOpacity>
                          
                          <TouchableOpacity onPress={()=> Delete(item.id_oracion_guiada) }>
                            <View><Icon name='trash-outline' width={30} height={30} fill='green' /></View>
                          </TouchableOpacity>
                      </Text>
                  </View>
                </View>
              ) 
            })
              
          }


          {modalVisibleCheck &&
            <View style={{alignItems: "center", width:'100%', height: 380, marginLeft:'3%', position : 'absolute', bottom :'-90%'}}>
              <Video
                source={require("../src/sucess_oracion_guiada.mp4")}
                style={styles.backgroundVideo}
                rate={1.0}
                resizeMode={"contain"}
                ignoreSilentSwitch={"obey"}
                onEnd = {()=> setModalVisibleCheck(false)}
              />
            </View>
          }

          


          {Data.length == 0 && !Load && 
              <View style={{justifyContent: "center", alignItems : "center"}}>
                <TouchableOpacity style={styles.BtnPrimary} onPress={()=> setModalVisible(true) }>
                    <Text style={{color: "white"}}>Agregar</Text>
                </TouchableOpacity>
              </View>
          }



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                        setModalVisible(false)
                    }}
                >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>

                        {
                          Platform.OS === "ios" &&
                          <View>

                            <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", marginTop:50}}>
                            <Button color="#8F0D0F" onPress={onPressCategoryIos} title={Categoria} />
                            </View>
                            <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", marginTop:10}}>
                            <Button color="#8F0D0F" onPress={() => onPressOracionesIos()} title={OracionTitle} />
                            </View>
                            <View style={{marginTop:10, flexDirection : "row",alignItems: "center", width:'100%'}}>
                               <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", width:"40%", marginRight:10}}>
                                  <Button color="#8F0D0F" onPress={onPressHour} title= "Hora" />
                                  <Text style={{backgroundColor:"#8F0D0F", borderRadius:10, color:"white", textAlign: "center"}}>{Hours.hours}</Text>
                               </View>
                               <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", width:"40%", marginLeft:10}}>
                                <Button color="#8F0D0F" onPress={onPressMinute}  title= "Minutos" />
                                 <Text style={{backgroundColor:"#8F0D0F", borderRadius:10, color:"white", textAlign: "center"}}>{Hours.minutes}</Text>
                               </View>
                            </View>
                            
                          </View>
                        }

                        {
                          Platform.OS === "android" &&
                          <View  style={{marginTop: 10, width: "90%"}}>
                              <View style={{borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", marginBottom: 10}}>
                                <Picker
                                  selectedValue={Categoria}
                                  style={{...styles.select, width: "100%"}}
                                  onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                                >

                                  <Picker.Item label="Seleccione una Categoria" value="Seleccione" />         
                                  <Picker.Item label="Santo Rosario" value="Santo Rosario" />
                                  <Picker.Item label="Letanias" value="Letanias" />
                                  <Picker.Item label="Oraciones Diversas" value="Oraciones Diversas" />
                                  <Picker.Item label="Oraciones de la Confianza" value="Oraciones de la Confianza" />
                                  <Picker.Item label="Coronilla de la Misericordia" value="Coronilla de la Misericordia" />
                                  <Picker.Item label="Oraciones por la Familia" value="Oraciones por la Familia" />
                                </Picker>
                              </View>

                              <View style={{borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", marginBottom: 10}}>
                                <Picker
                                  selectedValue={Oracion}
                                  style={{...styles.select, width: "100%"}}
                                  onValueChange={(itemValue, itemIndex) => setOracion(itemValue)}
                                >
                                  <Picker.Item label="Selec. Oración" value="Seleccione" />     
                                  {Oraciones.length > 0 && 

                                    Oraciones.map((item, index) => {
                                      return (<Picker.Item label={item.titulo} value={item.id} key={index}/>) 
                                    })
                                  }
                              </Picker> 
                            </View>


                            <TimePicker
                                selectedHours={0}
                                selectedMinutes={0}
                                onChange={(hours, minutes) => setHours({"hours": hours, "minutes" : minutes})}
                            />

                          </View>
                        }
                          <View style={{marginTop:10, flexDirection : "row",alignItems: "center", width:'100%'}}>
                          <View style={{width:'40%', marginLeft:"5%", marginRight:"5%"}}>
                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#8F0D0F", marginTop: 10 }}
                              onPress={() => {
                                  saveData();
                              }}
                          >
                          <Text style={{color: "white", textAlign: "center"}}>Guardar</Text>
                          </TouchableHighlight>
                          </View>  

                          <View style={{width:'40%', marginRight:"5%", marginLeft:"3%"}}>

                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#8F0D0F", marginTop: 10 }}
                              onPress={() => {
                                  setModalVisible(!modalVisible);
                              }}
                          >
                          <Text style={{color: "white", textAlign: "center"}}>Cerrar</Text>
                            </TouchableHighlight>
                           </View>  
                          </View>
                      </View>
                    </View>
                </Modal>






                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleEdit}
                    onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                        setModalVisibleEdit(false)
                    }}
                >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>

                        {
                          Platform.OS === "ios" &&
                          <View>
                            <View style={{marginTop:10, flexDirection : "row",alignItems: "center", width:'100%'}}>
                               <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", width:"40%", marginRight:10}}>
                                  <Button color="#8F0D0F" onPress={onPressHour} title= "Hora" />
                                  <Text style={{backgroundColor:"#8F0D0F", borderRadius:10, color:"white", textAlign: "center"}}>{HoursEdit.hours}</Text>
                               </View>
                               <View style={{backgroundColor:"white", borderWidth:1, borderRadius:0, borderColor:"#8F0D0F", width:"40%", marginLeft:10}}>
                                <Button color="#8F0D0F" onPress={onPressMinute}  title= "Minutos" />
                                 <Text style={{backgroundColor:"#8F0D0F", borderRadius:10, color:"white", textAlign: "center"}}>{HoursEdit.minutes}</Text>
                               </View>
                            </View>
                            
                          </View>
                        }

                        {
                          Platform.OS === "android" &&
                          <View style={{width: "80%", marginTop: 20}}>  
                            <TimePicker
                                selectedHours={HoursEdit.hours}
                                selectedMinutes={HoursEdit.minutes}
                                onChange={(hours, minutes) => setHoursEdit({"hours": hours, "minutes" : minutes})}
                            />
                          </View>
                        }
                          <View style={{marginTop:10, flexDirection : "row",alignItems: "center", width:'100%'}}>
                            <View style={{width:'40%', marginLeft:"5%", marginRight:"5%"}}>
                              <TouchableHighlight
                                  style={{ ...styles.openButton, backgroundColor: "#8F0D0F", marginTop: 10 }}
                                  onPress={() => {
                                    saveEdit();
                                  }}
                              >
                              <Text style={{color: "white", textAlign: "center"}}>Guardar</Text>
                              </TouchableHighlight>
                           </View>  

                          <View style={{width:'40%', marginRight:"5%", marginLeft:"3%"}}>

                          <TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#8F0D0F", marginTop: 10 }}
                              onPress={() => {
                                  setModalVisibleEdit(false);
                              }}
                          >
                          <Text style={{color: "white", textAlign: "center"}}>Cerrar</Text>
                          </TouchableHighlight>
                           </View>  
                          </View>
                      </View>
                    </View>
                </Modal>
                                   
        </ScrollView>
  </ImageBackground>   

       



  <View style={styles.menu}>
        <View>

            <TouchableOpacity onPress={ ()=> goToScreen("Dashboard") } >
                <View style={styles.itemMenu}>
                    <Image style={{width: 30, height: 30, resizeMode: "contain"}} source={require('../src/iglesia.png')}/>
                    <Text  style={styles.texMenu}>Inicio</Text>
                </View>
            </TouchableOpacity>
            
        </View>


        <View >
            
            <TouchableOpacity onPress={ ()=> goToScreen("Oraciones") } >
                <View style={styles.itemMenu}>
                    <Image style={{width: 30, height: 30, resizeMode: "contain"}} source={require('../src/manos-orando.png')}/>
                    <Text  style={styles.texMenu}>Oraciones</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View >
        <TouchableOpacity onPress={()=>goToScreen('Evangelio')}>
              <View style={styles.itemMenu}>     
                    <Image style={{width: 30, height: 30, resizeMode: "contain"}} source={require('../src/bibilia.png')}/>
                    <Text  style={styles.texMenu}>Evangelio</Text>    
            </View>
            </TouchableOpacity>
        </View>



        <View >
            <TouchableOpacity style={styles.itemMenu} onPress={()=>goToScreen('Profile')}>
                <Image style={{width: 24, height: 30, resizeMode: "contain"}} source={require('../src/usuario.png')}/>
                <Text  style={styles.texMenu}>Mi Perfil</Text>
            </TouchableOpacity>
        </View>
      </View>





        
      
    </>
  );

}

export default Index;
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%",
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: "white",
  },
  sectionContainer: {
    marginTop: 32,
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

  BtnPrimary:{
    width:"40%",
    backgroundColor:"green",
    borderRadius:25,
    height:35,
    alignItems:"center",
    justifyContent:"center",
    marginTop:0,
  },
  modalView: {
    padding: 0,
    alignItems: "center",
    backgroundColor : 'white',
    height: "100%",
    shadowOffset: {
    width: 0,
    height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 160
  },


  select: {
   width: 250,
    color: "#777",
    borderBottomColor: "#0093d9",
    marginBottom:10,
    
  },

  backgroundVideo: {
    height: (height - 380),
    width: "100%",
    alignSelf : "center",
    backgroundColor:'transparent',
    
  },



  menu: {
    padding:10 ,
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
    color : "#777",
    fontFamily:"Lobster-Regular"
},

texMenuActive : {
    color : "#0093d9"
},





});

