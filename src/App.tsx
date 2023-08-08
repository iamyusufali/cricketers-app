import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Box } from '@chakra-ui/react';

const App = () => {
	return (
		<Box h='full'>
			<RouterProvider router={router} />
		</Box>
	);
};

export default App;
