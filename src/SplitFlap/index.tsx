import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CHARACTERS, type Character } from './constants';
import './style.css';

const CHARS_ENDING_IDX = CHARACTERS.length - 1;

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

export default memo(function SplitFlap({ char = ' ' }: { char?: string }) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const targetIndex = useRef<number>(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	const tickToTarget = useCallback(() => {
		if (currentIndex === targetIndex.current) return;
		if (currentIndex === CHARS_ENDING_IDX) return setCurrentIndex(0);

		return setCurrentIndex(currentIndex + 1);
	}, [currentIndex]);

	const renderChar = (idx: number): Character => CHARACTERS[idx];

	useEffect(() => {
		targetIndex.current = charIdx(char);
		timeoutRef.current = setTimeout(tickToTarget, 200);

		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [char, tickToTarget]);

	return <div className="split-flap">{renderChar(currentIndex)}</div>;
});
