import React, { Component } from 'react';
import {
    ListView,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Config from './config'

var MainPage = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            isLoading: true,
        };
    },

    fetchMatches: function() {
        fetch("http://pads6.pa-sport.com/api/football/competitions/matchDay/" + Config.API_KEY + "/20160508/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.matches.match),
                isLoading: false
            });
        })
        .catch((error) => console.log(error))
        .done();
    },

    openMatchDetails: function(match) {
        this.props.navigator.push({
            id: 'detail',
            data: match
        })
    },

    render: function() {
        if (this.state.isLoading) {
            return this.renderInitialLoad();
        }

        return (
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMatch} />
        );
    },

    renderInitialLoad: function() {
        return (
            <View style={styles.loading}>
                <ProgressBarAndroid styleAttr="Normal" />
            </View>
        );
    },

    renderMatch: function(match) {
        return (
            <TouchableHighlight onPress={() => this.openMatchDetails(match)}>
                <View style={styles.match}>
                    <Text style={styles.homeTeamName}>
                        {match.homeTeam.teamName}
                    </Text>
                    <View style={styles.scores}>
                        <Text style={styles.score}>
                            {match.homeTeam.score}
                        </Text>
                        <Text>-</Text>
                        <Text style={styles.score}>
                            {match.awayTeam.score}
                        </Text>
                    </View>
                    <Text style={styles.awayTeamName}>
                        {match.awayTeam.teamName}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    },

    componentWillMount: function() {
        this.fetchMatches();
    }
});

var styles = StyleSheet.create({
    awayTeamName: {
        flex: 4,
        textAlign: 'right'
    },

    homeTeamName: {
        flex: 4
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    match: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    score: {
        fontSize: 18
    },

    scores: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

module.exports = MainPage;
