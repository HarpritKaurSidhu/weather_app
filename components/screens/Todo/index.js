import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Icon,
} from "react-native";
import styles from "./styles";
import TodoForm from "./../TodoForm";
import TodoItem from "./../TodoItem";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import Search from "../Search";
import {
  dbInit,
  dbAddTask,
  dbGetTasks,
  dbUpdateTask,
  dbDeleteAllTasks,
} from "./../../database/sqlite";

export default function () {
  const [tasks, setTasks] = useState([]);

  // Open the database
  useEffect(() => {
    initDatabase()
  }, []);
console.log(Search.handleAddTask)
  const initDatabase = () =>{
    dbInit()
    .then((result) => {
      dbGetTasks()
        .then((result) => {
          const dbTasks = result.rows._array.map((row) => {
            return {
              id: row.id,
              description: row.description,
              isComplete: row.isComplete == 1,
            };
          });
          setTasks(dbTasks);

        
        })
        .catch((error) => {
          console.log("Get Error:", error);
        });
    })
    .catch((error) => {
      console.log("Init Error:", error);
    });
  }
  const handleAddTask = (description, isComplete) => {
    const data = {
      id: uuid(),
      description: description,
      done: isComplete,
    };

    dbAddTask(description, isComplete)
      .then((result) => {
        console.log("Add Result:", result);

        // Update the state
        const updatedTasks = [...tasks];
        updatedTasks.push({
          description: description,
          id: result.insertId,
          isComplete: isComplete,
        });
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log("Add Error:", error);
      });
  };
  const handleUpdateTask = (id, isComplete) => {
    // const taskToUpdate = tasks.find((task) => task.id === id);
    // const data = {
    //   ...taskToUpdate,
    //   done: isComplete,
    // };
    // delete data["isComplete"];
    // console.log("data", data);

    dbUpdateTask(id, isComplete)
      .then((result) => {
        // Update the state
        initDatabase()

      })
      .catch((error) => {
        console.log("Update Error:", error);
      });
  };

  const handleIsCompleteChange = () => {
    Alert.alert("Alert", "Do you want to delete all games from the list", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => {
        dbDeleteAllTasks().then(()=>{
          initDatabase()
        })
       
       },
      }
  
    ]);
  };

  return (
    <>
      <View style={styles.form}>
        <TodoForm onAddTask={handleAddTask} />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleIsCompleteChange}
          style={styles.button}
          activeOpacity={0.5}
        >
          <Text style={styles.listHeader}>Delete All Games</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        <ScrollView
          keyboardDismissMode="on-drag"
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll={true}
        >
          <View>
            <Text style={styles.listHeader}>List of Locations</Text>
          </View>
          {tasks.map((task, index) => (
            <TodoItem key={index} task={task} onUpdateTask={handleUpdateTask} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
