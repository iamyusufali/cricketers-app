import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<Box mx='auto' pt='5em' maxW='35em'>
			<Heading mb='1em' size='3xl'>
				Cricketers Arena
			</Heading>
			<Text fontSize='2xl' mb='1em'>
				Discover the Legends of Indian Cricket
			</Text>
			<Text color='gray.200' mb='1em'>
				Ready to explore the comprehensive list of India cricketers who have represented the nation
				on the international stage?
			</Text>
			<Text color='gray.200' mb='1em'>
				Click the "View Cricketers List" button below and embark on a journey through the names that
				have become synonymous with Indian cricketing excellence.
			</Text>
			<Link to='/players'>
				<Button size='lg' colorScheme='teal' mt='24px'>
					View Cricketers List
				</Button>
			</Link>
		</Box>
	);
};

export default HomePage;
