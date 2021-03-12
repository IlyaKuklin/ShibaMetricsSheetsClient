import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SourcesApiService } from 'src/api/rest/api/api/sources.service';
import { SMReportType } from 'src/api/rest/api/model/sm-report-type';
import { SMSourceCreateUpdateDto } from 'src/api/rest/api/model/sm-source-create-update-dto';
import { SMSourceDto } from 'src/api/rest/api/model/sm-source-dto';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'sm-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss'],
})
export class SourcesListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly sourcesApiService: SourcesApiService,
    private readonly dialogService: DialogService,
    private readonly snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.clientId = Number.parseInt(params.clientId);
      this.sourcesApiService
        .apiSourcesAllGet(this.clientId)
        .subscribe((response: SMSourceDto[]) => {
          this.model = response;
          this.isLoading = false;
        });
    });
  }

  private clientId: number;
  isLoading: boolean;
  model: SMSourceDto[];

  SMReportType = SMReportType;

  add(): void {
    this.dialogService
      .selectOptionDialog({
        header: 'Выбор источника',
        options: ['Google Analytics', 'Yandex Direct'],
      })
      .subscribe((result: string) => {
        if (result) {
          this.isLoading = true;

          let type: SMReportType;
          if (result === 'Google Analytics') type = SMReportType.Ga;
          else if (result === 'Yandex Direct') type = SMReportType.Yd;
          else throw new Error('Not Implemented');

          const count = this.model.length + 1;
          const newSource: SMSourceCreateUpdateDto = {
            clientId: this.clientId,
            name: `Источник ${count}`,
            type: type,
            id: 0,
            rawData: '',
            rawMetadata: '',
            spreadSheetId: 'NOT SET',
            rangeName: 'NOT SET',
          };
          this.sourcesApiService.apiSourcesPost(newSource).subscribe((dto) => {
            this.model.push(dto);
            this.isLoading = false;
          });
        }
      });
  }

  delete(sourceId: number): void {
    this.dialogService
      .confirmDialog({
        header: 'Удаление источника',
        message: 'Вы уверены, что хотите удалить отчёт?',
      })
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.sourcesApiService.apiSourcesDelete(sourceId).subscribe(() => {
            this.snackBarService.show({
              duration: 1000,
              message: 'Удаление завершено',
            });
            this.model = this.model.filter((x) => x.id !== sourceId);
            this.isLoading = false;
          });
        }
      });
  }
}
