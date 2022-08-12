import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 10,
    color: "#ff304f",
    marginBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  summery:{
    margin: 30,
    alignItems:'stretch',
    justifyContent: 'space-evenly'
    },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "white",
    width: "70%",
    padding: 30,
    borderRadius: 20,
    //borderWidth: 1,

    // Android
    elevation: 5,

    // iOS
    shadowOpacity: 0.25,
    shadowColor: "#000", // Also Android
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn:{
    title: {
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 50,
      marginLeft: 10,
      color: "#ff304f",
    }
  }
});
