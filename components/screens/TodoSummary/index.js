import { View, Text } from 'react-native';
import styles from './styles';

export default function (props) {
  const { tasks } = props;

  const completedTasks = tasks.filter(
    (task) => task.isComplete
  );
  const openTasks = tasks.filter(
    (task) => !task.isComplete
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {tasks.length} tasks
      </Text>
      <Text style={styles.text}>
        {completedTasks.length} completed
      </Text>
      <Text style={styles.text}>
        {openTasks.length} open
      </Text>
    </View>
  );
}