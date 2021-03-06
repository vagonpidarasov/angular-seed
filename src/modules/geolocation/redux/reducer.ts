import {Action} from '@ngrx/store';
import {ReducerType} from 'yet-another-redux-helpers';
import {GeolocationState} from './state';
import {SetGeolocation} from './actions';
import {SET_GEOLOCATION, RESET_GEOLOCATION} from './action-types';

export function setGeolocation(state:GeolocationState, action:SetGeolocation):GeolocationState {
    state.position = action.payload;
    return state;
}

export function resetGeolocation(state:GeolocationState):GeolocationState {
    state.position = null;
    return state;
}

const actions = new Map<string, ReducerType<GeolocationState>>();

actions.set(SET_GEOLOCATION, setGeolocation);
actions.set(RESET_GEOLOCATION, resetGeolocation);

export function GeolocationReducer(
    state:GeolocationState = new GeolocationState(),
    action:Action,
):GeolocationState {
    const actionMethod = actions.get(action.type);
    return actionMethod ? actionMethod(Object.assign(new GeolocationState(), state), action) : state;
}
