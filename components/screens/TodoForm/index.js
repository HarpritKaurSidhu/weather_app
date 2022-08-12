import { View, TextInput, TouchableOpacity, Text,Button, Switch, Pressable,Icon } from 'react-native';
import { Alert} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';

export default function (props) {
  const [task, setTask] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTaskChange = (text) => {
    setTask(text);
  };

  const handleIsCompleteChange = (value) => {
    Alert.alert(
      "Alert",
      "Do you want to delete all games from the list",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => setIsComplete(value) }
      ]
    );
    
  }

  const handleAddTask = () => {
    if (task === '') {
      setErrorMessage('Please, enter a game description.');
    } else {
      props.onAddTask(task, isComplete);
      setTask('');
      setIsComplete(false);
      setErrorMessage('');
    }
  };

  const handleIsCompleteLabelClick = () => {
    setIsComplete(!isComplete);
  };

  return (
    <>
      {errorMessage !== '' && (
        <View>
          <Text>Invalid Data:</Text>
          <Text>- {errorMessage}</Text>
        </View>
      )}

      <View style={styles.container}>
        <TextInput
          placeholder='Enter a game'
          maxLength={50}
          style={styles.input}
          defaultValue={task}
          onChangeText={handleTaskChange}
        />
        <TouchableOpacity
          onPress={handleAddTask}
          style={styles.button}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>Add Game</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>

        <Switch
          value={isComplete}
          onValueChange={handleIsCompleteChange}
          
        />
        <Pressable onPress={handleIsCompleteLabelClick}>
          <Text>Click to delete all games from the list</Text>
        </Pressable>
      </View> */}
    </>
  );
}