import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SourcesApiService } from 'src/api/rest/api/api/sources.service';
import { SMSourceCreateUpdateDto } from 'src/api/rest/api/model/sm-source-create-update-dto';
import { SMSourceDto } from 'src/api/rest/api/model/sm-source-dto';

@Component({
  selector: 'sm-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss'],
})
export class SourcesListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly sourcesApiService: SourcesApiService
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

  add(): void {
    this.isLoading = true;
    const count = this.model.length + 1;
    const newSource: SMSourceCreateUpdateDto = {
      clientId: this.clientId,
      name: `Источник ${count}`,
      type: 'NotSet',
      id: 0,
      rawData: '',
      rawMetadata: '',
      spreadSheetId: 'NOT SET',
      rangeName: 'NOT SET'
    };
    this.sourcesApiService.apiSourcesPost(newSource).subscribe((dto) => {
      this.model.push(dto);
      this.isLoading = false;
    });
  }
}
