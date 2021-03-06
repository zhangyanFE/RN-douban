import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Swipers extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const { list } = this.props;

        return (
            <Swiper 
                style={styles.wrapper} 
                autoplay={true}
                >
                {
                    list.map((item, index) => {
                        return (
                            <View key={index}>
                              <TouchableOpacity activeOpacity={0.9}>
                                <Image style={styles.banner} source={{uri: item.cover_url}} />
                              </TouchableOpacity>
                            </View>
                        )
                    })
                }
        </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        
    },
    banner: {
        height: 150
    }
})