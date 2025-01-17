import React from 'react';
import { View } from 'react-native';
import Svg, { G, Mask, Path } from 'react-native-svg';

import { SilverPlanIconProps } from './types';

export default function SilverPlanIcon({ className }: SilverPlanIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 48 54">
				<Path
					d="M24 42.022l-13.353-7.51L0 40.5 24 54V42.022zM24 11.978V0L0 13.5l10.647 5.989L24 11.978z"
					fill="#9A9A9A"
				/>
				<Path
					d="M24 42.022V54l24-13.5-10.647-5.989L24 42.022zM10.647 19.49L0 13.5v27l10.647-5.988V19.49z"
					fill="#BDBDBD"
				/>
				<Path
					d="M37.353 34.51L48 40.5v-27l-10.647 5.99V34.51z"
					fill="#9A9A9A"
				/>
				<Path
					d="M37.353 19.49L48 13.5 24 0v11.978l13.353 7.511z"
					fill="#BDBDBD"
				/>
				<Path
					d="M37.353 19.49L24 11.979l-13.352 7.51v15.022L24 42.023l13.353-7.51V19.488z"
					fill="#F2F2F2"
				/>
				<Mask
					id="a"
					maskUnits="userSpaceOnUse"
					x={0}
					y={0}
					width={48}
					height={54}
				>
					<Path
						d="M47.999 40.5v-27l-24-13.5L0 13.5v27L24 54l23.999-13.5z"
						fill="#fff"
					/>
				</Mask>
				<G mask="url(#a)">
					<Path
						d="M-.001 37.055V24.708l10.646-3.515V28.7c0 3.413-2.84 6.179-6.341 6.179.57 0 1.122.073 1.647.21L0 37.055z"
						fill="#DCDCDC"
					/>
					<Path
						d="M37.353 24.72v-3.03c1.017-2.09 3.203-3.536 5.735-3.536a6.463 6.463 0 01-2.488-.494l7.4-4.162v7.708L37.353 24.72z"
						fill="#C5C5C5"
					/>
					<Path
						d="M40.6 17.663c-2.09-.87-3.603-2.8-3.826-5.096l6.028-1.99L48 13.5l-7.4 4.163zm-7.056-.316l-4.16-2.34 7.331-2.42c-.205 2.04-1.43 3.79-3.17 4.76z"
						fill="#DCDCDC"
					/>
					<Path
						d="M12.396 32.96a6.076 6.076 0 01-1.75-4.201v-7.567l18.738-6.187 4.16 2.34a6.443 6.443 0 01-3.14.81c3.501 0 6.34 2.766 6.34 6.179 0-.946.218-1.841.608-2.642v3.03L12.396 32.96z"
						fill="#ECECEC"
					/>
					<Path
						d="M8.777 45.438l-7.82-4.4 8.913-2.943c.494.88.775 1.89.775 2.963 0-1.35.444-2.598 1.198-3.614l2.531-.836 7.82 4.4-13.417 4.43z"
						fill="#BFBFBF"
					/>
					<Path
						d="M30.93 38.123l6.423-3.613 1.672.94-8.096 2.673z"
						fill="#DDD"
					/>
					<Path
						d="M39.026 35.45l-1.673-.94v-5.49L48 25.507v6.981l-8.974 2.963z"
						fill="#BFBFBF"
					/>
					<Path
						d="M22.195 41.006l-7.82-4.4 22.977-7.586v5.49l-6.424 3.613-8.733 2.883z"
						fill="#FDFDFD"
					/>
				</G>
				<Path
					d="M36.713 12.585c.02-.2.03-.404.03-.609 0 .199.01.395.029.59l-.06.019zM37.353 21.693V19.49l3.247-1.826a6.463 6.463 0 002.488.494c-2.532 0-4.718 1.445-5.735 3.536z"
					fill="#fff"
				/>
				<Path
					d="M37.354 19.49l-3.809-2.143c1.742-.97 2.966-2.719 3.171-4.76l.059-.02c.223 2.297 1.736 4.227 3.825 5.096l-3.246 1.826z"
					fill="#fff"
				/>
				<Path
					d="M36.744 24.334c0-3.413-2.839-6.18-6.341-6.18a6.444 6.444 0 003.14-.809l3.809 2.142v2.204a6.024 6.024 0 00-.608 2.643zM9.872 38.093a6.27 6.27 0 00-1.9-2.079l2.675-1.505 2.676 1.505c-.57.394-1.07.877-1.478 1.428l-1.973.651z"
					fill="#fff"
				/>
				<Path
					d="M7.97 36.016a6.393 6.393 0 00-2.018-.926l4.694-1.55v.971l-2.675 1.505zM13.323 36.016l-2.675-1.505v-.97l1.75-.578a6.404 6.404 0 004.591 1.917c-1.366 0-2.63.42-3.666 1.136z"
					fill="#fff"
				/>
				<Path
					d="M5.952 35.09a6.51 6.51 0 00-1.648-.21c3.502 0 6.341-2.767 6.341-6.18v4.84l-4.693 1.55zM10.648 33.54v-4.78a6.076 6.076 0 001.75 4.203l-1.75.578zM10.647 41.058c0-1.074-.28-2.084-.775-2.964l1.973-.651a6.045 6.045 0 00-1.198 3.615z"
					fill="#fff"
				/>
			</Svg>
		</View>
	);
}
