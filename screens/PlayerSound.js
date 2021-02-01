import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ImageBackground} from 'react-native';

import PlayerScreen from 'react-native-sound-playerview'

function Index(props) {  
  const { navigation } = props
//   const Player = React.cloneElement( PlayerScreen )
  const Repro = ()=>{
      return <PlayerScreen props={{...props}} filepath = {props.route.params.audio} ></PlayerScreen>
  }

  return (
     <View style={{
         flex: 1,
         width : "100%"
     }}>
        <Repro />
         
     </View>
  );

}

export default Index;
