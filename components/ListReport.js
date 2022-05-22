import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Card} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

class ListReport extends Component {
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
      .get(`http://10.0.2.2:8080/report/student/${id}`, config)
      .then((res) => {
        this.setState({data: res.data});
        console.log(res.data);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  async deletedata(rid) {
    let token = (await AsyncStorage.getItem('token')).toString();

    config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios
      .delete(`http://10.0.2.2:8080/report/${rid}`, config)
      .then((res) => {
        this.loaddata();
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  checkStatus(status) {
    if (status === 'No') {
      return (
        <Text
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome name={'times-circle'} size={15} color={'red'} />
          <Text> Pending</Text>
        </Text>
      );
    }
    if (status === 'Yes') {
      return (
        <Text
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome name={'check-circle'} size={15} color={'green'} />
          <Text> Approved</Text>
        </Text>
      );
    }
  }

  showPDF(rdata, name) {
    const source = {uri: 'data:application/pdf;base64,' + rdata};
    console.log(source);
    this.props.navigation.navigate('ShowReport', {source: source, name: name});
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddReport');
            }}>
            <FontAwesome name={'file-pdf'} size={30} color={'#2e8b57'} />
          </TouchableOpacity>
          <Text>Add Report</Text>
        </View>
        {this.state.data.map((l, i) => (
          <Card>
            <View key={i}>
              <Text>Name : {l.reportName}</Text>
              <Text>Date : {l.reportDate}</Text>
              <Text>
                External Status : {this.checkStatus(l.externalStatus)}
              </Text>
              <Text>
                Internal Status : {this.checkStatus(l.internalStatus)}
              </Text>
              <View
                style={{
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginTop: 15,
                  flex: 1,
                }}>
                <TouchableOpacity
                  onPress={() => this.showPDF(l.reportData, l.reportName)}>
                  <FontAwesome name={'eye'} size={25} color={'#1e90ff'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deletedata(l.rId)}>
                  <FontAwesome name={'trash'} size={25} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

export default ListReport;
