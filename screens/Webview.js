import React from "react";
import {   
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { WebView } from 'react-native-webview';
import styles from './../Styles';
import { Icon } from 'react-native-eva-icons';


function Agendar(props){


 return (
 	<SafeAreaView style={{flex:1}}>        
 <StatusBar backgroundColor="#fff"
      barStyle="dark-content"/> 
     <View style={styles.containerPdf}>
              <View style={ styles.headerWrapperCotizar }>
                  <View style={styles.navigationCotizar}>
                      <TouchableOpacity onPress={()=> {props.navigation.navigate('HomeScreen')}}>
                          <Icon name="arrow-ios-back" width={30} height={30} fill="#14132A" />
                      </TouchableOpacity>
                      <View>
             <View>
              <Image source={require('./../assets/logo-dark.png')} style={styles.logod} />
            </View>
            </View>
                      <View>
                         <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}}>
                          <Image source={require('./../assets/Img/Avatar.png')} style={styles.avatar} />
                        </TouchableOpacity>
                      </View>
                  </View>
                 
              </View>

				  <View style={styles.container}>  
				          <WebView source={{ uri: props.route.params.link}} /> 
				  </View>


    </View>

</SafeAreaView> )
}


export default Agendar;
 