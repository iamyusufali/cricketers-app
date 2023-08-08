import { Alert, AlertIcon, Container, Stack, Text } from '@chakra-ui/react';

const ErrorPage = () => {
	return (
		<Container mt='4em'>
			<Stack align='center' gap='2em'>
				<Alert variant='subtle' status='warning'>
					<AlertIcon />
					<Text>Oops! Sorry, an unexpected error has occurred.</Text>
				</Alert>
			</Stack>
		</Container>
	);
};

export default ErrorPage;
