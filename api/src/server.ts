Promise = require('bluebird'); // eslint-disable-line no-global-assign
import app from './app';
import vars from './config/vars';
import logger from './config/logger';

app.listen(vars.port, () => logger.info(`server started on port ${vars.port} in ${vars.nodeEnv}`));

export default app;
