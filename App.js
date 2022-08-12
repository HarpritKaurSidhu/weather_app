import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

import { colors } from "./utils/index";
const WEATHER_API_KEY = "7fefbd8f1fa2a2c1c5aa66db64ce6dcf";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as SplashScreen from 'expo-splash-screen';

import SearchScreen from "./components/screens/Search";
import AboutScreen from "./components/screens/About";
import HomeScreen from "./components/screens/Home";
import BarometerScreen from "./components/screens/Barometer";
import HistoryScreen from "./components/screens/History";
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

 

    return (
      <View style={styles.container}>
   
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
                headerShown: false,
                tabBarLabel: ({focused, color, size}) => (
                  <Text style={{color: focused ? '#ff304f' : color}}>Home</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home-variant"
                    color="#ff304f"
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                title: "Search",
                headerShown: false,
                tabBarLabel: ({focused, color, size}) => (
                  <Text style={{color: focused ? '#ff304f' : color}}>Search</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="magnify"
                    color="#ff304f"
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Barometer"
              component={BarometerScreen}
              options={{
                title: "Barometer",
                headerShown: false,
                tabBarLabel: ({focused, color, size}) => (
                  <Text style={{color: focused ? '#ff304f' : color}}>Barometer</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="weather-tornado"
                    color="#ff304f"
                    size={size}
                  />
                ),
              }}
            />
             <Tab.Screen
              name="History"
              component={HistoryScreen}
              options={{
                title: "History",
                headerShown: false,
                tabBarLabel: ({focused, color, size}) => (
                  <Text style={{color: focused ? '#ff304f' : color}}>History</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home-variant"
                    color="#ff304f"
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: "About",
                headerShown: false,
                tabBarLabel: ({focused, color, size}) => (
                  <Text style={{color: focused ? '#ff304f' : color}}>About</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color="#ff304f"
                    size={size}
                  />
                ),
               
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
});

function StacksComponents() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Barometer" component={BarometerScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
