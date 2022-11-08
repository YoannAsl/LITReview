import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './app/pages/ErrorPage/ErrorPage';

import { HomePage } from './app/pages/HomePage/HomePage';
import { SignInPage } from './app/pages/SignInPage/SignInPage';
import { Root } from './app/pages/Root/Root';
import { SignUpPage } from './app/pages/SignUpPage/SignUpPage';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ],
  },
]);

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
