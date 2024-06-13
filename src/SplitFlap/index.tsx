import { useState, useRef } from 'react';
import { CHARACTERS } from './constants';
import './style.css';

const charIdx = (char: string) => CHARACTERS.indexOf(char.toUpperCase());
const charAtIdx = (idx: number) => CHARACTERS[idx];

export default function SplitFlap({
	previousChar = ' ',
	char: targetChar = ' ',
}: {
	previousChar?: string;
	char?: string;
}) {
	const [currentCharacter, setCurrentCharacter] = useState(previousChar);
	const targetCharIdx = useRef<number>(charIdx(targetChar));
	const tickInterval = useRef<ReturnType<typeof setInterval>>();

	const tickToTarget = () => {
		if (charIdx(currentCharacter) === targetCharIdx.current) {
			clearInterval(tickInterval.current);
			return;
		}

		const atEnd = charIdx(currentCharacter) + 1 === CHARACTERS.length;
		const nextIdx = atEnd ? 0 : charIdx(currentCharacter) + 1;
		setCurrentCharacter(charAtIdx(nextIdx));
	};

	console.log({
		previousCharIdx: charIdx(previousChar),
		targetCharIdx: charIdx(targetChar),
	});

	// if (charIdx(previousChar) !== charIdx(targetChar)) {
	// 	setCurrentCharacter(previousChar.toUpperCase());
	// 	targetCharIdx.current = charIdx(targetChar);
	// 	tickInterval.current = setInterval(tickToTarget, 250);
	// }

	return <div className="splitFlap">{currentCharacter}</div>;
}
