/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Config from './config'

var reactFootball = React.createClass({
    getInitialState: function() {
        return {
            isLoading:true
        };
    },

    fetchMatches: function() {
        fetch("http://pads6.pa-sport.com/api/football/competitions/matchDay/" + Config.API_KEY + "/20160508/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            console.log(JSON.stringify(responseData.matches));
        })
        .catch((error) => console.log(error))
        .done();
    },

    render: function() {
        if (this.state.isLoading) {
            return this.renderInitialLoad();
        }

        return (
            <View>

            </View>
        );
    },

    renderInitialLoad: function() {
        return (
            <View>
                <ProgressBarAndroid styleAttr="Normal" />
            </View>
        )
    },

    componentWillMount: function() {
        this.fetchMatches();
    }
});

var styles = StyleSheet.create({});

AppRegistry.registerComponent('reactFootball', () => reactFootball);
