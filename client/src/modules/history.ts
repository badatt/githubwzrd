// eslint-disable-next-line import/no-self-import
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.location = {
  ...history.location,
  state: {},
};

/* istanbul ignore next */
history.listen(() => {
  history.location = {
    ...history.location,
    state: history.location.state || {},
  };
});

const { go, goBack, push, replace } = history;

const locationIdGenerator = (loc: string): string => loc.toLowerCase().replace(/\W/gi, '-');

export { go, goBack, push, replace, locationIdGenerator };
export default history;
