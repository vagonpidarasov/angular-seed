import {Injectable} from '@angular/core';
import {INIT} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {Action, toPayload} from 'src/modules/redux';

import {Experience} from '../experience.model';
import {ExperienceRepository} from '../experience.repository';
import {
    ResolveExperience,
    ResolveExperienceSuccess,
    ResolveExperienceFail,
    SetExperience,
    SetCurrentPosition,
} from './actions';

@Injectable()
export class ExperienceEffects {
    private getExperienceEntries():Observable<Action> {
        return this.experienceRepository.getExperienceEntries().pipe(
            map((response:any[]) => new ResolveExperienceSuccess(response)),
            catchError((e:PositionError) => of(new ResolveExperienceFail(e))),
        );
    }

    constructor(
        private actions$:Actions,
        private experienceRepository:ExperienceRepository,
    ) {}

    @Effect() InitEffect$:Observable<Action> = this.actions$.pipe(
        ofType(INIT),
        map(() => new ResolveExperience()),
    );

    @Effect() ResolveExperienceEffect$:Observable<Action> = this.actions$.pipe(
        ofType(ResolveExperience.type),
        switchMap(() => this.getExperienceEntries()),
    );

    @Effect() ResolveExperienceSuccessEffect$:Observable<Action> = this.actions$.pipe(
        ofType(ResolveExperienceSuccess.type),
        map(toPayload),
        map((payload:Experience[]) => payload
            .filter((entry:Experience) => entry.isCurrentPosition !== true)
            .sort((a:Experience, b:Experience) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        ),
        map((payload:Experience[]) => new SetExperience(payload)),
    );

    @Effect() SetCurrentPositionEffect$:Observable<Action> = this.actions$.pipe(
        ofType(ResolveExperienceSuccess.type),
        map(toPayload),
        map((payload:Experience[]) => payload.find((entry:Experience) => entry.isCurrentPosition === true)),
        map((payload:Experience) => new SetCurrentPosition(payload)),
    );
}