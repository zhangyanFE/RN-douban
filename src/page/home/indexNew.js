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
  ActivityIndicator,
  ScrollView,
  RefreshControl,
 } from 'react-native';
import { NavigationBar } from 'beeshell';

import Swipers from './component/swiper';
import SwiperList from './component/swiperList';
import Scroller from './component/scroller';
import ScrollerBanner from './component/scrollerBanner';

export default class Home extends Component {  
  constructor(props) {
    super(props)

    this.state = {
     text: '' || '暂无数据',
     refreshing: false,
     isLoading: true,
     isRefresh: false, // 下拉刷新
     isLoadMore: false, // 加载更多
     showFoot: 1, // 控制foot  1：正在加载   2 ：无更多数据
     modules: [], // 数据结构
    }
  }

  componentDidMount() {
    this._getListData();
  }

  // 获取数据
  _getListData() {
    return fetch('https://m.douban.com/rexxar/api/v2/niffler/modules?for_mobile=1')
      .then((res) => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          modules: data.modules,
        }, () => {
          // console.log(this.state.dataSource);
        })
      })
  }

  // 头部组件
  _createListHeader(modules) {
    const { navigate } = this.props.navigation;
    return (
        <View>
          {
            modules && modules.length && modules.map((item, index) => {
              switch (item.type) {
                // banner轮播
                case 'banner':
                  return (
                      <View style={styles.bannerBox} key={index}>
                        <Swipers list={item.items} navigate={navigate} />
                      </View>
                  );
                case 'collection':
                  // 今日特惠
                  return (
                    <View style={styles.specialOffer} key={index}>
                      <Text style={styles.specialTitle}>{item.title}</Text>
                      <View>
                        <SwiperList list={item.items} />
                      </View>
                    </View>
                  );
                case 'topic':
                  // 时间大本营
                  return (
                    <View style={styles.timeTopic} key={index}>
                      <Text style={styles.specialTitle}>{item.title}</Text>
                      <Scroller list={item.items}/>
                    </View>
                  );
                case 'ad':
                  // 广告
                  return (
                    <View style={styles.adPos} key={index}>
                      <ScrollerBanner list={item.items}/>
                    </View>
                  );
                case 'column':
                  // 商品楼层
                  return (
                      <View style={styles.columnBox} key={index}>
                          <Text style={styles.columnTitle}>{item.title}</Text>
                          <View style={styles.columnInfo}>
                            <View style={styles.columnLeftInfo}>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.columnLeftInfoImg} source={{uri:item.profile_cover_url}} />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.columnRightInfo}>
                              <TouchableOpacity activeOpacity={0.8}>
                                <View style={styles.columnRightInfoDesc}>
                                  <Text style={styles.columnInfoTitle}>{item.column_title}</Text>
                                  <Text style={styles.columnInfoPrice}>{item.discount_price}元</Text>
                                  <Text style={styles.columnOldPrice}>{item.price}元</Text>
                                </View>
                                <View>
                                  <Text style={styles.speaker}>主讲人 {item.authors[0].name}</Text>
                                </View>
                                <View>
                                  <Text numberOfLines={1} style={styles.shortIntro}>{item.short_intro}</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                    );
                default:
                  break;
              }
            })
          }
        </View>
    );
  }
  
  // 下拉刷新
  _onRefresh() {
    if(!this.state.isRefresh) {
      console.log('_onRefresh');
      this._getListData();
    }
  }

  render() {
    const { modules, isRefresh } = this.state;
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 200}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <FlatList
          scrollToIndex={1}
          ListHeaderComponent={() => this._createListHeader(modules)}
          refreshing={isRefresh}
          // onRefresh={() => this._onRefresh()}
          refreshControl={
            <RefreshControl
              title={'下拉刷新'}
              colors={['#999']}
              tintColor={'#999'}
              refreshing={isRefresh}
              onRefresh={
                () => {
                  this._onRefresh();
                }
              }
            />
          }
          onEndReachedThreshold={0.1}
          keyExtractor={1}
          />
        {/* <NavigationBar
          title='首页'
          forwardLabel=''
          onPressBack={() => {
        }} /> */}
        {/* <ScrollView
            // 属性为true的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列
            horizontal={false}
            // 属性为true的时候，显示一个垂直方向的滚动条
            showsVerticalScrollIndicator={true}
            >
        </ScrollView> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bannerBox: {
      height: 150,
  },
  columnBox: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  columnTitle: {
    fontSize: 19,
    color: '#333',
    paddingTop: 10,
  },
  columnInfo: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: 15
  },
  columnLeftInfo: {
    width: 100,
    height: 100,
    backgroundColor: '#f9f9f9',
    marginRight: 15,
  },
  columnRightInfo: {
    height: 100,
  },
  columnLeftInfoImg: {
    width: 100,
    height: 100,
    borderRadius: 3
  },
  columnRightInfoDesc: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  columnInfoTitle: {
    width: 190,
    height: 40,
    lineHeight: 18,
    fontSize: 15,
    color: '#191919',
    marginBottom: 15,
  },
  columnInfoPrice: {
    paddingTop: 2,
    color: '#f97927',
    fontSize: 13
  },
  columnOldPrice: {
    color: '#ccc',
    fontSize: 11,
    textDecorationLine: 'line-through',
    position: 'relative',
    right: 35,
    top: 30,
  },
  shortIntro: {
    width: 230,
    fontSize: 11,
    color: '#818181',
    paddingTop: 15,
  },
  speaker: {
    color: '#818181',
    fontSize: 13,
  },
  specialOffer: {
    paddingLeft: 15,
    // paddingRight: 15
  },
  specialTitle: {
    fontSize: 19,
    color: '#333',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  timeTopic: {
    paddingLeft: 15,
  },
  adPos: {
    paddingLeft: 15
  }
})
