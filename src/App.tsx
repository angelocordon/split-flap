import { ChangeEvent, useState } from 'react';
import SplitFlap from './SplitFlap';
import './index.css';

export default function App() {
	const [inputChar, setInputChar] = useState<string>(' ');

	const handleCharInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		if (value === '') setInputChar(' ');
		setInputChar(value[value.length - 1]);
	};

	return (
		<div className="app">
			<SplitFlap char={inputChar} />

			<div className="input">
				<input onChange={handleCharInput} value={inputChar} />
			</div>
		</div>
	);
}
