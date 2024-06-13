import { ChangeEvent, useState, useRef } from 'react';
import SplitFlap from './SplitFlap';
import './index.css';

export default function App() {
	const [inputChar, setInputChar] = useState<string>(' ');
	const previousChar = useRef<string>(' ');

	const handleCharInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setInputChar((prevValue) => {
			previousChar.current = prevValue;

			return value[value.length - 1] || ' ';
		});
	};

	return (
		<div className="app">
			<SplitFlap previousChar={previousChar.current} char={inputChar} />

			<div className="input">
				<input value={inputChar} onChange={handleCharInput} />
			</div>
		</div>
	);
}
