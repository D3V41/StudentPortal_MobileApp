import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Card} from 'react-native-elements';

class StudentProfile extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loaddata();
  }

  async loaddata() {
    let id = (await AsyncStorage.getItem('id')).toString();
    let token = (await AsyncStorage.getItem('token')).toString();

    config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios
      .get(`http://10.0.2.2:8080/admin/student/${id}`, config)
      .then((res) => {
        this.setState({data: res.data});
        AsyncStorage.setItem('branch', this.state.data.studentBranch);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text style={styles.header}>StudentProfile</Text>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'user-circle'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentId}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'user-graduate'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentName}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'envelope'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentEmail}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'mars'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentGender}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'calendar-alt'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentDob}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'phone-alt'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentPhone}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'city'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentAddress}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'book-reader'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentClass}</Text>
          </View>
        </View>

        <View style={styles.flex}>
          <View style={styles.logo}>
            <FontAwesome name={'building'} size={30} color={'#2e8b57'} />
          </View>
          <View style={styles.value}>
            <Text style={styles.text}> {this.state.data.studentBranch}</Text>
          </View>
        </View>

        <View style={{flex: 1}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {fontSize: 25, color: '#3b3531', marginLeft: 10},
  logo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    flex: 9,
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'silver',
    margin: 3,
    marginRight: 25,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 20,
    color: '#77b5fe',
  },
});

export default StudentProfile;
