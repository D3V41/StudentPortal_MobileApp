import React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView} from 'react-native';
import {
  ListItem,
  Avatar,
  Badge,
  Divider,
  ButtonGroup,
  Overlay,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

class SubjectList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      mydata: [],
      branch: '',
      semester: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.getBranch();
  }

  componentDidMount() {
    this.loaddata();
  }

  async getBranch() {
    this.setState({branch: (await AsyncStorage.getItem('branch')).toString()});
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
      .get(`http://10.0.2.2:8080/admin/subject`, config)
      .then((res) => {
        this.setState({data: res.data});
        this.filterdata(this.state.data, this.state.semester);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  filterdata(data, semester) {
    this.setState({
      mydata: data.filter(
        (l) =>
          l.subjectBranch === this.state.branch &&
          l.subjectSemester === (semester + 1).toString(),
      ),
    });
  }

  updateIndex(semester) {
    this.filterdata(this.state.data, semester);
    this.setState({semester: semester});
  }

  async sendId(subjectId) {
    await AsyncStorage.setItem('subjectId', subjectId);
    this.gotomaterialList();
  }

  gotomaterialList() {
    setTimeout(() => {
      this.props.navigation.navigate('MaterialList');
    }, 500);
  }

  render() {
    buttons = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const {semester} = this.state;
    return (
      <ScrollView>
        <Text style={{margin: 5, fontSize: 20}}>Semester : </Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={semester}
          buttons={buttons}
          containerStyle={{height: 30}}
        />
        {this.state.mydata.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            Component={TouchableScale}
            onPress={() => this.sendId(l.subjectId)}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ['#F7FAFC', '#F3F9FD'],
              start: {x: 1, y: 0},
              end: {x: 0.2, y: 0},
            }}
            ViewComponent={LinearGradient}
            style={{margin: 5, borderRadius: 8, overflow: 'hidden'}}>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                {l.subjectName}
              </ListItem.Title>
              <ListItem.Subtitle>Credit : {l.subjectCredit}</ListItem.Subtitle>
            </ListItem.Content>
            <FontAwesome name={'angle-right'} size={25} />
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}

export default SubjectList;
