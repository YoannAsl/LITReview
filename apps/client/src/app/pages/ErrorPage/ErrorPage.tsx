import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <div id="error-page">
      <h1>Oops!</h1>
      <h2>{error.status}</h2>
      <p>{error.statusText}</p>
      {error.data?.message && <p>{error.data.message}</p>}
    </div>
  ) : (
    <div>Oops</div>
  );
};
