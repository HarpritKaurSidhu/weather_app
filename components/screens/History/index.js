import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../../styles/app'
import Todo from "./../Todo";

export default function () {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <Todo />
  </View>
  );
}
