import { useMemo, useRef, useState } from 'react';
import {
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { ChevronDownIcon } from '@/presentation/components/icons';
import { colors } from '@/presentation/styles/colors';

import { SelectOption, SelectProps } from './types';

export default function LocationSelect({
	values,
	onValueChange,
	leftIcon,
	defaultValue,
	className,
}: SelectProps) {
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedValue, setSelectedValue] =
		useState<SelectOption>(defaultValue);
	const [dropdownPosition, setDropdownPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
	});

	const touchableRef = useRef<TouchableOpacity>(null);

	const inputClasses = useMemo(() => {
		const baseClasses = 'flex-row items-center p-4 rounded-xl';
		const visibleDropdownClasses = 'border border-gymclub-gray-400';
		const hiddenDropdownClasses = 'border-0/5 border-gymclub-gray-300';

		return `${baseClasses} ${
			dropdownVisible ? visibleDropdownClasses : hiddenDropdownClasses
		}`;
	}, [dropdownVisible]);

	const handleSelect = (value: SelectOption) => {
		setSelectedValue(value);
		onValueChange(value);
		setDropdownVisible(false);
	};

	const openDropdown = () => {
		const GAP_VALUE = 4;

		touchableRef.current?.measure((_fx, _fy, width, height, px, py) => {
			setDropdownPosition({ top: py + height + GAP_VALUE, left: px, width });
			setDropdownVisible(true);
		});
	};

	return (
		<View className={`${className} z-10`}>
			<TouchableOpacity
				className={inputClasses}
				onPress={openDropdown}
				ref={touchableRef}
			>
				{leftIcon && <View className="mr-2">{leftIcon}</View>}

				<Text className="flex-1 font-gymclub-regular text-gymclub-black">
					{selectedValue.value}
				</Text>

				<ChevronDownIcon className="h-5 w-5" color={colors.gymclub.gray[500]} />
			</TouchableOpacity>

			<Modal
				transparent={true}
				animationType="fade"
				visible={dropdownVisible}
				onRequestClose={() => void setDropdownVisible(false)}
			>
				<TouchableWithoutFeedback
					onPress={() => void setDropdownVisible(false)}
				>
					<View className="flex-1">
						<View
							className="absolute bg-gymclub-white border-0/5 border-gymclub-gray-300 rounded-lg"
							style={{
								top: dropdownPosition.top,
								left: dropdownPosition.left,
								width: dropdownPosition.width,
							}}
						>
							<FlatList
								data={values}
								keyExtractor={(item) => item.key}
								renderItem={({ item }) => (
									<TouchableOpacity
										className="px-3 py-2"
										onPress={() => void handleSelect(item)}
									>
										<Text
											className={`${
												item.key === selectedValue.key
													? 'font-gymclub-semi-bold'
													: 'font-gymclub-regular'
											} text-gymclub-black text-base font-gym`}
										>
											{item.value}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}
