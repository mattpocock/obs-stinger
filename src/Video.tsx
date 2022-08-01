import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Stinger"
				component={MyComposition}
				durationInFrames={160}
				fps={60}
				width={3840}
				height={1080}
			/>
		</>
	);
};
