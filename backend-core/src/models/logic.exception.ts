import { ErrorType } from './error-type.model';

export class LogicError extends Error {
	public type: ErrorType;

	public constructor(type: ErrorType) {
		super(type.toString());
		this.type = type;
	}
}
