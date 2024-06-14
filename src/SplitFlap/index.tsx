import { useState } from 'react';
import { CHARACTERS } from './constants';
import './style.css';

const CHARS_ENDING_IDX = CHARACTERS.length - 1;

const charIdx = (char: string) => CHARACTERS.indexOf(char.toUpperCase());
const charFromIdx = (idx: number) => CHARACTERS[idx];

export default function SplitFlap({ char = ' ' }: { char?: string }) {
	const [currentChar, setCurrentChar] = useState<string>(' ');

	const tickToTargetChar = () => {
		if (currentChar === char.toUpperCase()) return;

		const currentIdx = charIdx(currentChar);

		if (currentIdx === CHARS_ENDING_IDX) {
			return setCurrentChar(charFromIdx(0));
		}

		return setCurrentChar(charFromIdx(currentIdx + 1));
	};

	if (currentChar !== char.toUpperCase()) {
		setTimeout(tickToTargetChar, 250);
	}

	return <div className="split-flap">{currentChar}</div>;
}
