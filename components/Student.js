import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import StudentProfile from './StudentProfile';
import Subject from './Subject';
import ExamResult from './ExamResult';
import Report from './Report';

const Tab = createBottomTabNavigator();

const Home = ({route, navigation}) => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen
        name="Subjects"
        component={Subject}
        options={{
          tabBarLabel: 'Subjects',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'book'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Entypo name={'user'} color={color} size={size} />
          ),
        }}>
        {() => <StudentProfile />}
      </Tab.Screen>
      <Tab.Screen
        name="ExamResult"
        component={ExamResult}
        options={{
          tabBarLabel: 'ExamResult',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'poll'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name={'poll-h'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
