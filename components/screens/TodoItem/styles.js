import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    fontSize: 16
  },
  id: {
    fontSize: 12,
    color: 'gray'
  },
  image:{
    height:20,
    width: 20
  }
});
