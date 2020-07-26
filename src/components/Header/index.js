import React, { useState } from 'react';
import { availableFilters , availableWordLists } from '../../utility/wordsLoader';
import './index.scss';

export default ({ currentWordList, onSettingsChange, onSelectWordList }) => {

	const [filters, setFilters] = useState([]);

	const handleAddFilter = (e) => {
		const filter = e.target.value;

		if(filter) {
			const rand = Math.random() * 1023 + 1;
			const filterType = availableFilters.find(item => item.id === filter);
			
			setFilters([...filters, {
				inputType: filterType.type,
				filterType: filterType.id,
				id: `filter_${ rand.toString(16) }`,
				name: filterType.name,
				value: ''
			}]);
		}
	}

	const handleUpdateFilter = (id, value) => {
		const updated = filters.map(filter => (
			filter.id === id ? { ...filter, value } : filter
		));
		
		setFilters(updated);
		onSettingsChange(updated.slice());
	}

	const handleRemoveFilter = (id) => {
		const updated = filters.filter(filter => filter.id !== id);

		setFilters(updated);
		onSettingsChange(updated.slice());
	}

	const handleSelectList = path => {
		onSelectWordList(path);
	}

	return (
		<div className="header">

			<div className="word-list-select">
				{ availableWordLists.map(list => (
					<button key={ list.path } onClick={ () => handleSelectList(list.path) }>
						<span>{ list.name }</span>
						{ currentWordList === list.path ? (
							<i className="fas fa-check" />
						) : null }
					</button>
				)) }

				
			</div>

			<div className="filter-picker">
				<select value="" onChange={ handleAddFilter }>
					<option value="">Add filter</option>
					{ availableFilters.map(filter => (
						<option key={ filter.id } value={ filter.id }>{ filter.name }</option>
					)) }
				</select>

				<i className="icon fas fa-plus" />
			</div>

			<div className="filter-list">
				{ filters.map(({ id, name, value, inputType }) => (
					<Filter
						key={ id }
						id={ id }
						label={ name }
						inputType={ inputType }
						onDelete={ handleRemoveFilter }
						onChange={ handleUpdateFilter }
						value={ value }
					/>
				)) }
			</div>
		</div>
	)
}

const Filter = ({ label, id, onDelete, onChange, value, inputType }) => {

	const changedValue = e => {
		onChange(id, e.target.value);
	};

	return (
		<div className="filter">
			<div className="filter__label">{ label }</div>
			<div className="filter__content">
				<input type={ inputType } value={ value } onChange={ changedValue } />
				<button onClick={ () => onDelete(id) }>
					<i className="fas fa-minus-circle" />
				</button>
			</div>
		</div>
	)
}
