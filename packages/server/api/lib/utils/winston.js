// const winston = require('winston');
const appRoot = require('app-root-path');
const moment = require('moment-timezone');
const JSON = require('flatted');
const { createLogger, format, transports } = require('winston');

const { combine, label, printf } = format;

// formats
const myFormatFile = printf(
  (info) =>
    `${info.timestamp} [${info.level}]: ${info.label} - ${
      typeof info.message === 'object'
        ? JSON.stringify(info.message)
        : info.message
    }`,
);
const myFormatConsole = printf(
  (info) =>
    ` ℹ️ ${
      typeof info.message === 'object'
        ? JSON.stringify(info.message)
        : info.message
    }`,
);

const appendTimestamp = format((info, opts) => {
  if (opts.tz) {
    return {
      ...info,
      timestamp: moment().tz(opts.tz).format(),
    };
  }
  return info;
});

const customFormat = combine(
  label({ label: 'main' }),
  appendTimestamp({ tz: 'Europe/Copenhagen' }),
  myFormatFile,
);

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: myFormatConsole,
  },
};

const logger = createLogger({
  transports: [new transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

// for morgan generated outputs
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = {
  logger,
};
