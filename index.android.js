import React, { Component } from 'react';
import {
    AppRegistry,
    BackAndroid,
    Navigator
} from 'react-native';
import DetailPage from './detailPage'
import MainPage from './mainPage'

var _navigator;

var reactFootball = React.createClass({
    navigatorRenderScene: function(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'main':
                return (
                    <MainPage navigator={navigator} />
                );
            break;
            case 'detail':
                return (
                    <DetailPage navigator={navigator} data={route.data} />
                );
            break;
        }
    },

    render: function() {
        return (
            <Navigator
                initialRoute={{id: 'main'}}
                renderScene={this.navigatorRenderScene}/>
        );
    },

});

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
    }
    _navigator.pop();
    return true;
});

AppRegistry.registerComponent('reactFootball', () => reactFootball);
