import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import { colors } from '@/presentation/styles/colors';

import { ThreeDotsLoadingProps } from './types';

const {
	gymclub: { white },
} = colors;

export function ThreeDotsLoading({
	className,
	color = white,
}: ThreeDotsLoadingProps) {
	const dot1Animation = useRef(new Animated.Value(0)).current;
	const dot2Animation = useRef(new Animated.Value(0)).current;
	const dot3Animation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const createAnimation = (animatedValue: Animated.Value) =>
			Animated.loop(
				Animated.sequence([
					Animated.timing(animatedValue, {
						toValue: 1,
						duration: 500,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
					Animated.timing(animatedValue, {
						toValue: 0,
						duration: 500,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
				]),
			);

		createAnimation(dot1Animation).start();
		setTimeout(() => void createAnimation(dot2Animation).start(), 200);
		setTimeout(() => void createAnimation(dot3Animation).start(), 400);
	}, [dot1Animation, dot2Animation, dot3Animation]);

	return (
		<View
			className={`${className} min-h-6 flex-row justify-between items-center w-16`}
		>
			<Animated.View
				className="w-3 h-3 mt-1 rounded-md mx-1"
				style={{
					backgroundColor: color,
					opacity: dot1Animation,
					transform: [
						{
							translateY: dot1Animation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -5],
							}),
						},
					],
				}}
			/>
			<Animated.View
				className="w-3 h-3 mt-1 rounded-md mx-1"
				style={{
					backgroundColor: color,
					opacity: dot2Animation,
					transform: [
						{
							translateY: dot2Animation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -5],
							}),
						},
					],
				}}
			/>
			<Animated.View
				className="w-3 h-3 mt-1 rounded-md mx-1"
				style={{
					backgroundColor: color,
					opacity: dot3Animation,
					transform: [
						{
							translateY: dot3Animation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -5],
							}),
						},
					],
				}}
			/>
		</View>
	);
}
