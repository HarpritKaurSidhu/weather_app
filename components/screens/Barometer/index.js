import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Barometer } from "expo-sensors";

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = Barometer.addListener((barometerData) => {
      setData(barometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const { pressure = 0, relativeAltitude = 0 } = data;

  return (
    <View style={styles.sensor}>
      <Text style={styles.header}>Barometer</Text>
      <Text style = {styles.summary}>Pressure: {pressure * 100} Pa</Text>
      <Text style = {styles.summary}>
        Relative Altitude:{" "}
        {Platform.OS === "ios"
          ? `${relativeAltitude} m`
          : `Only available on iOS`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}
const styles = StyleSheet.create({
    header:{
fontSize: 30
    },
    summary:{
        fontSize: 15
 
    },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff304f",
    padding: 10,
  },
  sensor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    paddingHorizontal: 10
  },
});
