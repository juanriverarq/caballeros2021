import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";





function Index(props) {  
    
    console.log(props.props.navigation.navigate, "HELLO")

    
    function goToScreen(screen)
    {   
        props.props.navigation.navigate(screen, {randomCode : Math.random()})

    }


    return (
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
    )

}
export default Index;

const styles = StyleSheet.create({
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