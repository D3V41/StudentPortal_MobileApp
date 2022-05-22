import React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView, Linking} from 'react-native';
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

class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loaddata();
  }

  async loaddata() {
    let token = (await AsyncStorage.getItem('token')).toString();
    let id = (await AsyncStorage.getItem('subjectId')).toString();

    config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios
      .get(`http://10.0.2.2:8080/material/subject/${id}`, config)
      .then((res) => {
        this.setState({data: res.data});
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  handleClick = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.warn("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  render() {
    return (
      <ScrollView>
        {this.state.data.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ['#F7FAFC', '#F3F9FD'],
              start: {x: 1, y: 0},
              end: {x: 0.2, y: 0},
            }}
            onPress={() => this.handleClick(l.materialLink)}
            ViewComponent={LinearGradient}
            style={{margin: 5, borderRadius: 8, overflow: 'hidden'}}>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                {l.materialDescription}
              </ListItem.Title>
            </ListItem.Content>
            <FontAwesome name={'angle-right'} size={25} />
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}

export default MaterialList;
