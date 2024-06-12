import { useState } from 'react';
import { CHARACTERS } from './constants';
import './style.css';

export default function SplitFlap({ char = ' ' }: { char?: string }) {
	const [currentChar, setCurrentChar] = useState<string>(' ');
	const [prevChar, setPrevChar] = useState<string | null>(null);

	const tickToTargetCharacter = (currentIdx: number, targetIdx: number) => {
		const nextIdx = currentIdx + 1;
		const nextChar = CHARACTERS[nextIdx];
		// console.log({ nextChar });

		setCurrentChar(nextChar);
	};

	if (prevChar !== char) {
		const targetIdx = CHARACTERS.indexOf(char.toUpperCase());
		const currentIdx = CHARACTERS.indexOf(currentChar);
		setPrevChar(char);
		tickToTargetCharacter(currentIdx, targetIdx);
	}

	return <div className="splitFlap">{currentChar}</div>;
}
