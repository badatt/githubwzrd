import React from 'react';
import { PlusCircleIcon } from 'icons';
import cl from './AllRepos.module.scss';

export const RepoAddBtn = (props: { id?: string }) => {
  return (
    <button className={cl.repoAddBtn} id={props.id}>
      <PlusCircleIcon className={cl.repoAddBtnIcon} />
    </button>
  );
};
