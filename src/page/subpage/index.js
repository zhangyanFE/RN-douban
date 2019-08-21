import React, { Component } from 'react';
import { View, Text, WebView, StyleSheet } from 'react-native';
import { NavigationBar } from 'beeshell';

export default class SubPage extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        this.title = 'Sub'

        this.name = '张岩';
    }

    componentDidMount() {
        console.log('初始化')
    }

    render() {
        const { navigation, navigate } = this.props;
        const { item } = this.props.navigation.state.params;
        console.log(item.sharing_url)
        return (
            <View>
                <NavigationBar
                    style={styles.navBar}
                    title={this.title}
                    forwardLabel=''
                    onPressBack={() => {
                        navigation.goBack()
                    }} />
                <WebView
                   source={{uri: JSON.stringify(item.sharing_url)}}
                   originWhitelist={'*'}
                />
                <Text>{JSON.stringify(item.sharing_url)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        marginTop: 44
    }
})