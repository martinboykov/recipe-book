import { NotificationService } from '../logging/notification.service';
import { Router } from '@angular/router';
import { ErrorHandler, Injectable, Injector, NgZone, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from './httpError.model';
import { ErrorService } from './error.service';
import { SlackErrorLoggingService } from './slack-logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  public readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

  constructor(
    @Inject(NgZone) private ngZone,
    @Inject(Injector) private injector: Injector,
  ) { }

  private get router(): Router { return this.injector.get(Router); }
  private get errorService(): ErrorService { return this.injector.get(ErrorService); }
  private get notifier(): NotificationService { return this.injector.get(NotificationService); }
  private get loggerSlack(): SlackErrorLoggingService { return this.injector.get(SlackErrorLoggingService); }

  public handleError(error: Error | HttpErrorResponse) {
    this.ngZone.run(() => {
      let message;
      let stackTrace;
      let httpErrorCode;
      if (error instanceof HttpErrorResponse) {
        // Server Error
        message = this.errorService.getServerMessage(error);
        stackTrace = this.errorService.getServerStack(error);
        httpErrorCode = error.status;
        // console.log(httpErrorCode);
        switch (httpErrorCode) {
          case HttpError.ERR_CONNECTION_REFUSED: // 0
            this.notifier.showError('There is no connection to the server', 'Server down');
            this.loggerSlack.logError(`>>>>>>>>>SERVER ERROR
            ${message}`, stackTrace);
            break;
          case HttpError.BAD_REQUEST: // 400
            this.notifier.showError(message, this.DEFAULT_ERROR_TITLE);
            break;
          case HttpError.UNAUTHORIZED: // 401
            this.notifier.showError(message, 'Unauthenticated attempt');
            // this.notifier.showError('Please, login!', 'Unauthenticated attempt');
            return this.router.navigateByUrl('/auth/login');
            break;
          case HttpError.FORBIDDEN: // 403
            this.notifier.showError('Oooops', 'Access denied!');
            return this.router.navigateByUrl('/auth/login');
            // this.notifier.showError('You are not authorized to perform this action', 'Access denied!');
            break;
          case HttpError.NOT_FOUND: // 404
            this.notifier.showError(message, 'Not found!');
            break;
          case HttpError.TIMEOUT: // 408
            this.notifier.showError('Too much time has elapsed', 'Not fount in time!');
            break;
          case HttpError.INTERNAL_SERVER_ERROR: // 500
            this.loggerSlack.logError(`>>>>>>>>>SERVER ERROR
          ${message}`, stackTrace);
            this.notifier.showError('Invalid route or possible server crash', this.DEFAULT_ERROR_TITLE);
            break;
          case HttpError.SERVER_REQUEST_LIMIT_REACHED: // 429
            this.loggerSlack.logError(`>>>>>>>>>SERVER ERROR
          ${message}`, stackTrace);
            break;

          default:
            this.loggerSlack.logError(message, stackTrace);
            this.notifier.showError('App is recovering from crash', this.DEFAULT_ERROR_TITLE);
        }
      } else {
        // Client Error
        message = this.errorService.getClientMessage(error);
        stackTrace = this.errorService.getClientStack(error);
        this.loggerSlack.logError(`>>>>>>>>>CLIENT ERROR
        ${message}`, stackTrace);
        // this.loggerSentry.logError(error);
        this.notifier.showError(this.DEFAULT_ERROR_TITLE, 'Ooops!');
      }
      this.router.navigate(['/']);
    });
  }
}
