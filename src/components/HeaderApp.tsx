import React, { Component } from 'react';
import {StyleSheet, TouchableHighlight, Text, Image, View } from 'react-native';
import { colors } from '../styles/colors'
import { Header } from 'react-native-elements';

export default class HeaderApp extends Component {
	constructor(props) {
		super(props);
	}

	backToHome() {
		this.props.navigation.navigate('Home')
	}

	render = () => {
	  return (
		  <Header
			  leftComponent={{ icon: 'menu', size: 40, ...styles.button}}
			  centerComponent={{ ...{text: this.props.title}, ...{style: styles.title} }}
			  rightComponent={{ icon: 'home', size: 40, ...styles.button, onPress: () => { this.backToHome()}}}
			  containerStyle={styles.header}
		  />
	  );
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: colors.darkBlue,
		justifyContent: 'space-around',
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.cyan
	},
	button: {
		color: colors.cyan
	},
	title: {
		fontFamily: "LatoBold",
		fontSize: 14,
		textTransform: "uppercase",
		color: colors.cyan,
		zIndex: 2,
		textAlign: "center",
		alignSelf: "stretch",
	}
})