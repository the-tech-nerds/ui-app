import {
  Catch,
  HttpStatus,
} from '@nestjs/common';

interface Error {
  status: number;
  message: string;
}

@Catch()
export class ErrorHandler {
  constructor(
    private readonly response: any,
    private readonly error: Error,
  ) {}

  handle() {
    const { status, message } = this.error;
    if(status !== HttpStatus.NOT_FOUND) {
      return this.response.status(status || 500).json({
        message,
        status,
        code: status,
        data: null,  
      });
    }
  }
}
