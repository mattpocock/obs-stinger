import {AbsoluteFill, Img} from 'remotion';

import youTubeBanner from './youtube-header.jpg';

export const BgImage = () => {
	return (
		<AbsoluteFill>
			<Img
				src={youTubeBanner}
				style={{
					height: '120%',
				}}
			/>
		</AbsoluteFill>
	);
};
