import React from 'react';
import cl from './ReposSettings.module.css';
import AllRepos from './AllRepos/AllRepos.container';
import UserRepos from './UserRepos/UserRepos.container';

const ReposSettings: React.FC = () => {
  /* const handleReposSettingsSubmit = (data: any) => {
    dispatch(SettingsActions.saveUserRepos(Object.keys(data).filter(d => data[d])));
  }; */

  return (
    <div className={cl.main}>
      <AllRepos />
      <UserRepos />
    </div>
  );
};

export default ReposSettings;
