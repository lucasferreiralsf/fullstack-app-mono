import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useAnimatedValue(
	isActive: boolean,
	activeValue: number,
	inactiveValue: number,
	duration: number = 300,
	useNativeDriver = false,
) {
	const animatedValue = useRef(
		new Animated.Value(isActive ? activeValue : inactiveValue),
	).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: isActive ? activeValue : inactiveValue,
			duration,
			useNativeDriver,
		}).start();
	}, [isActive, activeValue, inactiveValue, duration]);

	return animatedValue;
}
