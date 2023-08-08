import { useMemo, useState } from 'react';
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
	Container,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Column } from '../pages/players/Listing';

/**
 *
 * Interface and Types
 *
 **/
export type PaginationAction = 'forward' | 'backward' | 'reset';

interface TableProps {
	columns: Column[];
	rows: TPlayer[];
	perPage?: number;
	currentPage: number;
	paginationHandler: (action: PaginationAction) => void;
	renderSingleRowData?: (
		row: TPlayer,
		column: Column,
		finalValue: string | number
	) => JSX.Element | string | number;
}

interface SortState {
	order: 'asc' | 'desc';
	orderBy: keyof TPlayer;
}

/**
 *
 * Helpers
 *
 **/
const sortPlayers = (rows: TPlayer[], sort: SortState) =>
	rows.sort((a, b) => {
		const aOrderBy = a[sort.orderBy];
		const bOrderBy = b[sort.orderBy];

		if (!aOrderBy || !bOrderBy) return 0;
		if (sort.order === 'asc') return aOrderBy < bOrderBy ? -1 : 1;
		return aOrderBy > bOrderBy ? -1 : 1;
	});

/**
 *
 * Main Component
 *
 **/
export const Table = (props: TableProps) => {
	const { columns, rows, perPage, currentPage, paginationHandler, renderSingleRowData } = props;

	const [sort, setSort] = useState<SortState>({
		order: 'asc',
		orderBy: 'name',
	});

	const sortedRows = useMemo(() => sortPlayers(rows, sort), [rows, sort]);
	const perPageLimit = perPage || 10;
	const rowsCount = sortedRows.length;
	const totalPages = Math.ceil(rowsCount / perPageLimit);
	const displayRows = sortedRows.slice(
		(currentPage - 1) * perPageLimit,
		currentPage * perPageLimit
	);

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
			<Container>
				<Flex justify='center' p='1em'>
					<Alert status='warning'>
						<AlertIcon />
						<Text>No matching results found</Text>
					</Alert>
				</Flex>
			</Container>
		);

	return (
		<TableContainer w='full' border='1px' borderColor='gray.500' borderRadius='md' boxShadow='lg'>
			<ChakraTable variant='striped' colorScheme='gray'>
				<Thead>
					<Tr>
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
						<Tr key={row.id} borderTop='1px' borderBottom='1px'>
							{columns.map(column => {
								const finalValue = column.format
									? column.format(row[column.accessor])
									: row[column.accessor];

								if (!finalValue) return;
								return (
									<Td key={column.accessor}>
										{renderSingleRowData
											? renderSingleRowData(row, column, finalValue)
											: finalValue}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</ChakraTable>

			<Flex w='full' align='center' justify='end' gap='1em' p='0.65em'>
				<Flex gap='0.2em'>
					<Text fontSize='0.85em'>showing page</Text>
					<Text fontSize='0.85em' fontWeight='bold' color='gray.200'>
						{currentPage}
					</Text>
					<Text fontSize='0.85em'>of {totalPages}</Text>
				</Flex>
				{rowsCount > perPageLimit ? (
					<Flex gap='0.85em'>
						<ChevronLeftIcon
							w={7}
							h={7}
							cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
							color={currentPage === 1 ? 'gray.600' : 'gray.200'}
							onClick={() => movePage('backward')}
						/>
						<ChevronRightIcon
							w={7}
							h={7}
							cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
							color={currentPage === totalPages ? 'gray.600' : 'gray.200'}
							onClick={() => movePage('forward')}
						/>
					</Flex>
				) : null}
			</Flex>
		</TableContainer>
	);
};
