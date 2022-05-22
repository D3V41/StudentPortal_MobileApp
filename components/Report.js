import React, {Component} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListReport from './ListReport';
import AddReport from './AddReport';
import ShowReport from './ShowReport';
const Stack = createStackNavigator();

class Report extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="ListReport">
        <Stack.Screen name="ListReport" component={ListReport} />
        <Stack.Screen name="ShowReport" component={ShowReport} />
        <Stack.Screen name="AddReport" component={AddReport} />
      </Stack.Navigator>
    );
  }
}

export default Report;
