import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<Box mx='auto' mt='5em' maxW='35em'>
			<Heading mb={4}>Cricketers Arena</Heading>
			<Text fontSize='xl'>Get to know the best of the bests from the India cricket team</Text>
			<Link to='/players'>
				<Button size='lg' colorScheme='blue' mt='24px'>
					View players list
				</Button>
			</Link>
		</Box>
	);
};

export default HomePage;
