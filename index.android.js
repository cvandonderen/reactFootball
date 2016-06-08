import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
import DetailPage from './detailPage'
import MainPage from './mainPage'

var reactFootball = React.createClass({
    navigatorRenderScene: function(route, navigator) {
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
    }
});

AppRegistry.registerComponent('reactFootball', () => reactFootball);
