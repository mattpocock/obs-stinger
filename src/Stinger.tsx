import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	Audio,
	Easing,
	spring,
	useCurrentFrame,
	useVideoConfig,
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

export const Stinger = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const size = spring({
		frame,
		fps,
		from: 0,
		to: 800,
		config: {},
	});

	const size2Frame = getFrameModifier(fps, 50);
	const size3Frame = getFrameModifier(fps, 126);

	const scale = interpolate(frame, [0, getFrameModifier(fps, 126)], [1, 1.03]);

	const size2 = spring({
		frame: frame - size2Frame,
		fps,
		from: 800,
		to: 1200,
	});

	const size3 = spring({
		frame: frame - size3Frame,
		fps,
		from: 1200,
		to: 0,
		config: {
			overshootClamping: true,
			mass: 0.1,
		},
	});

	let maskCircleSize = `${size}px`;

	if (frame > size3Frame) {
		maskCircleSize = `${size3}px`;
	} else if (frame > size2Frame) {
		maskCircleSize = `${size2}px`;
	}

	let whiteCircleSize = `${size}px`;

	if (frame > size2Frame) {
		whiteCircleSize = `${size2}px`;
	}
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'row',
			}}
		>
			<Sequence durationInFrames={20} from={getFrameModifier(fps, 126)}>
				<Audio src={arrowWhoosh} startFrom={4} volume={0.7} />
			</Sequence>
			<Sequence durationInFrames={20} from={0}>
				<Audio src={arrowWhoosh} startFrom={4} volume={0.7} />
			</Sequence>

			<Sequence durationInFrames={getFrameModifier(fps, 142)} from={0}>
				<Audio
					src={ring}
					volume={(f) =>
						interpolate(
							f,
							[getFrameModifier(fps, 100), getFrameModifier(fps, 142)],
							[0.9, 0],
							{
								easing: Easing.inOut(Easing.ease),
								extrapolateLeft: 'clamp',
							}
						)
					}
				></Audio>
			</Sequence>
			<div
				className="flex items-center justify-center flex-1 overflow-hidden"
				style={{
					backgroundColor: '#0d182a',
					clipPath: `ellipse(${maskCircleSize} ${maskCircleSize} at 50% 50%)`,
				}}
			>
				<Img
					src={youTubeBanner}
					style={{
						height: '110%',
						objectFit: 'cover',
						transform: `scale(${scale})`,
					}}
				></Img>
			</div>
			<div className="flex flex-1 bg-black">
				<div
					className="w-full h-full bg-white"
					style={{
						clipPath: `ellipse(${whiteCircleSize} ${whiteCircleSize} at 50% 50%)`,
					}}
				></div>
			</div>
		</AbsoluteFill>
	);
};
