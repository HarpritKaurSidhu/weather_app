import { View, Text } from 'react-native';
import styles from '../../styles/app'

export default function () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.summery}>The weather app provides atmospheric pressure, weather conditions, visibility distance, 
      relative humidity, precipitation in different unites, dew point, wind speed and direction,
      Get the weather forecast in a beautiful and powerful app,
      We can check weather of a particular place by searching in searchbar. We can check weather in Celsius to Fahrenheit.</Text>
    </View>
  );
}