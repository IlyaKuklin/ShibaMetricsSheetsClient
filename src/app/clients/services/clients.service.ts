import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ClientCreateUpdateDto,
  ClientDto,
} from 'src/api/rest/api/model/models';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  currentEditedClientDto: ClientCreateUpdateDto;

  editedClientDto = new Subject<ClientDto>();
}
