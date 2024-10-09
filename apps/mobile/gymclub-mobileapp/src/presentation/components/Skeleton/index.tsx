import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { SkeletonProps } from './types';

export default function Skeleton({ className }: SkeletonProps) {
	const opacity = useRef(new Animated.Value(0.3)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 0.9,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0.3,
					duration: 800,
					useNativeDriver: true,
				}),
			]),
		).start();
	}, [opacity]);

	return (
		<Animated.View
			style={{ opacity }}
			className={`${className} bg-gymclub-gray-200`}
		/>
	);
}
