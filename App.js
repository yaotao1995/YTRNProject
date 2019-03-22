/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, ScrollView , Dimensions, ListView, Alert} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows([
        '商品1',
        '商品2',
        '商品3',
        '商品4',
        '商品5',
        '商品6',
        '商品7',
        '商品8',
        '商品9',
        '商品10'
        ])
    };
  }
  componentDidMount(){
    this._startTimer();
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  _startTimer() {
    this.interval = setInterval( ()=>{
        nextPage = this.state.currentPage + 1;
        if(nextPage >= 2){
          nextPage = 0;
        }
        this.setState({currentPage: nextPage});
        const offSetX = nextPage + Dimensions.get('window').width;
        this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0 ,animated: true});
      }, 2000);
    }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.searchbar}>
          <TextInput style={styles.mInput} placeholder='搜索框'> </TextInput>
          <Button style={styles.mButton} title='搜索' onPress={() => Alert.alert('你单机了搜索按钮',null,null)}> </Button>
        </View>

        <View style={styles.lunbotu}>
          <ScrollView ref="scrollView" horizontal={true} showHorizontalScrollIndicator={false} pagingEnabled={true}>
            <Text style={{
                    width:Dimensions.get('window').width,
                    height:180,
                    backgroundColor:'gray'
                    }}>
              广告1
            </Text>
            <Text style={{
                    width:Dimensions.get('window').width,
                    height:180,
                    backgroundColor:'orange'
                    }}>
              广告2
            </Text>
            <Text style={{
                    width:Dimensions.get('window').width,
                    height:180,
                    backgroundColor:'yellow'
                    }}>
              广告3
            </Text>
          </ScrollView>
        </View>

        <View style={styles.listStyle}>
          <ListView dataSource={this.state.dataSource} renderRow={this._randerRow} />
        </View>

      </View>
    );
  }
  _randerRow = (rowData, sectionID, rowID) => {
    return (
        <View style={styles.row}>
          <Text>{rowData}</Text>
        </View>
      );
  }


}



const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    searchbar: {
      marginTop: Platform.OS === 'ios' ? 60 : 20,
      height:40,
      backgroundColor:'red',
      flexDirection:'row'
    },
    lunbotu: {
      height:180,
      backgroundColor:'white',
    },
    listStyle: {
      flex:1,
      backgroundColor:'blue',
      justifyContent:'center',
      alignItems:'center',
    },
    mInput: {
      flex:1,
      backgroundColor:'gray',
      borderWidth:2,
    },
    mButton: {
      flex:1,
    },
    listStyle: {
      flex:1,
    },
    row: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
});
