import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = new Date();
    const requestId = uuidv4();
    console.log(`\n--------------------------------------\n`);

    const requestLog = JSON.parse(JSON.stringify(request.body));
    delete requestLog?.from;

    console.log(`New Request`);
    console.log(`ID: ${requestId}`);
    console.log(`Date: ${start.toISOString()}`);
    console.log(`${request.method}: ${request.url}`);
    console.log(`Body: ${JSON.stringify(requestLog, null, 2)}`);

    console.log(`\n--------------------------------------\n`);

    return next.handle().pipe(
      tap((data) => {
        const end = new Date();
        console.log(`\n--------------------------------------\n`);

        console.log(`Response for Request ${requestId}`);
        console.log(`Date: ${end.toISOString()}`);
        console.log(`${request.method}: ${request.url}`);
        console.log(`Duration: ${end.getTime() - start.getTime()} ms`);

        const responseLog = JSON.parse(JSON.stringify(data));

        console.log(`Body: ${JSON.stringify(responseLog, null, 2)}`);

        console.log(`\n--------------------------------------\n`);
      }),
    );
  }
}
