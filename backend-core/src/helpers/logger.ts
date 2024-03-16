import { Injectable, LoggerService } from '@nestjs/common';
import dayjs from 'dayjs';
import { createWriteStream } from 'fs';

let LOG_FILE_AVAILABLE = false;

const LOG_FILE_STREAM = createWriteStream(`/logs/${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.log`, { flags: 'a' });

LOG_FILE_STREAM.on('open', () => {
	LOG_FILE_AVAILABLE = true;
});

@Injectable()
export class CustomLogger implements LoggerService {
	private formatString(message: any, ...optionalParams: any[]): string {
		if (typeof message === 'string') {
			return message.replace(/{([0-9]+)}/g, (match, index) =>
				typeof optionalParams[index] === 'undefined' ? match : optionalParams[index]
			);
		}
		return message;
	}

	private logToConsole(level: string, message: any, ...optionalParams: any): void {
		const parameter = optionalParams[0] || [];
		const m = `${new Date().toISOString()} [${level}] [${parameter[parameter.length - 1]}] ${this.formatString(message, parameter)}`;
		// eslint-disable-next-line no-console
		console.log(m);
		if (LOG_FILE_AVAILABLE) {
			LOG_FILE_STREAM.write(`${m}\n`);
		}
	}

	public log(message: any, ...optionalParams: any): void {
		this.logToConsole('LOG    ', message, optionalParams);
	}

	public error(message: any, ...optionalParams: any): void {
		this.logToConsole('ERROR  ', message, optionalParams);
	}

	public warn(message: any, ...optionalParams: any): void {
		this.logToConsole('WARN   ', message, optionalParams);
	}

	public debug?(message: any, ...optionalParams: any): void {
		this.logToConsole('DEBUG  ', message, optionalParams);
	}

	public verbose?(message: any, ...optionalParams: any): void {
		this.logToConsole('VERBOSE', message, optionalParams);
	}
}
