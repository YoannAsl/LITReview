export const SignUpPage = () => {
  return (
    <div id="sign-up-page">
      <h2>Create an account</h2>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <label htmlFor="password-confirm">Confirm password</label>
        <input type="password" name="password-confirm" id="password-confirm" />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
