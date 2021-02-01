/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator
} from 'react-native';

import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';

import {Api, base_url} from '../Env'    
import axios from 'axios'

import Share from 'react-native-share';
import RNFetchBlob from "rn-fetch-blob";
const fs = RNFetchBlob.fs;
let imagePath = null;

function Index(props) {  


  const [modalVisible, setModalVisible] = useState(false);
  const [ShowImage, setShowImage]    = useState("galley1.png");
  const [Images, setImages]    = useState([]);
  const [Load, setLoad]    = useState(true);
  const [ImagesBase64, setImagesBase64]    = useState([]);
  const [LoadImages, setLoadImages] =  useState(true)
  const [Next, setNext] =  useState(0)
  const [Prev, setPrev] =  useState(0)


  const {navigation} = props

  const [dataSource, setDataSource] = useState([]);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];




  async function ConvertBase64(Image){
    setLoad(true)

    await RNFetchBlob.config({
      fileCache: true
    }) .fetch("GET", Image)
    
    .then(resp => {
    
      imagePath = resp.path();

      return resp.readFile("base64");
    })
    .then(base64Data => {
      // here's base64 encoded image
       setImagesBase64(`data:image/png;base64,${base64Data}`)
       setLoad(false)
      // remove the file from storage
      return fs.unlink(imagePath);
    });
  }

  async function ShareImage(){

    const options = Platform.select({
      default: {
        title: 'Share',
        message: "",
        url : ImagesBase64
      }
    });
  
    await  Share.open(options).then((res) => {
       setModalVisible(false)
    })
    
  }




  async function ShowModal(image){
    
    const imagen = <Image style={{width: "100%", height: 300, resizeMode: "contain",}} source={{
        uri: image,
      }}/>

    await setModalVisible(true)
    await setShowImage(imagen)
    await ConvertBase64(image)
    
    
  }


  useEffect(()=>{
    setLoadImages(true)
    console.log('Enviando formulario')
    console.log(base_url(Api,`images`))
    axios.get( base_url(Api,`images`)).then(function (response) {
      setImages(response.data.data)

      setNext(response.data.next_page_url)
      setPrev(response.data.first_page_url)
      setLoadImages(false)

    })
    .catch(function (error) { 
      console.log(error.message) 
      setLoadImages(false) 
    })
    .then(function () {console.log("response.data")});
  },[])


  async function getImages(endopoint){
    setLoadImages(true)
    console.log('Enviando formulario')
    console.log(base_url(Api,`images`))
   await axios.get(endopoint).then(function (response) {
      setImages(response.data.data)

      setNext(response.data.next_page_url)
      setPrev(response.data.first_page_url)
      setLoadImages(false)

    })
    .catch(function (error) { 
      console.log(error.message) 
      setLoadImages(false) 
    })
    .then(function () {console.log("response.data")});
  }


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F3E1"/>
      <SafeAreaView style = {{backgroundColor : "#F8F3E1"}}>


        <ScrollView
          style={styles.scrollView}>

            


          <View style = {{marginTop: 40, padding: 10, width : "100%", alignItems: "center"}}>
            <Text style={{color : "black", fontSize: 20, color: "#464646",  marginBottom: 1, width : "90%", textAlign: "center", fontWeight: "bold",fontFamily:"Lobster-Regular"}}>
                Imágenes para compartir
            </Text>
          </View>



            <View style={{backgroundColor : "white",borderRadius: 10}}>


            {LoadImages == true &&
              <ActivityIndicator size="large" color="#0093d9" />
            }


            {!LoadImages &&
                <View>
                  <FlatList
                    data={Images}
                    renderItem={({ item }) => (
                      <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                          <TouchableOpacity onPress={ ()=> ShowModal(`https://caballeros.chseguros.com.co/img/oraciones/image/${item.image}`) }>
                            <Image style={styles.imageThumbnail} source={{
                              uri : `https://caballeros.chseguros.com.co/img/oraciones/image/${item.image}`
                            }}/>
                        </TouchableOpacity>
                      </View>
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                  />


                  <View style={styles.pagination}>
                      <View><TouchableOpacity onPress={()=>getImages(Prev)}><Icon name='arrow-left-outline' width={35} height={35} fill='#777' /></TouchableOpacity></View>
                      <View><TouchableOpacity onPress={()=>getImages(Next)}><Icon name='arrow-right-outline' width={35} height={35} fill='#777' /></TouchableOpacity></View>
                  </View>
                </View>
            }


              
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                      {Load &&
                          <ActivityIndicator size="large" color="#fff" />
                      }

                      {ShowImage && !Load &&
                          ShowImage
                      }
                      


                        
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#8F0D0F" }}
                            onPress={() => {
                              ShareImage();
                            }}
                        >
                          
                            <Text style={styles.share}>Compartir</Text>
                        </TouchableHighlight>



                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#8F0D0F", marginTop: 10}}
                            onPress={() => {
                              setModalVisible(false);
                            }}
                        >
                          
                            <Text style={styles.share}>Cerrar</Text>
                        </TouchableHighlight>


                    </View>
                    </View>
                </Modal>


            </View>

                                   
        </ScrollView>
        <Menu props = {props} />
      </SafeAreaView>
      
    </>
  );

}

export default Index;

const styles = StyleSheet.create({
  scrollView: {
    width:'100%',marginBottom: 70, height: "90%", padding : 16
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
    width:"90%",
    backgroundColor:"#8F0D0F",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
  },

  loginText:{
    color:"white"
  },

  modalView: {
    padding: 35,
    alignItems: "center",
    backgroundColor : 'rgba(52, 52, 52, 0.8)',
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
    width: 160,
    marginTop:10,
  },
  share: {
    fontFamily:"Lobster-Regular",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },

  pagination : {
    flexDirection  : "row",
    marginTop: 20,
    marginBottom:10,
    width : "100%",
    justifyContent : "space-between",
  }


});

