import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <>
      <header id="header">
        <h1>LITReview</h1>
      </header>
      <Outlet />
    </>
  );
};
