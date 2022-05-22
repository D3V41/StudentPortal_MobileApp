import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, ToastAndroid} from 'react-native';
import Pdf from 'react-native-pdf';

class ShowReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            color: '#77b5fe',
            marginBottom: 10,
          }}>
          {this.props.route.params.name}
        </Text>
        <Pdf
          source={this.props.route.params.source}
          onLoadComplete={(numberOfPages, filePath) => {
            ToastAndroid.show(
              `number of pages: ${numberOfPages}`,
              ToastAndroid.SHORT,
            );
          }}
          onPageChanged={(page, numberOfPages) => {
            ToastAndroid.show(`current page: ${page}`, ToastAndroid.SHORT);
          }}
          onError={(error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ShowReport;
