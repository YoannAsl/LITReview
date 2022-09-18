import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <>
      <header id="header">
        <h1>BookReview</h1>
      </header>
      <Outlet />
    </>
  );
};
