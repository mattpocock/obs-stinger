import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Audio,
	Sequence,
} from 'remotion';
import youTubeBanner from './youtube-header.jpg';
import ring from './ring.mp3';
import arrowWhoosh from './arrow-whoosh.wav';

const getFrameModifier = (fps: number, frame: number) => {
	if (fps === 30) {
		return Math.floor(frame / 2);
	}
	return frame;
};

export const Ad = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const size = spring({
		frame: frame - getFrameModifier(fps, 180),
		fps,
		from: 1200,
		to: 0,
		config: {
			overshootClamping: true,
			mass: 0.1,
		},
	});

	const scale = interpolate(frame, [0, getFrameModifier(fps, 220)], [1, 1.1]);

	let maskCircleSize = `${size}px`;
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'row', // 'column',
			}}
		>
			<Sequence durationInFrames={10} from={getFrameModifier(fps, 180)}>
				<Audio src={arrowWhoosh} startFrom={4} volume={0.7} />
			</Sequence>

			<Sequence durationInFrames={getFrameModifier(fps, 190)} from={0}>
				<Audio
					src={ring}
					volume={(f) =>
						interpolate(
							f,
							[getFrameModifier(fps, 100), getFrameModifier(fps, 190)],
							[1, 0],
							{
								easing: Easing.inOut(Easing.ease),
								extrapolateLeft: 'clamp',
							}
						)
					}
				></Audio>
			</Sequence>
			<div
				className="flex items-center justify-center flex-1"
				style={{
					backgroundColor: '#0d182a',
					clipPath: `ellipse(${maskCircleSize} ${maskCircleSize} at 50% 50%)`,
					transform: `scale(${scale})`,
				}}
			>
				<Img
					src={youTubeBanner}
					style={{
						height: '110%',
						objectFit: 'cover',
					}}
				></Img>
			</div>
		</AbsoluteFill>
	);
};
