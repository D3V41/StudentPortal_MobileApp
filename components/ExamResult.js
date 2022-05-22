import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

class ExamResult extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      mydata: [],
      subject: [],
      semester: '1',
      examType: 'Nor',
      student: [],
      load: false,
      cpi: '0',
      spi: '0',
      filepath: '',
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
      .get(`http://10.0.2.2:8080/admin/subject`, config)
      .then((res) => {
        this.setState({subject: res.data});
      })
      .catch((err) => {
        console.warn(err.message);
      });

    await axios
      .get(`http://10.0.2.2:8080/exam/${id}`, config)
      .then((res) => {
        this.setState({data: res.data});
        this.setsubjectname();
        this.filterdata();
      })
      .catch((err) => {
        console.warn(err.message);
      });

    await axios
      .get(`http://10.0.2.2:8080/admin/student/${id}`, config)
      .then((res) => {
        this.setState({student: res.data});
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }

  setsubjectname() {
    var subject = this.state.subject;
    var data = this.state.data;

    for (var j = 0; j < subject.length; j++) {
      data.forEach((element) => {
        if (element.subjectId == subject[j].subjectId) {
          element['subjectName'] = subject[j].subjectName;
          element['subjectSemester'] = subject[j].subjectSemester;
        }
      });

      this.setState({data: data});
      this.setState({load: true});
    }
  }

  filterdata() {
    var data = this.state.data;
    this.setState({
      mydata: data.filter(
        (l) =>
          l.examType === this.state.examType &&
          l.subjectSemester === this.state.semester,
      ),
    });
    var cpis = this.cpi(this.state.mydata, this.state.semester);
    var spis = this.spi(this.state.mydata, this.state.semester);
    this.setState({cpi: cpis});
    this.setState({spi: spis});
    //console.warn(this.state.mydata);
  }

  cpi(results, sem) {
    var spi1 = this.spi(results, '1');
    var spi2 = this.spi(results, '2');
    var spi3 = this.spi(results, '3');
    var spi4 = this.spi(results, '4');
    var spi5 = this.spi(results, '5');
    var spi6 = this.spi(results, '6');
    var spi7 = this.spi(results, '7');
    var spi8 = this.spi(results, '8');

    var all = [spi1, spi2, spi3, spi4, spi5, spi6, spi7, spi8];
    var cpi = 0;
    for (var i = 0; i < sem; i++) {
      cpi = cpi + all[i];
    }
    cpi = cpi / sem;
    return cpi;
  }

  spi(results, sem) {
    var spi = 0;
    let a = 0;
    let l = [];

    results.forEach((e) => {
      if (e.subjectSemester === sem) {
        if (e.examType == 'Rerem' && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        } else if (e.examType == 'Rem' && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        } else if (e.examType == 'Nor' && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        }
      }
    });
    // console.log("spi " + spi);
    return spi;
  }

  isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  result() {
    return `<h1 > Id : ${this.state.student.studentName} </h1>`;
  }

  createPDF = async () => {
    if (await this.isPermitted()) {
      let options = {
        html: this.result(),
        fileName: 'Result' + new Date().getMilliseconds(),
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.warn(file.filePath);
      this.setState({filepath: file.filePath});
    }
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 12,
            backgroundColor: '#CEE3DC',
          }}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'silver',
              marginVertical: 10,
              marginLeft: 10,
              marginRight: 5,
            }}>
            <Picker
              style={{width: '100%', justifyContent: 'center'}}
              selectedValue={this.state.examType}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({examType: itemValue})
              }>
              <Picker.Item label="Select Exam Type" />
              <Picker.Item label="Normal" value="Nor" />
              <Picker.Item label="Rem" value="Rem" />
              <Picker.Item label="Rerem" value="Rerem" />
            </Picker>
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'silver',
              marginVertical: 10,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <Picker
              style={{width: '100%', justifyContent: 'center'}}
              selectedValue={this.state.semester}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({semester: itemValue})
              }>
              <Picker.Item label="Select Semester" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </Picker>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.filterdata();
              }}>
              <FontAwesome name={'sync-alt'} size={30} color={'#2e8b57'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 12,
            backgroundColor: '#CEE3DC',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffcc00',
              marginVertical: 5,
              marginLeft: 10,
              marginRight: 5,
            }}>
            <TouchableOpacity onPress={() => this.createPDF()}>
              <View>
                <Text>Create PDF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{flex: 8, paddingBottom: 15, backgroundColor: '#FACCC2'}}>
          {this.state.mydata.map((l, i) => (
            <Card key={i}>
              <Card.Title style={{fontSize: 25, color: '#3b3531'}}>
                Subject : {l.subjectName}
              </Card.Title>
              <Card.Divider style={{}} />
              <Text style={{fontSize: 20, color: '#3b3531'}}>
                Internal Exam : {l.examInternalMark}
              </Text>
              <Text style={{fontSize: 20, color: '#3b3531'}}>
                External Exam : {l.examExternalMark}
              </Text>
              <Text style={{fontSize: 20, color: '#3b3531'}}>
                Attendence : {l.attendance} %
              </Text>
            </Card>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 12,
            backgroundColor: '#CEE3DC',
          }}>
          <View
            style={{
              flex: 3,
              marginVertical: 10,
              marginLeft: 10,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Cpi : {this.state.cpi}
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              marginVertical: 10,
              marginLeft: 10,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Spi : {this.state.spi}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 25,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginText: {
    color: 'black',
  },
});
export default ExamResult;
