import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base-service.service';
import { IPeopleService } from '../interfaces/people-service.interface';
import { Person } from '../../models/person.model';
import { GROUPS_REPOSITORY_TOKEN, PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IPeopleRepository } from '../../repositories/intefaces/people-repository.interface';
import { IGroupsService } from '../interfaces/groups-service.interface';
import { Group } from '../../models/group.model';
import { IGroupsRepository } from '../../repositories/intefaces/groups-repository.interface';
import { Paginated } from '../../models/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService<Group> implements IGroupsService {
  constructor(
    @Inject(GROUPS_REPOSITORY_TOKEN) repository: IGroupsRepository
  ) {
    super(repository);
  }

  getPaginatedGroups(page: number, pageSize: number): Observable<Paginated<Group>> {
    return this.repository.getAll(page, pageSize).pipe(
      map((data) => {
        const groupsArray = Array.isArray(data) ? data : data.data;
        const totalItems = groupsArray.length;
        
        const paginatedData: Paginated<Group> = {
          data: groupsArray.slice((page - 1) * pageSize, page * pageSize),
          page,
          pageSize,
          pages: Math.ceil(totalItems / pageSize),
        };
        return paginatedData;
      })
    );
  }
  
}
