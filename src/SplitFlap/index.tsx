import { useState, useRef } from 'react';
import { CHARACTERS } from './constants';
import './style.css';

const CHARS_ENDING_IDX = CHARACTERS.length - 1;

const charIdx = (char: string) => CHARACTERS.indexOf(char.toUpperCase());
const charFromIdx = (idx: number) => CHARACTERS[idx];

export default function SplitFlap({ char = ' ' }: { char?: string }) {
	const tickInterval = useRef<ReturnType<typeof setInterval>>();
	const [currentChar, setCurrentChar] = useState<string>(' ');

	const atEnd = () => {
		return charIdx(currentChar) === CHARS_ENDING_IDX;
	};

	const tickToTargetChar = () => {
		if (currentChar === char.toUpperCase()) {
			clearInterval(tickInterval.current);
			return;
		}

		const nextIdx = atEnd() ? 0 : charIdx(currentChar) + 1;
		setCurrentChar(charFromIdx(nextIdx));
	};

	if (currentChar !== char.toUpperCase()) {
		clearInterval(tickInterval.current);
		tickInterval.current = setInterval(tickToTargetChar, 250);
	}

	return <div className="split-flap">{currentChar}</div>;
}
