import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import CreditApp from '../screens/Credit/Creditapp'

const Stack = createStackNavigator();

const Navigation = props => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
        <Stack.Screen name="CreditApp" component={CreditApp} />

      </Stack.Navigator>
    </NavigationContainer>
  )

};

export default Navigation;