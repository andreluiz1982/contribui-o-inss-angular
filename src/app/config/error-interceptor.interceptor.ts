import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorService } from '../service/error.service';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private snack : MatSnackBar, private errorService : ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
    .pipe(

      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          errorMsg = `Ocorreu um erro: ${error.status},  Message: ${error.error.message}
          , Descrição: ${error.error.description}`;
        }
        this.errorService.showError(errorMsg)

        return throwError(errorMsg);
      })
    );
  }
}
