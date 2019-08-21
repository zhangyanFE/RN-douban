import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../page/home/indexNew';
import SubScreen from '../page/subpage/index';
import DetailsScreen from '../page/detail/index';

// const HomeStack = createStackNavigator(
//     {
//       HomeScreen: {
//         screen: HomeScreen,
//       },
//     },
//     {
//       defaultNavigationOptions: {
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       },
//     }
//   );

const TabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    SubScreen: {
        screen: SubScreen,
        navigationOptions: ({ navigation }) => {
            title: '测试'
        }
    },
    DetailsScreen: {
        screen: DetailsScreen
    }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if(routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            } else if(routeName === 'Sub') {
                iconName = `ios-options`
            }
        }
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    }
}, {
    navigationOptions: null,
    initialRouteName: 'SubScreen'
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;

