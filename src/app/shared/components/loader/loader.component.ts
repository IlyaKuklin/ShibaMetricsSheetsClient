import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../services/loader.service';

@Component({
  selector: 'sm-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.loaderSubject.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

  show: boolean = false;

  private subscription: Subscription;

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
