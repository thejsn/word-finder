import React, { Component } from 'react';
import Header from '../Header';
import Result from '../Result';

import wordsLoader from '../../utility/wordsLoader';

import './index.scss';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.handleSettingsChange = this.handleSettingsChange.bind(this);
		this.handleSelectWordList = this.handleSelectWordList.bind(this);

		this.state = {
			loadStatus: 'idle',
			currentWordList: '',
			words: [],

			// Words info
			maxWordLength: 0
		};
	}

	async handleSettingsChange(settings) {
		const words = await wordsLoader.getWords(settings);
		this.setState({ words });
	}

	async handleSelectWordList(wordList) {

		this.setState({
			loadStatus: 'pending'
		});

		await wordsLoader.load(wordList);
		const words = await wordsLoader.getWords();

		this.setState({
			loadStatus: 'ready',
			maxWordLength: wordsLoader.maxWordLength,
			wordCount: wordsLoader.words.length,
			currentWordList: wordList,
			words
		});
	}

	render() {
		return (
			<Container>
				<Header
					currentWordList={ this.state.currentWordList }
					onSelectWordList={ this.handleSelectWordList }
					onSettingsChange={ this.handleSettingsChange } />

				{ this.state.loadStatus === 'pending' ? (
					<div className="load-pending">
						<div className="loader" />
					</div>
				) : null }
				
				{ this.state.loadStatus === 'ready' ? (
					<Result
						values={ this.state.words }
						wordCount={ this.state.wordCount }
					/>
				) : null }
			</Container>
		)
	}
}

const Container = ({ children }) => (
	<div>
		{ children }
	</div>
);
