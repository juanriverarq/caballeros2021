import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProvider from './contexts/UserProvider'

import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Register from './screens/Register'
import Oraciones from './screens/Oraciones'
import SantoRosario from './screens/SantoRosario'
import OracionGuiada from './screens/OracionGuiada'
import MisteriosLuminosos from './screens/MisteriosLuminosos'
import Donate from './screens/Donate'
import ShareImage from './screens/ShareImage'

import ListOraciones from './screens/OracionesList'
import OracionesListSubCategoria from './screens/OracionesListSubCategoria'
import OracionesDetail from './screens/OracionesDetail'

import MethodPay from './screens/MethodPay'
import PayToCard from './screens/PayToCard'
import PayToNequi from './screens/PayToNequi'
import PayToOther from './screens/PayToOther'
import Evangelio from './screens/Evangelio'
import EvangelioDetail from './screens/EvangelioDetail'
import SantoDetail from './screens/SantoDetail'
import History from './screens/History'
import MesesPay from './screens/MesesPay'

import PaymentSummary from './screens/PaymentSummary'
import RecoveryAccount from './screens/RecoveryAccount'
import PlayerSound from './screens/PlayerSound'
import Profile from './screens/Profile'
import ChangePassword from './screens/ChangePassword'
import Live from './screens/Live'
import Confe from './screens/Confe'
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
function App(){
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}> 
          <Stack.Screen  headerMode={'none'} name="Home"               component = { Home } />
          <Stack.Screen name="Login"              component = { Login } />
          <Stack.Screen name="RecoveryAccount"    component = { RecoveryAccount } />
          <Stack.Screen name="Confe"    component = { Confe } />
          <Stack.Screen name="Live"              component = { Live } />
          <Stack.Screen name="Register"           component = { Register } />
          <Stack.Screen name="Dashboard"          component = { Dashboard } />
          <Stack.Screen name="Oraciones"          component = { Oraciones } />
          <Stack.Screen name="SantoRosario"       component = { SantoRosario } />
          <Stack.Screen name="OracionGuiada"      component = { OracionGuiada } />
          <Stack.Screen name="MisteriosLuminosos" component = { MisteriosLuminosos } />
          <Stack.Screen name="Donate"             component = { Donate } />
          <Stack.Screen name="ShareImage"         component = { ShareImage } />
          <Stack.Screen name="ListOraciones"      component = { ListOraciones } />
          <Stack.Screen name="OracionesListSubCategoria" component = { OracionesListSubCategoria } />
          <Stack.Screen name="OracionesDetail"    component = { OracionesDetail } />
          <Stack.Screen name="Player"             component = { PlayerSound } />
          <Stack.Screen name="MethodPay"         component={ MethodPay } />
          <Stack.Screen name="PayToCard"         component={ PayToCard } />
          <Stack.Screen name="PayToNequi"         component={ PayToNequi } />
          <Stack.Screen name="PayToOther"         component={ PayToOther } />
          <Stack.Screen name="PaymentSummary"     component={ PaymentSummary } />
          <Stack.Screen name="Evangelio"         component={ Evangelio } />
          <Stack.Screen name="EvangelioDetail"         component={ EvangelioDetail } />
          <Stack.Screen name="SantoDetail"         component={ SantoDetail } />
          <Stack.Screen name="History"         component={ History } />
          <Stack.Screen name="MesesPay"         component={ MesesPay } />
          <Stack.Screen name="Profile"         component={ Profile } />
          <Stack.Screen name="ChangePassword"   component={ ChangePassword } />
        </Stack.Navigator>
       </UserProvider>
    </NavigationContainer>
  )
}


console.disableYellowBox = true
export default App;

