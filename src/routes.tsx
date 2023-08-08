import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import PlayersListPage from './pages/players/Listing';
import PlayerDetailsPage from './pages/players/Details';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{ path: '/players', element: <PlayersListPage /> },
	{
		path: '/players/:playerId',
		element: <PlayerDetailsPage />,
	},
]);

export default router;
