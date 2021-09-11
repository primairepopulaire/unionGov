export type ErrorReport = {
  error: Error;
  context?: Record<string, unknown>;
}

/** Drive where you report the errors across the app */
const handleError = ({ error, context }: ErrorReport) => {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(`[ERROR] ${error.message}`)
    console.log('error', error)
    console.log('context', context)
    console.groupEnd()
  }
}

export default handleError
