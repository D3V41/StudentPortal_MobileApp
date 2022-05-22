import React, {Component} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubjectList from './SubjectList';
import MaterialList from './MaterialList';
const Stack = createStackNavigator();

class Subject extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="SubjectList">
        <Stack.Screen
          name="MaterialList"
          component={MaterialList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubjectList"
          component={SubjectList}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default Subject;
