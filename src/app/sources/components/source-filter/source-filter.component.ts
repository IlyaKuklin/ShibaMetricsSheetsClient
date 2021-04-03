import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SMSourceFilter, SMSourceFilterOperator } from 'src/api/rest/api';

@Component({
  selector: 'sm-source-filter',
  templateUrl: './source-filter.component.html',
  styleUrls: ['./source-filter.component.scss'],
})
export class SourceFilterComponent implements OnInit {
  constructor() {}

  operators = SMSourceFilterOperator;
  operatorKeys: string[];

  @Input() options: string[];
  @Input() model: SMSourceFilter[];
  @Output() onChange = new EventEmitter<SMSourceFilter[]>();

  ngOnInit(): void {
    this.operatorKeys = Object.keys(this.operators);
    if (!this.model) this.model = [];
    else {
      this.model.forEach((x) => {
        const key = Object.keys(SMSourceFilterOperator)[x.operator];
        x.operator = key;
      });
    }
  }

  addFilter(): void {
    this.model.push({
      name: '',
      operator: undefined,
      values: '',
    });
    this.onChange.emit(this.model);
  }

  removeFilter(filter: SMSourceFilter): void {
    this.model = this.model.filter((x) => x !== filter);
    this.onChange.emit(this.model);
  }

  //private getOperatorTypeByIndex()
}
