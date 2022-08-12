import { View, Text, Image, Alert,TouchableOpacity} from 'react-native';
import styles from './styles';

export default function (props) {
  const { description, id, isComplete } = props.task;

  const toggleSwitch = (value) => {
    
    Alert.alert(
      "Alert",
      "Do you want to delete this game",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => props.onUpdateTask(id, value) }
      ]
    );
  }

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.description}>{description}</Text>
        {/* <Text style={styles.id}>{id}</Text> */}
      </View>
      <View>
       
        <TouchableOpacity onPress={toggleSwitch}>
        <Image
          style={styles.image}
        
          // source={'/Users/harprit/Downloads/todo-app/src/icons/delete.png'}

          source={{
            uri: 'https://thumbs.dreamstime.com/z/delete-glyph-vector-line-icon-delete-icon-102291534.jpg',
          }}
        />
        </TouchableOpacity>
       
      </View>
    </View>
  );
}