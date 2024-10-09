import { ScrollView, View } from 'react-native';

import { CarouselProps } from './types';

export default function Carousel({ children }: CarouselProps) {
	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{children}
			</ScrollView>
		</View>
	);
}
