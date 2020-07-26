import React, { useState, useEffect } from 'react';
import './index.scss';

export default ({ values, wordCount }) => {

	const pageSize = 100;
	const [page, setPage] = useState(0);
	const [currentValues, setCurrentValues] = useState([]);

	useEffect(() => {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
		setCurrentValues(values.slice(startIndex, endIndex));

		return () => {
			// cleanup?
		}
	}, [page, values]);

	useEffect(() => {
		setPage(0);
	}, [values]);

	return (
		<div className="result">
			{ wordCount ? (
				<p className="note">
					Filtered <strong>{ values.length }</strong> words from <strong>{ wordCount }</strong> available.
				</p>
			) : (
				<p className="note">
					No word list loaded yet.
				</p>
			) }

			<Pagination
				visible={ values.length > pageSize }
				page={ page }
				numPages={ Math.ceil(values.length / pageSize) }
				setPage={ setPage }
			/>

			<ol start={ page * pageSize + 1 }>
				{ currentValues.map(value => (
					<li key={ value }>
						<div className="list-item">
							<span>
								{ value }
							</span>
							<span>
								<a href={'https://en.wiktionary.org/wiki/' + value } target="_blank">
									<i className="fas fa-book"></i>
								</a>
							</span>
						</div>
					</li>
				)) }
			</ol>

			<Pagination
				visible={ values.length > pageSize }
				page={ page }
				numPages={ Math.ceil(values.length / pageSize) }
				setPage={ setPage }
			/>
		</div>
	)
}

const Pagination = ({ visible, page, numPages, setPage }) => (
	 visible ? (
		<div className="pagination">
			<button onClick={ () => setPage(page - 1)} disabled={ page < 1 }>prev</button>

			<span className="pagination__pages">
				Showing page { page + 1 } of { numPages }
			</span>

			<button onClick={ () => setPage(page + 1)} disabled={ page >= numPages - 1 }>next</button>
		</div>
	) : null
);
