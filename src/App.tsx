import { ChangeEvent, useDeferredValue, useState } from 'react';
import SplitFlapRow from './SplitFlapRow';
import './index.css';

const MAX_CHARACTER_COUNT = 120;
const DEFAULT_CHARACTERS_LIMIT = 20;
const ROW_COUNT = MAX_CHARACTER_COUNT / DEFAULT_CHARACTERS_LIMIT;

const getTextRows = (text: string) => {
	const reducer = (array: string[], word: string, index: number) => {
		if (index === 0) {
			array.push(word);
			return array;
		}

		const lastIndex = array.length - 1;
		const lastItem = array[lastIndex];
		const remainingChars = DEFAULT_CHARACTERS_LIMIT - lastItem.length;
		const tempString = `${lastItem} ${word}`;

		if (tempString?.length <= remainingChars) {
			array.splice(lastIndex, 1, tempString);
		} else {
			array.push(word);
		}

		return array;
	};

	return text.split(' ').reduce(reducer, []);
};

const renderSplitFlapRows = (textInput: string) => {
	const textRows = getTextRows(textInput);

	return Array.from({ length: ROW_COUNT }, (_, idx) => {
		return (
			<SplitFlapRow
				text={textRows[idx]}
				key={`row-${idx}`}
				keyProp={`row-${idx}`}
			/>
		);
	});
};

export default function App() {
	const [inputString, setInputString] = useState<string>(' ');
	const fullInput = useDeferredValue(inputString);

	const handleCharInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setInputString(value ?? ' ');
	};

	return (
		<div className="app">
			<section>{renderSplitFlapRows(fullInput)}</section>

			<input
				onChange={handleCharInput}
				value={inputString.trimStart()}
				maxLength={MAX_CHARACTER_COUNT}
			/>
		</div>
	);
}
