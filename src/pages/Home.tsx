import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../styles/colors';
import { styleMain } from '../styles/main';
import BlinkingEffect from '../components/BlinkingEffect';
import WritingEffect from '../components/WritingEffect';
import Loading from '../components/Loading';
import profileImg from '../../assets/me.jpeg';
import { HomeProps, HomeStates } from '../interfaces/Home';
import ApiContact from '../services/ApiContact';
import ApiJob from '../services/ApiJob';

/**
* Display the home of the app
* @params {HomeProps} props The navigation informations
* @return {JSX.Element} Display the home of the app
**/
export default class Home extends Component<HomeProps, HomeStates> {

	/**
	* The constructor and initializer of the state
	* @params {HomeProps} props The navigation informations
	**/
	constructor(props: HomeProps) {
		super(props);
		this.state = {
			fullname: '',
			email: '',
			jobs: [''],
			loading: true,
		};
	}

	/**
	* When the component is mounted, this method is called once
	* Load the identity and the jobs for the display
	**/
	async componentDidMount(): Promise<void> {
		const identity = await ApiContact.getMyContact();
		const jobs = await ApiJob.getJobs();
		const jobs_title = jobs.map((job) => job.title);
		this.setState({
			fullname: identity.fullname,
			email: identity.email,
			jobs: jobs_title,
			loading: false,
		});
	}

	/**
	* Render the home screen once the informations are loaded
	* @params {JSX.Element} Display the home
	**/
	renderHome(): JSX.Element {
		return (
			<View>
				<Image style={styles.portrait} source={profileImg} />
				<Text style={styles.textStyle}>Hello World, I'm <Text style={styles.fullname}>{this.state.fullname}</Text></Text>
				<WritingEffect style={styles.textStyle} predata="I'm a" data={this.state.jobs}></WritingEffect>
				<Text style={styles.textStyle}>For inquiries, contact me at {this.state.email}</Text>
				<BlinkingEffect>
					<Text style={styles.intructions}>Press the screen</Text>
				</BlinkingEffect>
			</View>
		);
	}

	/**
	* Display the home or the loading screen
	* return {JSX.Element} Display the home
	**/
	render(): JSX.Element {
		return (
			<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('JustalK')}>
				<View style={styleMain.homeContainer}>
					{this.state.loading && (<Loading isScreen={true} />)}
					{!this.state.loading && this.renderHome()}
					<StatusBar style="auto" hidden />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

/**
* Create the custom style for the home
**/
const styles = StyleSheet.create({
	textStyle: {
		margin: 0,
		fontSize: 18,
		fontFamily: 'LatoLight',
		textAlign: 'center',
		color: colors.cyan,
	},
	fullname: {
		textTransform: 'capitalize'
	},
	portrait: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginBottom: 50,
		borderRadius: 200,
		borderWidth: 1,
		borderColor: colors.cyan,
	},
	intructions: {
		marginTop: 100,
		textAlign: 'center',
		fontFamily: 'LatoLight',
		fontSize: 14,
		color: colors.white,
		textTransform: 'uppercase',
	},
});
