import {Action, ReducerType, reduce} from 'src/modules/redux';
import {EmployeeState} from './state';
import {
    setEmployee,
    setAvatarUrl,
    setEducation,
    setExperience,
    setCurrentPosition,
    setExpertise,
} from './reducers';
import {
    SET_EMPLOYEE,
    SET_AVATAR_URL,
    SET_EDUCATION,
    SET_CURRENT_POSITION,
    SET_EXPERIENCE,
    SET_EXPERTISE,
} from './action-types';

export const actionReducerMap = new Map<string, ReducerType<EmployeeState>>([
    [SET_EMPLOYEE, setEmployee],
    [SET_AVATAR_URL, setAvatarUrl],
    [SET_EDUCATION, setEducation],
    [SET_CURRENT_POSITION, setCurrentPosition],
    [SET_EXPERIENCE, setExperience],
    [SET_EXPERTISE, setExpertise],
]);

export function reducer(state:EmployeeState, action:Action):EmployeeState {
    return reduce<EmployeeState>(
        () => new EmployeeState(),
        actionReducerMap,
        state,
        action,
    );
}