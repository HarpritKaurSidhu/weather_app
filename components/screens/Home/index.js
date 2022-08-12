import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {  StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import * as Location from "expo-location";
import WeatherInfo from '../../WeatherInfo';
import UnitsPicker from '../../UnitsPicker';
import * as Notifications from 'expo-notifications';
import ReloadIcon from '../../ReloadIcon';
import WeatherDetails from '../../WeatherDetails';
import { colors } from '../../../utils';
const WEATHER_API_KEY = "7fefbd8f1fa2a2c1c5aa66db64ce6dcf";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from "expo-splash-screen";


Notifications.setNotificationHandler({
  handleNotification:async()=>({
    shouldSetBadge: true,
    shouldPlaySound: false,
    shouldShowAlert: true,
  }),
  handleSuccess:(result)=>{
    console.log('Handle result', result)
  },
  handleError:(error)=>{
    console.log('Handle error', error)
  }
})


export default function App() {
  
  // Hide the splash screen
  SplashScreen.hideAsync().catch((error) => {
    console.log("SS Error:", error);
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);
  const [unitsSystem , setUnitsSystem] = useState('metric')

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setCurrentWeatherDetails(null)
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Access is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl)
      const result = await response.json()
      

      if(response.ok){
       setCurrentWeather(result.main.temp)
       setCurrentWeatherDetails(result)
      }
      else {
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }


  }
  if(currentWeatherDetails){

    //const  {main : temp} = currentWeather
    return (
      <View style={styles.container}>

        
        <StatusBar style="auto" />
        <View style={styles.main}>
       
        <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
        <ReloadIcon load={load}/>
        <WeatherInfo currentWeather={currentWeather} currentWeatherDetails={currentWeatherDetails}></WeatherInfo>
        </View>
        <WeatherDetails currentWeather={currentWeather} currentWeatherDetails={currentWeatherDetails} unitsSystem={unitsSystem}/>
   

      </View>
      
    );
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
        
      </View>
    );
  } 
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  main : {
    flex: 1,
    justifyContent: "center",
  }
});
