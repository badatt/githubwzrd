import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { jwtStrategy } from './config/passport';
import routes from './routes';
import { validator, notFound, defaultHandler } from './middlewares/error';
import { sort } from './middlewares/response';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(sort());

// home path
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use(validator);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(defaultHandler);

export default app;
