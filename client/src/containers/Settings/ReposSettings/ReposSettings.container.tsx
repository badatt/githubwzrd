import React from 'react';
import cl from './ReposSettings.module.scss';
import AllRepos from './AllRepos/AllRepos.container';
import UserRepos from './UserRepos/UserRepos.container';

export default () => {
  return (
    <div className={cl.main}>
      <AllRepos />
      <UserRepos />
    </div>
  );
};
