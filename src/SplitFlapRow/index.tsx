import SplitFlap from '../SplitFlap';
import './style.css';

interface SplitFlapRowProps {
	text: string;
	keyProp: string;
	characterLimit?: number;
}

export default function SplitFlapRow({
	text = ' ',
	keyProp,
	characterLimit = 20,
}: SplitFlapRowProps) {
	const characters = text?.split('');

	const generateSplitFlaps = () => {
		return Array.from({ length: characterLimit }, (_, idx) => {
			return <SplitFlap key={`${keyProp}-${idx}`} char={characters[idx]} />;
		});
	};

	return <div className="split-flap-row">{generateSplitFlaps()}</div>;
}
