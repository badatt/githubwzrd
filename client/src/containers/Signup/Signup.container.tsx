import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Box, Button } from 'components';
import ThemeSwitcher from 'containers/ThemeSwitcher/ThemeSwitcher.container';
import cl from './Signup.module.scss';
import { UserActions } from 'actions';

const Signup = () => {
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(UserActions.signup());
  };

  return (
    <Box className={cl.main}>
      <Paper className={cl.content}>
        <h1 className={cl.title}>Hello !</h1>
        <p>
          Githubwzrd is data intensive solution that aims to bring relevant data from your github
          account and project in a friendly way.
        </p>
        <Button text="Sign up" size="lg" type="secondary" fullWidth onClick={handleSignup} />
        <p className={cl.note}>
          * By clicking signup, you consent to share your github data with githubwzrd app. We are
          obliged ONLY to read data.
        </p>
        <div className={cl.themeSwitcher}>
          <ThemeSwitcher />
        </div>
      </Paper>
    </Box>
  );
};

export default Signup;
