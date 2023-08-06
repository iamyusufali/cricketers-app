import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import PlayersListPage from './pages/players/Listing';
import PlayerDetailsPage from './pages/players/Details';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{ path: '/players', element: <PlayersListPage /> },
	{
		path: '/players/:playerId',
		element: <PlayerDetailsPage />,
	},
]);

export default router;
