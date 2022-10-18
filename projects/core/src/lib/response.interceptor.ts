import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse && event.status === 200) {
            // @ts-ignore
            this.toastrService.success(
              // @ts-ignore
              event.body.message,
              'Thành công',
              {
                timeOut: 1500,
                easeTime: 200,
              }
            );
          }
        },
        (error) => {
          console.log(error);

          this.toastrService.error(error.error.message, 'Xảy ra lỗi', {
            timeOut: 1500,
            easeTime: 200,
          });
        }
      )
    );
  }
}
