import { useCallback, useEffect, useRef, useState } from 'react';
import { CHARACTERS, type Character } from './constants';
import './style.css';

const CHARS_ENDING_IDX = CHARACTERS.length - 1;
const FLIP_DELAY = 1000;

const charIdx = (char: string) => {
	const upcasedCharacter = char.toUpperCase();
	const index = CHARACTERS.findIndex(
		(character) => character === upcasedCharacter
	);

	// Potentially, if CHARACTERS is missing some other characters,
	// it will not return a valid index that we can use to render a character.
	// Returning `0` should gracefully give us a blank string instead.
	return index === -1 ? 0 : index;
};

const characterFromIdx = (idx: number): Character => CHARACTERS[idx] ?? ' ';

export default function SplitFlap({ char = ' ' }: { char?: string }) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const targetIndex = useRef<number>(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	const tickToTarget = useCallback(() => {
		if (currentIndex === targetIndex.current) return;
		if (currentIndex === CHARS_ENDING_IDX) return setCurrentIndex(0);

		return setCurrentIndex(currentIndex + 1);
	}, [currentIndex]);

	useEffect(() => {
		targetIndex.current = charIdx(char);
		timeoutRef.current = setTimeout(tickToTarget, FLIP_DELAY);

		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [char, tickToTarget]);

	const currentCharacter = characterFromIdx(currentIndex);
	const nextCharacter = characterFromIdx(currentIndex + 1);

	const renderNextCharacter = () => {
		return (
			<div
				className="split-flap next-character"
				data-current-character={currentCharacter}
				data-next-character={nextCharacter}
			>
				{nextCharacter}
			</div>
		);
	};

	return (
		<div className="split-flap-container" key={Math.random()}>
			<div className="split-flap current-character">{currentCharacter}</div>
			{renderNextCharacter()}
		</div>
	);
}
