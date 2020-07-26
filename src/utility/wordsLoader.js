import axios from 'axios';
import seWordsFilePath from 'url:~/src/data/words_se.txt';
import enWordsFilePath from 'url:~/src/data/words_en.txt';

export const WORD_MAX_LENGTH = 'word_max_length';
export const WORD_MIN_LENGTH = 'word_min_length';
export const INCLUDE_REG = 'include_reg';
export const EXCLUDE_REG = 'exclude_reg';

export const availableFilters = [
	{
		name: 'Max word length',
		id: WORD_MAX_LENGTH,
		type: 'number'
	},
	{
		name: 'Min word length',
		id: WORD_MIN_LENGTH,
		type: 'number'
	},
	{
		name: 'Include',
		id: INCLUDE_REG,
		type: 'regex'
	},
	{
		name: 'Exclude',
		id: EXCLUDE_REG,
		type: 'regex'
	}
];

export const availableWordLists = [
	{
		name: 'Swedish word list',
		path: seWordsFilePath
	},
	{
		name: 'English word list',
		path: enWordsFilePath
	}
];

class WordsLoader {

	lastSettings = [];

	maxWordLength = -1;

	// All available words
	words = [];

	async load(wordsFilePath) {
		const { data: wordFile } = await axios.get(wordsFilePath);
		this.words = wordFile.split('\n');

		// Set word info.. like max word length
		this.maxWordLength = this.words.reduce((prev, item) => {
			return prev > item.length ? prev : item.length;
		}, 0);
	}

	async getWords(settings) {

		if(!settings) {
			settings = this.lastSettings;
		}

		this.lastSettings = settings;

		return await Promise.reduce(settings, (prev, setting) => {
			const {
				filterType,
				value
			} = setting;

			try {
				new RegExp(value);
			} catch (e) {
				return prev;
			}

			return Promise.filter(prev, word => this.runFilter(word, filterType, value));

		}, this.words);
	}

	runFilter(word, filterType, filterValue) {
		switch(filterType) {
			case WORD_MAX_LENGTH:
				return word.length <= Number(filterValue);
			case WORD_MIN_LENGTH:
				return word.length >= Number(filterValue);
			case INCLUDE_REG:
				return !!word.match(new RegExp(filterValue, 'i'));
			case EXCLUDE_REG:
				return !word.match(new RegExp(filterValue, 'i'));
			default:
				return false;
		}
	}
}

export default new WordsLoader();
