import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';

import MealScreen from './MealScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Breakfast">{() => <MealScreen meal="breakfast" />}</Tab.Screen>
      <Tab.Screen name="Lunch">{() => <MealScreen meal="lunch" />}</Tab.Screen>
      <Tab.Screen name="Dinner">{() => <MealScreen meal="dinner" />}</Tab.Screen>
      <Tab.Screen name="Late Night">{() => <MealScreen meal="latenight" />}</Tab.Screen>
    </Tab.Navigator>
  );
}

function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Welcome to Hungry Lion</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="MainApp" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
