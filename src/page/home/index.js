import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator
 } from 'react-native';
import {
  NavigationBar,
  Tab,
  Timepicker,
  BottomModal,
  Dialog,
  SlideModal,
  Button,
  Progress,
  Slider,
  Longlist
} from 'beeshell';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
     text: '' || '暂无数据',
     refreshing: false,
     isLoading: true,
     dataSource: []
    }
  }

  componentDidMount() {
    // https://m.douban.com/rexxar/api/v2/niffler/modules?for_mobile=1
    // https://facebook.github.io/react-native/movies.json
    return fetch('https://m.douban.com/rexxar/api/v2/niffler/modules?for_mobile=1')
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        
        this.setState({
          isLoading: false,
          dataSource: data.movies
        }, () => {
          console.log('设置数据成功');
        })
      })
    
  }

  _onRefresh() {
    console.log('下拉刷新...');
  }

  _getRef = (flatList) => {
    
    this._flatList = flatList;
    this._flatList.scrollToIndex({ viewPosition: 20, index: 0 });
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 200}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <NavigationBar
          title='首页'
          forwardLabel=''
          onPressBack={() => {
        }} />

        {/* <View>
          <TouchableOpacity 
            onPress={() => Alert.alert("你点击了按钮！")}
            activeOpacity={0.6}>
            <Image source={pic} style={{width: 193, height: 110}} />
          </TouchableOpacity>
          <Text>香蕉</Text>
          <TextInput style={{height: 40,paddingLeft: 20,backgroundColor:'#f9f9f9'}}
           placeholder={'请输入手机号'}
           onChangeText={(text) => {
             this.setState({ text })
           }} />
           <TouchableHighlight style={{backgroundColor: '#ff552e'}}
           underlayColor={'#DDDDDD'}
          //  onShowUnderlay={() => {alert('2')}}
          // hasTVPreferredFocus={true}
           onPress={() => {alert(this.state.text)}}>
              <Text style={{padding: 10, fontSize: 28}}>
              {this.state.text ? this.state.text : '暂无数据'}
              </Text>
           </TouchableHighlight>
        </View> */}
         <View style={{paddingTop:20}}>
          <FlatList
            // ref={this._getRef}
            data={this.state.dataSource}
            renderItem={({item}) => <Text style={{height: 50,lineHeight: 50,textAlign: 'center',backgroundColor: '#f9f9f9',marginBottom: 20}}>1</Text>}
            keyExtractor={(item, index) => item.id}
            onRefresh={() => {
              this.setState({
                  refreshing: true
              })
              setTimeout(() => {
                this.setState({
                  refreshing: false
                });
                alert('数据已加载完成');
              }, 2000)
            }}
            refreshing={this.state.refreshing}
            // getItemLayout={(params, index) => ({ length: 64, offset: 64 * index, index })}
          />
        </View>
        <View>
          {/* <SlideModal
              ref={c => {
                this.slideModal = c
              }}
              cancelable={true}
            >
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 4 }}>
              <View>
                <Text style={{ backgroundColor: '#fff' }}>sss</Text>
                <Text>内容比较简单，完全由用户自定义</Text>
              </View>
            </View>
          </SlideModal>
          <Button
            style={{marginTop: 20}}
            size='lg'
            type='danger'
            onPress={() => {
              this.slideModal.open()
            }}
            >基础</Button>
            <Progress
              easing={true}
              percent={100}
              barStyle={{ height: 3,marginTop: 30 }}
            />
            <Slider
              range
              max={1500}
              value={[500, 1000]}
              disabled={false}
              showTip={true}
            /> */}
            {/* <View style={styles.container}>
              <Longlist
               ref={c => {this._longlist = c}}
               data={this.state.list}
               renderItem={({ item, index }) => {
                 return (
                   <View style={styles.listItem}>
                     <Text style={styles.title}>{item.title}</Text>
                   </View>
                 )
               }}
               onEndReached={() => { // 上垃加载
                 console.log('obj')
               }}
               onRefresh={() => { // 下拉刷新
                 this._onRefresh();
               }}
              />
            </View> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  listItem: {
    height:50,
    backgroundColor:'#999',
    marginBottom: 20,
  },
  title: {
    lineHeight:50,
    color: '#fff',
    textAlign:'center',
  }
})
