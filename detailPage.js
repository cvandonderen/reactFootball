import React, { Component } from 'react';
import {
    ListView,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Config from './config'

var DetailPage = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            isLoading: true,
        };
    },

    fetchActions: function() {
        fetch("http://pads6.pa-sport.com/api/football/match/actions/" + Config.API_KEY + "/" + this.props.data['@matchID'] + "/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            var homeTeamId = responseData.matchActions.teams.homeTeam['@teamID'];
            var actions = responseData.matchActions.actions.action;
            var actionLookupTable = [];
            var actionData = [];

            for (var action of actions) {
                var actionIndex = actionLookupTable.indexOf(action.eventType);
                if (actionIndex === -1) {
                    var newAction = {
                        eventType: action.eventType,
                        home: action['@teamID'] === homeTeamId ? 1 : 0,
                        away: action['@teamID'] === homeTeamId ? 0 : 1
                    }
                    actionLookupTable.push(action.eventType);
                    actionData.push(newAction);
                } else {
                    action['@teamID'] === homeTeamId ? actionData[actionIndex].home++ : actionData[actionIndex].away++;
                }
            }

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(actionData),
                isLoading: false
            });
        })
        .catch((error) => console.log(error))
        .done();
    },

    render: function() {
        if (this.state.isLoading) {
            return this.renderInitialLoad();
        }

        return (
            <ListView
            dataSource={this.state.dataSource}
            renderHeader={this.renderCompetitors}
            renderRow={this.renderAction} />
        );
    },

    renderAction: function(action) {
        return (
            <View style={styles.action}>
                <Text style={styles.score}>
                    {action.home}
                </Text>
                <Text>
                    {action.eventType}
                </Text>
                <Text style={styles.score}>
                    {action.away}
                </Text>
            </View>
        );
    },

    renderCompetitors: function() {
        return (
            <Text style={styles.header}>
                {this.props.data.homeTeam.teamName} - {this.props.data.awayTeam.teamName}
            </Text>
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
    action: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    header: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    score: {
        fontSize: 18
    },
});

module.exports = DetailPage;
