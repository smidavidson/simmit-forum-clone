import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import FrontPage from './pages/FrontPage';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Post from './pages/Post';
import SubmitPost from './pages/SubmitPost';
import ProtectedRoute from './ui/ProtectedRoute';
import Profile from './ui/Profile';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

const router = createBrowserRouter([
    {
        element: <AppLayout></AppLayout>,
        children: [
            {
                path: '/',

                element: <FrontPage></FrontPage>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/:postId',
                element: <Post></Post>,
            },
            {
                path: '/submit',
                element: (
                    // <ProtectedRoute>
                    <SubmitPost></SubmitPost>
                    // </ProtectedRoute>
                ),
            },
            {
                path: '/user/:username',
                element: <Profile></Profile>,
            },
        ],
    },
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
    );
}
