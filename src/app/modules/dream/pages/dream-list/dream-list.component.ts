import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DreamService} from "../../services/dream.service";
import * as moment from 'dayjs';
import {Subject, takeUntil} from "rxjs";
import * as _ from 'lodash';
import {BaseComponent} from "../../../../core/components/base.component";

@Component({
  selector: 'app-dream-list',
  templateUrl: './dream-list.component.html',
  styleUrls: ['./dream-list.component.scss'],
})
export class DreamListComponent extends BaseComponent{
  dreams: any[] = [];
  dreamView: any[] = [];
  searchedKeyword = '';
  private onDestroy$ = new Subject();

  constructor(private dreamService: DreamService, private cdr: ChangeDetectorRef) {
    super();
  }

  override async ngOnInit():Promise<any> {
    await this.dreamService.getUserDreams();
    this.dreamService.dreams.pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dreams = _.orderBy(res,['createdAt'], ['desc']);
      this.dreamView = this.dreams;
    });
  }

  searchDream() {
    if (this.searchedKeyword.trim() === '') {
      this.dreamView = this.dreams;
      return
    }

    const keyword = this.searchedKeyword.trim().toLowerCase();
    console.log(this.dreamView)
    this.dreamView = this.dreams.filter(dr => dr.name.includes(keyword.toLowerCase()) || moment(dr.createdAt).format('YYYY-MM-DD').includes(keyword));
    this.cdr.markForCheck();
  }
}
