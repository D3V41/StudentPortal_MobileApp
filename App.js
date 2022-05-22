/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Student from './components/Student';
import Login from './components/Login';
const Stack = createStackNavigator();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  async clearStorage() {
    AsyncStorage.clear();
  }

  async checkLogin() {
    if ((await AsyncStorage.getItem('token')) == null) {
      this.setState({isLogin: false});
    } else {
      this.setState({isLogin: true});
    }
  }

  render() {
    this.checkLogin();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLogin == false ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Student"
              component={Student}
              options={{
                title: 'Student Portal',
                headerLeft: null,
                headerRight: () => (
                  <TouchableOpacity>
                    <Text>
                      <FontAwesome
                        name={'sign-out-alt'}
                        size={30}
                        onPress={this.clearStorage}
                      />
                    </Text>
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontFamily: 'Lato-Bold',
                },
                headerTitleAlign: 'center',
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
