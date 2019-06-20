import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {EmployeeRepository, Employee, Education, Experience} from 'src/modules/employee';
import {ContentfulClient} from 'src/modules/contentful';

import {EMPLOYEE_CONTENT_TYPE, EDUCATION_CONTENT_TYPE, EXPERIENCE_CONTENT_TYPE} from './content-types';

@Injectable()
export class EmployeeRepositoryContentful implements EmployeeRepository {
    constructor(private client:ContentfulClient) {}

    getEmployeeEntries():Observable<Employee[]> {
        return <Observable<Employee[]>>this.client.getEntries<Employee>(EMPLOYEE_CONTENT_TYPE);
    }

    getEducationEntries():Observable<Education[]> {
        return <Observable<Education[]>>this.client.getEntries<Education>(EDUCATION_CONTENT_TYPE);
    }

    getExperienceEntries():Observable<Experience[]> {
        return <Observable<Experience[]>>this.client.getEntries<Experience>(EXPERIENCE_CONTENT_TYPE);
    }
}
