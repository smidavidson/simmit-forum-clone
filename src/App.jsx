import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import FrontPage from './pages/FrontPage';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Post from './pages/Post';
import SubmitPost from './pages/SubmitPost';
import ProtectedRoute from './ui/ProtectedRoute';
import Profile from './features/profile/Profile';
import SignupForm from './features/authentication/SignupForm';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            cacheTime: 15 * 60 * 1000,
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
                path: '/signup',
                element: <SignupForm></SignupForm>,
            },
            {
                path: '/post/:postId',
                element: <Post></Post>,
            },
            {
                path: '/submit',
                element: (
                    <ProtectedRoute>
                        <SubmitPost></SubmitPost>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/:username/:tab',
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
            <Toaster
                position='bottom-center'
                gutter={12}
                containerStyle={{ margin: '8px', marginBottom: '100px' }}
                toastOptions={{
                    className: 'bg-white text-gray-700 shadow-lg',
                    success: {
                        duration: 2000,
                        className: 'bg-white text-green-500',
                    },

                    error: {
                        duration: 2000,
                        className: 'bg-white text-red-500',
                    },
                }}
            ></Toaster>
        </QueryClientProvider>
    );
}
