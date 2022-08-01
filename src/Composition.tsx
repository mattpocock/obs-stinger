import {
	AbsoluteFill,
	Img,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import tsImage from './ts-image.jpg';

export const MyComposition = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const size = spring({
		frame,
		fps,
		from: 0,
		to: 600,
		config: {},
	});

	const size2 = spring({
		frame: frame - 50,
		fps,
		from: 600,
		to: 1200,
	});

	const size3 = spring({
		frame: frame - 120,
		fps,
		from: 1200,
		to: 0,
		config: {
			overshootClamping: true,
			mass: 0.1,
		},
	});

	let maskCircleSize = `${size}px`;

	if (frame > 120) {
		maskCircleSize = `${size3}px`;
	} else if (frame > 50) {
		maskCircleSize = `${size2}px`;
	}

	let whiteCircleSize = `${size}px`;

	if (frame > 50) {
		whiteCircleSize = `${size2}px`;
	}
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'row',
			}}
		>
			<div
				className="flex items-center justify-center flex-1"
				style={{
					backgroundColor: '#0d182a',
					clipPath: `ellipse(${maskCircleSize} ${maskCircleSize} at 50% 50%)`,
				}}
			>
				<Img
					src={tsImage}
					style={{
						height: '100%',
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
