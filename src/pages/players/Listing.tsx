import { useEffect, useState } from 'react';
import getPlayers, { TPlayer } from '../../utils/getPlayers';
import { Table } from '../../components/Table';
import { Box, Skeleton, Stack } from '@chakra-ui/react';

/**
 *
 * Interface and Types
 *
 **/
export interface Column {
	accessor: keyof TPlayer;
	label: string;
	enableSort?: boolean;
	format?: (val?: string | number | null) => string | number | null;
}

export interface Filters {
	search?: string;
	type?: string;
}

/**
 *
 * Main Component
 *
 **/
const PlayersListPage = () => {
	const columnsConfig: Column[] = [
		{ accessor: 'name', label: 'Name', enableSort: true },
		{ accessor: 'type', label: 'Type' },
		{ accessor: 'points', label: 'Points' },
		{ accessor: 'rank', label: 'Rank', enableSort: true },
		{
			accessor: 'dob',
			label: 'Age',
			enableSort: true,
			format: (dob?: string | number | null) => {
				if (!dob) return null;
				return new Date().getFullYear() - new Date(dob).getFullYear();
			},
		},
	];

	const [playersList, setPlayersList] = useState<TPlayer[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		getPlayers()
			.then(players => setPlayersList(players))
			.catch(err => console.error(err))
			.finally(() => setIsFetching(false));
	}, []);

	if (isFetching)
		return (
			<Box mx='auto' w='80em' pt='4em'>
				<Stack gap='2em'>
					<Skeleton height='5em' />
					<Skeleton height='20em' />
				</Stack>
			</Box>
		);

	return (
		<Box mx='auto' w='80em' pt='4em'>
			<Table
				columns={columnsConfig}
				rows={playersList}
				perPage={10}
				currentPage={currentPage}
				paginationHandler={action => {
					setCurrentPage(prevPage => {
						if (action === 'reset') return 1;
						if (action === 'forward') return prevPage + 1;
						else return prevPage - 1;
					});
				}}
			/>
		</Box>
	);
};

export default PlayersListPage;
