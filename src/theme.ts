import '@fontsource/lato';
import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	styles: {
		global: {
			body: {
				margin: 0,
				minHeight: '100vh',
			},
		},
	},
	fonts: {
		heading: `'Lato', sans-serif`,
		body: `'Lato', sans-serif`,
	},
});

export default theme;
