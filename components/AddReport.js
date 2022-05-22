// Example to Pick and Upload files in React Native
// https://aboutreact.com/file-uploading-in-react-native/

// Import React
import React, {useState} from 'react';
import Report from './Report';
// Import core components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const AppReport = () => {
  const [report, setReport] = useState({
    reportNo: '6',
    externalStatus: 'No',
    internalStatus: 'No',
    reportDate: '10/10/1999',
    reportType: 'application/pdf',
    studentId: 'S4',
  });
  const [no, setNo] = useState('');
  const [date, setDate] = useState('');
  const [reportdata, setReportdata] = useState('');
  const [reportName, setReportName] = useState('');

  const onInputChange = (e) => {
    setReport({...report, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    let token = (await AsyncStorage.getItem('token')).toString();
    let id = (await AsyncStorage.getItem('id')).toString();

    var bodyFormData = new FormData();
    bodyFormData.append('reportData', reportdata);
    bodyFormData.append('reportType', report.reportType);
    bodyFormData.append('studentId', id);
    bodyFormData.append('reportNo', no);
    bodyFormData.append('reportName', reportName);
    bodyFormData.append('reportDate', date);
    bodyFormData.append('externalStatus', report.externalStatus);
    bodyFormData.append('internalStatus', report.internalStatus);

    // console.warn(bodyFormData);

    await axios.post('http://10.0.2.2:8080/report/app', bodyFormData, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    // console.log(report);
    ToastAndroid.show('Sucessfully Added', 1000);
    //props.navigation.navigate('ListReport');
  };
  const selectFile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    setReportdata(res.uri);
    setReportName(res.name);
    RNFetchBlob.fs
      .readFile(res.uri, 'base64')
      .then((data) => {
        setReportdata(data);
      })
      .catch((err) => {});
    //console.log('res : ' + JSON.stringify(res));
  };

  return (
    <View style={styles.mainBody}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.first}>
          <TextInput
            color="white"
            placeholder="Report No..."
            placeholderTextColor="#FCFCFC"
            onChangeText={(text) => setNo(text)}
          />
        </View>
        <View>
          <DatePicker
            style={{width: 200}}
            date={date}
            mode="date"
            placeholder="select date"
            placeholderTextColor="#000000"
            format="YYYY-MM-DD"
            minDate="2017-01-01"
            maxDate="2022-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
      </View>
      {/*Showing the data of selected Single file*/}

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStylee}
        activeOpacity={0.5}
        onPress={onSubmit}>
        <Text style={styles.buttonTextStyle}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  first: {
    backgroundColor: '#FFA621',
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#307ecc',
    width: 150,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 15,
  },
  buttonStyle: {
    backgroundColor: '#0682FD',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 15,
  },
  buttonStylee: {
    backgroundColor: '#0DD173',
    borderWidth: 0,
    color: '#FCFCFC',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default AppReport;
