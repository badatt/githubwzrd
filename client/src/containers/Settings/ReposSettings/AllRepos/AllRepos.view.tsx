import React from 'react';
import { PlusCircleIcon } from 'icons';
import cl from './AllRepos.module.scss';

export const RepoAddBtn = () => {
  return (
    <button className={cl.repoAddBtn}>
      <PlusCircleIcon className={cl.repoAddBtnIcon} />
    </button>
  );
};
