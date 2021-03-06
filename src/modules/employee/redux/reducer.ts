import {Action, ReducerType, reduce} from 'yet-another-redux-helpers';
import {EmployeeState} from './state';
import {
    setEmployee,
    setAvatarUrl,
    setExpertise,
    setAddress,
    setFilename,
    setBackgroundUrl,
} from './reducers';
import {
    SET_EMPLOYEE,
    SET_AVATAR_URL,
    SET_EXPERTISE,
    SET_EMPLOYEE_ADDRESS,
    SET_FILENAME,
    SET_BACKGROUND_URL,
} from './action-types';

export const actionReducerMap = new Map<string, ReducerType<EmployeeState>>([
    [SET_EMPLOYEE, setEmployee],
    [SET_AVATAR_URL, setAvatarUrl],
    [SET_BACKGROUND_URL, setBackgroundUrl],
    [SET_EXPERTISE, setExpertise],
    [SET_EMPLOYEE_ADDRESS, setAddress],
    [SET_FILENAME, setFilename],
]);

export function reducer(state:EmployeeState, action:Action):EmployeeState {
    return reduce<EmployeeState>(
        () => new EmployeeState(),
        actionReducerMap,
        state,
        action,
    );
}
