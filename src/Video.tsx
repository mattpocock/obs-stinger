import {Composition, Still} from 'remotion';
import {Ad} from './Ad';
import {BgImage} from './BgImage';
import {Stinger} from './Stinger';
import './style.css';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Stinger"
				component={Stinger}
				durationInFrames={160}
				fps={60}
				width={3840}
				height={1080}
			/>
			<Composition
				id="Ad"
				component={Ad}
				durationInFrames={120}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Still
				component={BgImage}
				width={1920}
				height={1080}
				id="BgImage"
			></Still>
		</>
	);
};
