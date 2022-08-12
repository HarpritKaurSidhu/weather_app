import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Switch,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
// import styles from '../../styles/app';
import * as Location from "expo-location";
import WeatherInfo from "../../WeatherInfo";
import UnitsPicker from "../../UnitsPicker";
import ReloadIcon from "../../ReloadIcon";
import WeatherDetails from "../../WeatherDetails";
import { colors } from "../../../utils";

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const WEATHER_API_KEY = "7fefbd8f1fa2a2c1c5aa66db64ce6dcf";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function (props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");
  console.log("Value", task);
  const [text, onChangeText] = React.useState("");
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Here: ", props)
  useEffect(() => {
    load();
  }, [unitsSystem]);


  async function searchLoad() {
    setCurrentWeatherDetails(null);
    setCurrentWeather(null);
    setErrorMessage(null);
    
   
    console.log("text", task);
      try {
        const weatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&appid=7fefbd8f1fa2a2c1c5aa66db64ce6dcf`;
        const myresponse = await fetch(weatherUrl);
        const myResult = await myresponse.json();

        if (myresponse.ok) {
          console.log("Result", myResult);
          console.log(JSON.stringify(myResult));
          // for (var i = 0; i < result.length; i++){
          //   console.log(result[i].lat)
          //   console.log(result[i].lon)

          //  }

          const lat = myResult[0].lat;
          const long = myResult[0].lon;
          console.log("lat", lat);
          console.log("lon", long);
          const url = `${BASE_WEATHER_URL}lat=${lat}&lon=${long}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
          const response = await fetch(url);
          const result = await response.json();

          if (response.ok) {
            console.log(result);
            setCurrentWeather(result.main.temp);
            setCurrentWeatherDetails(result);
          } else {
            Alert.alert(
              "Alert",
              result.message,
              [{ text: "OK", onPress: () => load() }],
              { cancelable: false }
            );

            //setErrorMessage(result.message);
          }
        }
      } catch (error) {
        Alert.alert(
          "Alert",
          error.message,
          [{ text: "OK", onPress: () => load() }],
          { cancelable: false }
        );
      }
   
  }
  async function load() {
    setCurrentWeatherDetails(null);
    setCurrentWeather(null);
    setErrorMessage(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMessage("Access is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result.main.temp);
        setCurrentWeatherDetails(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeatherDetails) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Search</Text>

        <TextInput
          style={styles.input}
          placeholder='Enter a location'
          defaultValue={task}
          onChangeText={onChangeText}
        />
        <Button color="#ff304f" title="Search City" onPress={searchLoad} />

        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          {/* <ReloadIcon load={load} /> */}
          <WeatherInfo
            currentWeather={currentWeather}
            currentWeatherDetails={currentWeatherDetails}
          ></WeatherInfo>
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          currentWeatherDetails={currentWeatherDetails}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
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
  main: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 10,
    color: "#ff304f",
  },
});
