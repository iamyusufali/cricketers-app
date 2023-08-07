import { useState } from 'react';
import { TPlayer } from '../utils/getPlayers';
import {
	Text,
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Flex,
	AlertIcon,
	Alert,
	Box,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Column } from '../pages/players/Listing';

/**
 *
 * Interface and Types
 *
 **/
interface TableProps {
	columns: Column[];
	rows: TPlayer[];
	perPage?: number;
	currentPage: number;
	paginationHandler: (action: 'forward' | 'backward' | 'reset') => void;
}

interface SortState {
	order: 'asc' | 'desc';
	orderBy: keyof TPlayer;
}

/**
 *
 * Main Component
 *
 **/
export const Table = (props: TableProps) => {
	const { columns, rows, perPage, currentPage, paginationHandler } = props;

	const [sort, setSort] = useState<SortState>({
		order: 'asc',
		orderBy: 'name',
	});

	const sortedRows = (() => {
		return rows.sort((a, b) => {
			const aOrderBy = a[sort.orderBy];
			const bOrderBy = b[sort.orderBy];

			if (!aOrderBy || !bOrderBy) return 0;
			if (sort.order === 'asc') return aOrderBy < bOrderBy ? -1 : 1;
			return aOrderBy > bOrderBy ? -1 : 1;
		});
	})();
	const perPageLimit = perPage || 10;
	const rowsCount = sortedRows.length;
	const totalPages = Math.ceil(rowsCount / perPageLimit);
	const displayRows = sortedRows.slice((currentPage - 1) * perPageLimit, currentPage * perPageLimit);

	const handleSort = async (orderBy: keyof TPlayer) => {
		if (rowsCount < 2) return;

		if (currentPage != 1) paginationHandler('reset');
		const order = sort.order === 'asc' ? 'desc' : 'asc';
		setSort({ order, orderBy });
	};

	const movePage = async (direction: 'forward' | 'backward') => {
		if (direction === 'backward' && currentPage == 1) return;
		if (direction === 'forward' && currentPage == totalPages) return;
		paginationHandler(direction);
	};

	const renderSortIcon = (accessor: string) => {
		const hide = sort.orderBy !== accessor;
		return (
			<Box visibility={hide ? 'hidden' : 'visible'}>
				{sort.order === 'asc' ? <ArrowUpIcon w={4} h={4} /> : <ArrowDownIcon w={4} h={4} />}
			</Box>
		);
	};

	if (!displayRows.length)
		return (
			<TableContainer w='full' border='1px' borderColor='gray.200' borderRadius='md'>
				<Flex justify='center' p='1em'>
					<Alert status='warning'>
						<AlertIcon />
						<Text>No matching results found</Text>
					</Alert>
				</Flex>
			</TableContainer>
		);

	return (
		<TableContainer w='full' border='1px' borderColor='gray.200' borderRadius='md'>
			<ChakraTable variant='unstyled'>
				<Thead>
					<Tr bg='gray.100'>
						{columns.map(column => {
							return (
								<Th key={column.accessor}>
									{column.enableSort ? (
										<Flex
											align='center'
											gap='2'
											cursor={rowsCount < 2 ? 'not-allowed' : 'pointer'}
											onClick={() => handleSort(column.accessor)}
										>
											<Text>{column.label}</Text>
											{renderSortIcon(column.accessor)}
										</Flex>
									) : (
										<Text>{column.label}</Text>
									)}
								</Th>
							);
						})}
					</Tr>
				</Thead>
				<Tbody fontSize='0.8em'>
					{displayRows.map(row => (
						<Tr key={row.id} borderTop='1px' borderBottom='1px' borderColor='gray.200'>
							{columns.map(column => {
								const finalValue = column.format ? column.format(row[column.accessor]) : row[column.accessor];
								return <Td key={column.accessor}>{finalValue}</Td>;
							})}
						</Tr>
					))}
				</Tbody>
			</ChakraTable>

			<Flex w='full' align='center' justify='end' gap='1em' p='0.65em'>
				<Flex gap='0.2em'>
					<Text fontSize='0.8em' color='gray.400'>
						showing page
					</Text>
					<Text fontSize='0.8em'>{currentPage}</Text>
					<Text fontSize='0.8em' color='gray.400'>
						of {totalPages}
					</Text>
				</Flex>
				{rowsCount > perPageLimit ? (
					<Flex gap='0.85em'>
						<ChevronLeftIcon
							w={5}
							h={5}
							cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
							color={currentPage === 1 ? 'gray.300' : 'gray.700'}
							onClick={() => movePage('backward')}
						/>
						<ChevronRightIcon
							w={5}
							h={5}
							cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
							color={currentPage === totalPages ? 'gray.300' : 'gray.700'}
							onClick={() => movePage('forward')}
						/>
					</Flex>
				) : null}
			</Flex>
		</TableContainer>
	);
};
