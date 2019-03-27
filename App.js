/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, ScrollView , Dimensions, ListView, Alert , TouchableHighlight , StatusBar , Image} from 'react-native';

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

const circleSize = 8;
const circleMargin = 5;

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      advertisements:[
        {
          imageUrl:'https://yaotao1995.github.io/assets/blogImg/images.jpeg',
        },  {
          imageUrl:'https://yaotao1995.github.io/assets/blogImg/images.jpeg',
        },  {
          imageUrl:'https://yaotao1995.github.io/assets/blogImg/images.jpeg',
        }],
      currentPage: 0,
      searchText: '',
      dataSource: ds.cloneWithRows([
        {
            image: require('./images/head.png'),
            title:'商品1',
            subTitle:'描述1'
        },{
            image: require('./images/head.png'),
            title:'商品1',
            subTitle:'描述1'
        },{
            image: require('./images/head.png'),
            title:'商品1',
            subTitle:'描述1'
        }
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
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
    const left = (Dimensions.get('window').width = indicatorWidth) / 2;

    return (
      <View style={styles.container}>
      <StatusBar backgroundColor={'blue'}
        barStyle={'default'}
        networkActivityIndicatorVissible={true}
      ></StatusBar>
        <View style={styles.searchbar}>
          <TextInput style={styles.mInput} placeholder='搜索框' onChangeText={(text) => {
              this.setState({searchText: text});
              }}></TextInput>
          <Button style={styles.mButton} title='搜索' onPress={() => Alert.alert('你单机了搜索按钮' + this.state.searchText,null,null)}> </Button>
        </View>

        <View style={styles.lunbotu}>
          <View style={styles.advertisementContent}>
          <ScrollView ref="scrollView" horizontal={true} showHorizontalScrollIndicator={false} pagingEnabled={true}>
            {this.state.advertisements.map((advertisement ,index) =>{
              return (
                <TouchableHighlight key={index} onPress={() => Alert.alert('你单机了轮播图',null,null)}>
                  <Image
                    style={styles.advertisementContent}
                    source={{uri: advertisement.imageUrl}}
                  ></Image>
                  </TouchableHighlight>
                );
              })}
          </ScrollView>
            <View style={[
                styles.indicator,{
                  left: left
                }
              ]}>

              {this.state.advertisements.map((advertisement , index) => {
                  return (<View key={index} style={ (index === this.state.currentPage) ? styles.circleSelected : styles.circle}/>
                        );
              })}


            </View>


          </View>
        </View>

        <View style={styles.listStyle}>
          <ListView dataSource={this.state.dataSource} renderRow={this._randerRow} />
        </View>

      </View>
    );
  }
  _randerRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight onPress={() => Alert.alert('你单机了商品',null,null)}>
        <View style={styles.row}>
          <Image source={rowData.image} style={styles.productImage} ></Image>

          <View style={styles.productText}>
          <Text style={styles.productTitle}>{rowData.title}</Text>
          <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
          </View>

        </View>
        </TouchableHighlight>
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
      borderRadius:10
    },
    mButton: {
      flex:1,
    },
    listStyle: {
      flex:1,
    },
    row: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center'
    },
    productImage:{
      marginLeft:10,
      width: 40,
      height: 40,
    },
    productText:{
      flex: 1,
      marginLeft: 10,
      marginTop: 10,
      marginBottom:10
    },
    productTitle:{
      flex: 3,
      fontSize: 16,
    },
    productSubTitle:{
        flex: 2,
        fontSize: 14,
        color: 'gray'
    },
    advertisementContent: {
      width:Dimensions.get('window').width,
      height:180,
    },
    indicator: {
      position: 'absolute',
      top:160,
      flexDirection:'row'
    },
    indicator: {
      position: 'absolute',
      top:160,
      flexDirection:'row'
    },
    circle: {
        width: circleSize,
        height:circleSize,
        borderRadius: circleSize / 2,
        marginHorizontal: circleMargin,
    },
    circleSelected: {
        width: circleSize,
        height:circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: 'white',
        marginHorizontal: circleMargin,
    }
});
