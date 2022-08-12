import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    flex: 1,
    padding: 10
  },
  button: {
    backgroundColor: '#76BA99',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
});
