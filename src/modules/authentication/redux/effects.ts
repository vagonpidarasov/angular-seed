import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, exhaustMap, tap, withLatestFrom, filter} from 'rxjs/operators';

import {toPayload} from 'src/modules/redux-helpers';
import {normalizeError} from 'src/modules/error';

import {AuthenticationRepository} from '../authentication.repository';
import {AuthenticationPayload, AuthenticationResponse} from '../interfaces';
import {SignInDialogService} from '../sign-in-dialog.service';
import {FeatureState as AuthFeatureState} from './feature';

import {
    AuthenticationActions,
    SignInFail,
    SetProgress,
    SignInSuccess,
    SetError,
} from './actions';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private actions$:Actions,
        private store:Store<AuthFeatureState>,
        private authenticationRepository:AuthenticationRepository,
        private signInDialogService:SignInDialogService,
    ) {}

    @Effect() SignInEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.SIGN_IN),
        map(toPayload),
        exhaustMap((payload:AuthenticationPayload) => this.authenticate(payload)),
    );

    private authenticate(payload:AuthenticationPayload) {
        return this.authenticationRepository.authenticate(payload).pipe(
            map((response:AuthenticationResponse) => new SignInSuccess({username: response.username})),
            catchError((e:any) => of(new SignInFail(normalizeError(e)))),
        );
    }

    @Effect() SingInFailEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.SIGN_IN_FAIL),
        map(toPayload),
        map((payload:any) => new SetError(payload)),
    );

    @Effect() ResetErrorEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.SIGN_IN),
        map(() => new SetError(null)),
    );

    @Effect() SetProgressEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.SIGN_IN),
        map(() => new SetProgress(true)),
    );

    @Effect() ResetProgressEffect$:Observable<Action> = this.actions$.pipe(
        ofType(
            AuthenticationActions.SIGN_IN_SUCCESS,
            AuthenticationActions.SIGN_IN_FAIL,
        ),
        map(() => new SetProgress(false)),
    );

    @Effect() SingInSuccessEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.SIGN_IN_SUCCESS),
        withLatestFrom(this.store, (a:Action, s:AuthFeatureState) => s.authentication.authenticationRequest),
        filter((authenticationRequest:Action) => !!authenticationRequest)
    );

    /**
     * @Effect opens dialog upon AUTHENTICATION_REQUEST
     */
    @Effect({dispatch: false})
    OpenDialogEffect$:Observable<Action> = this.actions$.pipe(
        ofType(AuthenticationActions.AUTHENTICATION_REQUEST),
        tap(() => this.signInDialogService.open()),
    );

    /**
     * @Effect opens dialog upon AUTHENTICATION_DISCARD or SIGN_IN_SUCCESS
     */
    @Effect({dispatch: false})
    CloseDialogEffect$:Observable<Action> = this.actions$.pipe(
        ofType(
            AuthenticationActions.SIGN_IN_SUCCESS,
            AuthenticationActions.AUTHENTICATION_DISCARD,
        ),
        tap(() => this.signInDialogService.close()),
    );
}
