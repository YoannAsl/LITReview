import { Link } from 'react-router-dom';

export const SignInPage = () => {
  return (
    <div id="sign-in-page">
      <h2>Sign in to your account</h2>
      <p>
        Or <Link to="/signup">create an account</Link>
      </p>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
