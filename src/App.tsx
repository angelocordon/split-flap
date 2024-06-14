import { ChangeEvent, useDeferredValue, useState } from 'react';
import SplitFlap from './SplitFlap';
import './index.css';

const MAX_FLAP_COUNT = 60;

const generateSplitRows = (textString: string) => {
	const characters = textString.split('');

	return Array.from({ length: MAX_FLAP_COUNT }, (_, idx) => (
		<SplitFlap key={idx} char={characters[idx]} />
	));
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
			<div className="split-row">{generateSplitRows(fullInput)}</div>

			<input
				onChange={handleCharInput}
				value={inputString.trimStart()}
				maxLength={MAX_FLAP_COUNT}
			/>
		</div>
	);
}
