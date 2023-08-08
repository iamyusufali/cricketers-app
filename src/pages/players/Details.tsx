import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getPlayers, { TPlayer } from '../../utils/getPlayers';
import {
	Alert,
	AlertIcon,
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	Divider,
	Flex,
	Heading,
	SimpleGrid,
	Skeleton,
	Stack,
	Stat,
	StatLabel,
	StatNumber,
	Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const PlayerDetailsPage = () => {
	const { playerId } = useParams();

	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [singlePlayer, setSinglePlayer] = useState<TPlayer>();
	const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);

	useEffect(() => {
		getPlayers()
			.then(players => {
				const singlePlayer = players.find(player => player.id === playerId);
				const similarPlayers = players
					.filter(player => player.type === singlePlayer?.type && player.id !== singlePlayer?.id)
					.slice(0, 5);

				setSinglePlayer(singlePlayer);
				setSimilarPlayers(similarPlayers);
			})
			.catch(err => console.error(err))
			.finally(() => setIsFetching(false));
	}, [playerId]);

	if (isFetching)
		return (
			<Box mx='auto' w='80em' pt='4em'>
				<Stack gap='2em'>
					<Skeleton height='5em' />
					<Skeleton height='20em' />
				</Stack>
			</Box>
		);

	if (!singlePlayer?.id)
		return (
			<Container mt='4em'>
				<Stack align='center' gap='2em'>
					<Alert variant='subtle' status='warning'>
						<AlertIcon />
						<Text>Player not found</Text>
					</Alert>
					<Link to='/players'>
						<Button colorScheme='gray'>Back to list</Button>
					</Link>
				</Stack>
			</Container>
		);

	return (
		<Box mx='auto' w='80em' pt='2em'>
			<Box mb='2em'>
				<Link to='/players'>
					<Flex _hover={{ color: 'blue.200' }} align='center' gap='0.5em'>
						<ArrowBackIcon w={6} h={6} />
						<Text>back to list</Text>
					</Flex>
				</Link>
			</Box>
			<Flex align='start' gap='4em'>
				<Card maxW='lg' p='1em'>
					<CardHeader>
						<Flex>
							<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
								<Avatar name={singlePlayer.name || ''} />
								<Box>
									<Heading size='sm'>{singlePlayer.name}</Heading>
									<Text>{singlePlayer.type}</Text>
								</Box>
							</Flex>
						</Flex>
					</CardHeader>
					<CardBody>
						<Text>{singlePlayer?.description}</Text>
						<Flex align='center' mt='3em'>
							<Stat>
								<StatLabel>Rank</StatLabel>
								<StatNumber fontSize='1.2em'>{singlePlayer.rank}</StatNumber>
							</Stat>
							<Stat>
								<StatLabel>Points</StatLabel>
								<StatNumber fontSize='1.2em'>{singlePlayer.points}</StatNumber>
							</Stat>
							{singlePlayer.dob ? (
								<>
									<Stat>
										<StatLabel>Age</StatLabel>
										<StatNumber fontSize='1.2em'>
											{new Date().getFullYear() - new Date(singlePlayer.dob).getFullYear()}
										</StatNumber>
									</Stat>
									<Stat>
										<StatLabel>Dob</StatLabel>
										<StatNumber fontSize='1.2em'>
											{new Date(singlePlayer.dob).toLocaleDateString()}
										</StatNumber>
									</Stat>
								</>
							) : null}
						</Flex>
					</CardBody>
				</Card>

				{similarPlayers.length > 0 ? (
					<>
						<Center height='25em'>
							<Divider orientation='vertical' />
						</Center>
						<Box>
							<Heading size='lg' color='white' mb='1em'>
								Also watch similar players
							</Heading>
							<SimpleGrid columns={2} spacing={10}>
								{similarPlayers.map(player => (
									<Card key={player.id} maxW='sm'>
										<CardHeader>
											<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
												<Avatar name={player.name || ''} />
												<Box>
													<Heading size='sm'>{player.name}</Heading>
													<Text>{player.type}</Text>
												</Box>
											</Flex>
										</CardHeader>
										<CardBody>
											<Flex align='center'>
												<Stat>
													<StatLabel>Rank</StatLabel>
													<StatNumber fontSize='1.2em'>{player.rank}</StatNumber>
												</Stat>
												<Stat>
													<StatLabel>Points</StatLabel>
													<StatNumber fontSize='1.2em'>{player.points}</StatNumber>
												</Stat>
											</Flex>
										</CardBody>
									</Card>
								))}
							</SimpleGrid>
						</Box>
					</>
				) : null}
			</Flex>
		</Box>
	);
};

export default PlayerDetailsPage;
