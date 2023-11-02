import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({template: ''})
export class BaseComponent implements OnInit, OnDestroy {
  $onDestroy: Subject<void> = new Subject<void>();
  processing: boolean = false;

  constructor() {
  }

  async ngOnInit() {
    await this.OnInit();
  }

  async ngOnDestroy() {
    this.$onDestroy.next();
    this.$onDestroy.unsubscribe();

    await this.OnDestroy();
  }

  async OnInit(): Promise<void> {
  }

  async OnDestroy(): Promise<void> {
  }
}
