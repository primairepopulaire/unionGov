/** Params for the app's log helper function */
type Params = {
    message: string;
    /** Defaults to log */
    type?: 'warn' | 'debug' | 'log';
    context?: Record<string, unknown>;
}

const logger = ({ message, context, type = 'log' }: Params) => {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(message)
    console.log('type', type)
    console.log('context', context)
    console.groupEnd()
  }
}

export default logger
