import { useEffect, useState, useRef } from 'react';
import { Box, Button, Flex, Heading, Input, Select, Skeleton, Stack, Text } from '@chakra-ui/react';
import getPlayers, { TPlayer } from '../../utils/getPlayers';
import { PaginationAction, Table } from '../../components/Table';
import { TypeOptions } from '../../utils/constants';
import { Link } from 'react-router-dom';

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
 * Helpers
 *
 **/
const filterPlayers = (rows: TPlayer[], filter: Filters) => {
	const { search, type } = filter;

	if (search && !type)
		return rows.filter(row => row.name?.toLocaleLowerCase().includes(search.toLowerCase()));
	if (!search && type) return rows.filter(row => row.type === type);
	if (search && type)
		return rows.filter(
			row => row.name?.toLocaleLowerCase().includes(search.toLowerCase()) && row.type === type
		);

	return rows;
};

/**
 *
 * Main Component
 *
 **/
const PlayersListPage = () => {
	const inputRef = useRef<HTMLInputElement>(null);
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

	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [filters, setFilters] = useState<Filters>(() => {
		return JSON.parse(localStorage.getItem('filters') || '{}');
	});
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [playersList, setPlayersList] = useState<TPlayer[]>([]);
	const filteredPlayers = filterPlayers(playersList, filters);

	const filterHandler = (value: { search?: string; type?: string }) => {
		setFilters(prev => {
			const filterVal = { ...prev, ...value };
			localStorage.setItem('filters', JSON.stringify(filterVal));
			return filterVal;
		});
	};

	const paginationHandler = (action: PaginationAction) => {
		setCurrentPage(prevPage => {
			if (action === 'reset') return 1;
			if (action === 'forward') return prevPage + 1;
			else return prevPage - 1;
		});
	};

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
		<Box mx='auto' w='80em' pt='2em'>
			<Heading textAlign='center' mb='1em'>
				Cricketers list
			</Heading>
			<Flex align='center' justify='space-between' gap='1em' mb='2em' borderRadius='md' p='1em'>
				<Flex align='center' gap='1em'>
					<Input
						variant='filled'
						ref={inputRef}
						defaultValue={filters.search}
						placeholder='Search by name'
						onKeyUp={evt => {
							if (evt.key === 'Enter' || !inputRef.current?.value) {
								filterHandler({ search: inputRef.current?.value });
							}
						}}
					/>
					<Button
						colorScheme='teal'
						onClick={() => filterHandler({ search: inputRef.current?.value })}
					>
						Search
					</Button>
				</Flex>
				<Flex align='center' gap='1em'>
					<Text>Filters</Text>
					<Box w='10em'>
						<Select
							value={filters.type}
							variant='filled'
							placeholder='Select type'
							onChange={e => {
								filterHandler({ type: e.target.value });
								setCurrentPage(1);
							}}
						>
							{TypeOptions.map(opt => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Select>
					</Box>
				</Flex>
			</Flex>
			<Table
				columns={columnsConfig}
				rows={filteredPlayers}
				perPage={10}
				currentPage={currentPage}
				paginationHandler={paginationHandler}
				renderSingleRowData={(row, column, finalValue) => {
					return column.accessor === 'name' ? (
						<Text fontWeight='bold' _hover={{ color: 'blue.500' }}>
							<Link to={`/players/${row.id}`}>{finalValue}</Link>
						</Text>
					) : (
						finalValue
					);
				}}
			/>
		</Box>
	);
};

export default PlayersListPage;
