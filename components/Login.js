import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  gotostudent() {
    setTimeout(() => {
      this.props.navigation.navigate('Student');
    }, 500);
  }

  async submit() {
    let data = {};
    (data.username = this.state.username),
      (data.password = this.state.password);

    await axios
      .post('http://10.0.2.2:8080/api/auth/signin', data)
      .then((res) => {
        AsyncStorage.setItem('token', res.data.jwttoken);
        AsyncStorage.setItem('id', res.data.username);
        AsyncStorage.setItem('role', res.data.role.toString());
        this.gotostudent();
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 200}}
          source={require('./mortarboard.png')}
        />
        <Text style={styles.logo}>StudentPortal</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Student ID..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({username: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.submit()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fb5b5a',
    marginBottom: 50,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
