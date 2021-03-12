import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientDto } from 'src/api/rest/api';
import { ClientsApiService } from 'src/api/rest/api/api/clients.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ClientsService } from '../../services/clients.service';
import { CreateUpdateClientComponent } from '../create-update-client/create-update-client.component';

@Component({
  selector: 'sm-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  constructor(
    private readonly clientsApiService: ClientsApiService,
    private readonly clientsService: ClientsService,
    private readonly snackBarService: SnackbarService,
    private readonly router: Router,
    public dialog: MatDialog
  ) {
    this.clientsService.editedClientDto.subscribe((dto) => {
      this.onEditCreateComplete(dto);
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.clientsApiService.apiClientsGetAllGet().subscribe((response) => {
      this.model = response;
      this.isLoading = false;
    });
  }

  isLoading: boolean;
  model: Array<ClientDto>;

  delete(id: number): void {
    // TODO: в сервис
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Удаление',
        message: 'Вы уверены, что хотите удалить клиента?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.clientsApiService.apiClientsDeleteDelete(id).subscribe(
          (response) => {
            this.model = this.model.filter((c) => c.id !== id);
            this.isLoading = false;
            this.snackBarService.show({
              duration: 1000,
              message: 'Удаление завершено',
            });
          },
          (err) => {
            console.error(err);
            this.isLoading = false;
          }
        );
      }
    });
  }

  addClick(): void {
    this.dialog.open(CreateUpdateClientComponent);
  }

  editClick(id: number) {
    this.clientsService.currentEditedClientDto = this.model.find(
      (x) => x.id === id
    );

    this.dialog.open(CreateUpdateClientComponent, {
      data: { id: id },
    });
  }

  onEditCreateComplete(dto: ClientDto): void {
    this.dialog.closeAll();
    let current = this.model.find((x) => x.id === dto.id);
    if (current) {
      const index = this.model.indexOf(current);
      this.model[index] = dto;
    } else this.model.push(dto);
  }

  goToSources(clientId: number): void {
    this.router.navigate([`/clients/${clientId}/sources`]);
  }
}
