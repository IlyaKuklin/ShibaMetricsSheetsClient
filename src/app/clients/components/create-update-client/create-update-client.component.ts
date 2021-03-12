import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientCreateUpdateDto } from 'src/api/rest/api';
import { ClientsApiService } from 'src/api/rest/api/api/clients.service';
import { SMErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'sm-create-update-client',
  templateUrl: './create-update-client.component.html',
  styleUrls: ['./create-update-client.component.scss'],
})
export class CreateUpdateClientComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly clientsApiService: ClientsApiService,
    private readonly clientsService: ClientsService
  ) {
    if (this.data) this.isEdit = true;
  }

  @ViewChild('clientForm') clientForm: NgForm;

  isLoading: boolean;
  isEdit: boolean;
  errorStateMatcher = new SMErrorStateMatcher();

  model: ClientCreateUpdateDto;

  ngOnInit(): void {
    if (this.clientsService.currentEditedClientDto) {
      this.model = { ...this.clientsService.currentEditedClientDto };
    } else {
      this.model = {
        name: '',
        description: '',
      };
    }
  }

  submit(): void {
    if (!this.clientForm.valid) return;
    this.isLoading = true;

    if (this.isEdit) {
      this.clientsApiService
        .apiClientsUpdatePatch(this.model)
        .subscribe((response) => {
          this.clientsService.editedClientDto.next(response);
        });
    } else {
      this.clientsApiService
        .apiClientsCreatePost(this.model)
        .subscribe((response) => {
          this.clientsService.editedClientDto.next(response);
        });
    }
  }

  ngOnDestroy(): void {
    this.clientsService.currentEditedClientDto = null;
  }
}
