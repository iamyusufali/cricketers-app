import { Filters } from '../pages/players/Listing';
import { TPlayer } from './getPlayers';

export const filterPlayers = (rows: TPlayer[], filter: Filters) => {
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
