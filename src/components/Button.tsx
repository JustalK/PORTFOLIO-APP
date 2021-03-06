import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ButtonProps } from '../interfaces/Button';
import { Icon } from 'react-native-elements';
import { colors } from '../styles/colors';

/**
*
**/
export default class Button extends Component<ButtonProps, never> {

	/**
	* Check if the index is even
	* @params {number} n The number
	**/
	checkIndexIsEven(n: number): boolean {
		return n % 2 == 0;
	}

	/**
	* The function for switching tabs and loading the project in the zoom tab
	* @params {string} id The id of the project
	**/
	zoomProject(id: string): void {
		this.props.updateIdProject(id);
		this.props.jumpTo('project');
	}

	/**
	* Display the button
	* @return {JSX.Element} Display the button
	**/
	render(): JSX.Element {
		return (
			<TouchableOpacity onPress={() => this.zoomProject(this.props.idProject)}>
				<View
					style={[
						styles.button,
						{
							backgroundColor: this.checkIndexIsEven(this.props.index)
								? colors.clearBlue
								: colors.darkBlue,
						},
					]}
				>
					<Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
					<Icon name="chevron-right" type="evilicon" color={colors.white} />
				</View>
			</TouchableOpacity>
		);
	}
}

/**
* Create the custom style for the button
**/
const styles = StyleSheet.create({
	button: {
		borderRadius: 0,
		backgroundColor: colors.cyan,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'LatoLight',
		textTransform: 'capitalize',
		color: colors.white,
		lineHeight: 40,
	},
});
