// import { ErrnoException } from 'node:';

/**
 * Type guard for checking if the passed object is an Error instance
 * @param error
 * @returns
 */
export const isError = (error: unknown): error is Error => error instanceof Error;

/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 * @author Joseph JDBar Barron
 * @link https://dev.to/jdbar
 */
export function instanceOfNodeError<T extends new (...args: any) => Error>(
	value: Error,
	errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
	return value instanceof errorType;
}

export const isFileNotFoundError = (error: any): error is Error & NodeJS.ErrnoException => {
	return instanceOfNodeError(error, Error) && error.code === 'ENOENT';
}
