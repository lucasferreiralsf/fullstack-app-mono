export interface TabBarProps {
	onTabSelect: (key: number | string) => void;
	items: {
		icon: JSX.Element;
		key: number | string;
		active: boolean;
		title: string;
	}[];
}
