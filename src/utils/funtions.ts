import { MainError } from "../types/error.mysql";

function isMainError(error: unknown): error is MainError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'parent' in error &&
    typeof (error as MainError).parent.code === 'string'
  );
}

export default isMainError;