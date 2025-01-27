import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { About, Cocktail, Error, SinglePageError, HomeLayout, Landing, Newsletter } from "./pages"
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/CockTail'
import { action as newsletterAction } from './pages/Newsletter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: '/cocktail/:id',
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  },

])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  );
};
export default App;

