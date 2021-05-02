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
    console.log(this.error.message);
    // if (status === HttpStatus.UNAUTHORIZED) {
    //   return this.response.redirect('/logout');
    // } 

    // console.log(this.error);
    // else if(status === HttpStatus.NOT_FOUND){
    //   this.response.redirect('/404');
    // } 
    if(status !== HttpStatus.NOT_FOUND) {
      return this.response.status(status).json({
        message,
        status,
        code: status,
        data: null,  
      });
    }
  }
}
