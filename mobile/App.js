import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './src/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import Home from './src/views/Home.jsx';
import Favorites from './src/views/Favorites.jsx';
import MovieDetail from './src/views/MovieDetail.jsx';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();




function MainTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bgElevated },
        headerTintColor: COLORS.text,
        tabBarStyle: { backgroundColor: COLORS.bgElevated, borderTopColor: COLORS.border },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <BottomTab.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
      <BottomTab.Screen name="favoritos" component={Favorites} options={{ title: 'Favoritos' }} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetail} 
          options={{ title: 'Movie', headerStyle: { backgroundColor: COLORS.bgElevated }, headerTintColor: COLORS.text }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
