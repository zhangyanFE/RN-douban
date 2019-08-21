import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
// import Swiper from 'react-native-swiper';

export default class Swipers extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const { list } = this.props;
        return (
            <ScrollView
                horizontal={true} // 设置横向滚动
                showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条
                automaticallyAdjustContentInsets={false}
                onMomentumScrollEnd={(e)=>console.log(e)}
                style={styles.wrapper}
                >
                {
                    list.map((item, index) => {
                        return (
                            <View key={index} style={styles.listItem}>
                              <TouchableOpacity activeOpacity={0.8}>
                                <Image style={styles.listImg} source={{uri: item.cover_url}} />
                                <Text numberOfLines={2} style={styles.listTitle}>{item.title}</Text>
                                {
                                    item.discount_price != null && (
                                        <View>
                                            <Text style={styles.listDiscountPrice}>{item.discount_price}元</Text>
                                            <Text style={styles.listPrice}>{item.price}元</Text>
                                        </View>
                                    )
                                }
                                {
                                    item.discount_price == null && <Text style={styles.listDiscountPrice}>{item.price}元</Text>
                                }
                              </TouchableOpacity>
                            </View>
                        )
                    })
                }
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'visible',
    },
    listItem: {
        width: 108,
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    listImg: {
        width: 108,
        height: 108,
        borderRadius: 3,
    },
    listTitle: {
        fontSize: 15,
        color: '#191919',
        paddingTop: 10,
        paddingBottom: 10,
    },
    listDiscountPrice: {
        fontSize: 13,
        color: '#f97927',
        paddingBottom: 5,
        fontWeight: '700',
        lineHeight: 16
    },
    listPrice: {
        fontSize: 11,
        color: '#ccc',
        textDecorationLine: 'line-through',
        paddingBottom: 10
    }
})