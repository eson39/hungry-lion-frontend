import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import VerifyScreen from './screens/VerifyScreen';
import MealScreen from './screens/MealScreen';
import AccountScreen from './screens/AccountScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MealsTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Breakfast">
        {() => <MealScreen meal="breakfast" />}
      </Tab.Screen>
      <Tab.Screen name="Lunch">
        {() => <MealScreen meal="lunch" />}
      </Tab.Screen>
      <Tab.Screen name="Dinner">
        {() => <MealScreen meal="dinner" />}
      </Tab.Screen>
      <Tab.Screen name="Late Night">
        {() => <MealScreen meal="latenight" />}
      </Tab.Screen>
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />

        <Stack.Screen 
          name="Meals" 
          component={MealsTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
