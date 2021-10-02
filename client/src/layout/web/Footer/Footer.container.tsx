import React, { Fragment } from 'react';
import { useShallowEqualSelector } from 'modules/hooks';
import cl from './Footer.module.scss';

export default () => {
  const { rateLimit, data } = useShallowEqualSelector(({ user }) => ({
    rateLimit: user.rateLimit,
    data: user.data,
  }));

  let resetTime;

  if (rateLimit?.resetAt) {
    const resetDate = new Date(rateLimit?.resetAt!!);
    const currentDate = new Date();
    resetTime = Math.ceil((Number(resetDate) - Number(currentDate)) / 60000);
  }

  return (
    <Fragment>
      <footer className={cl.main}>
        <hr className={cl.separator} />
        <main className={cl.footer}>
          <div>{data.org}</div>
          <p className={cl.rateLimit}>
            {rateLimit && (
              <>
                <u>{rateLimit?.remaining}</u> of {rateLimit?.limit} Github API requests consumed
                till now.
              </>
            )}
            {resetTime && <> Resets in {resetTime} minutes.</>}
          </p>
        </main>
      </footer>
    </Fragment>
  );
};
