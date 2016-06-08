import React, { Component } from 'react';
import {
    ProgressBarAndroid,
    StyleSheet,
    View
} from 'react-native';
import Config from './config'

var DetailPage = React.createClass({
    getInitialState: function() {
        return {
            isLoading: true,
        };
    },

    fetchActions: function() {
        fetch("http://pads6.pa-sport.com/api/football/match/actions/" + Config.API_KEY + "/" + this.props.data['@matchID'] + "/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            // Generate match details here.
        })
        .catch((error) => console.log(error))
        .done();
    },

    render: function() {
        if (this.state.isLoading) {
            return this.renderInitialLoad();
        }

        return (
            <View />
        );
    },

    renderInitialLoad: function() {
        return (
            <View style={styles.loading}>
                <ProgressBarAndroid styleAttr="Normal" />
            </View>
        );
    },

    componentWillMount: function() {
        this.fetchActions();
    }
});

var styles = StyleSheet.create({
});

module.exports = DetailPage;
