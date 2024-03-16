import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorType } from '../models/error-type.model';
import { LogicError } from '../models/logic.exception';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
	public catch(error: Error, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		console.error(error);

		if (error instanceof LogicError) {
			response.status(HttpStatus.BAD_REQUEST).json({
				type: 'LOGIC_ERROR',
				errorType: error.type,
			});
			return;
		}

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			type: 'LOGIC_ERROR',
			errorType: ErrorType.GENERIC,
		});
	}
}
