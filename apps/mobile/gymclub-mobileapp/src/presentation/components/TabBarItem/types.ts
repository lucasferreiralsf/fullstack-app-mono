export interface TabBarItemProps {
	title: string;
	active: boolean;
	icon: JSX.Element;
	onPress?: () => void;
}
