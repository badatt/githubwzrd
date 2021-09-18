import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';
import { Accordion, AccordionBody, AccordionItem, AccordionSummary, Loader } from 'components';
import cl from './Pulls.module.scss';
import { STATUS } from 'literals';
import * as View from './Pulls.view';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { data, isLoading } = useShallowEqualSelector(({ pulls }) => ({
    data: pulls.relatedPulls?.data,
    isLoading: pulls.loadingPullsStatus,
  }));

  useMount(() => {
    dispatch(PullsAction.getPulls());
  });

  return (
    <div className={cl.main}>
      <div className={cl.header}></div>
      <div className={cl.content}>
        {isLoading === STATUS.RUNNING && <Loader centered />}
        {isLoading === STATUS.SUCCESS && (
          <Accordion>
            {data?.map(d => {
              return (
                <AccordionItem expanded key={d.repoName}>
                  <AccordionSummary>
                    <View.RepoTitle title={d.repoName} />
                  </AccordionSummary>
                  <AccordionBody>
                    <View.RelatePullData relatedPullData={d} />
                  </AccordionBody>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
};
