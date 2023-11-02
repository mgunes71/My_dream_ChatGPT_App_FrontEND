import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {DreamService} from "../../services/dream.service";
import {AlertService} from "../../../../shared/modules/ui-kit/alert/alert.service";

import {BaseComponent} from "../../../../core/components/base.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ConfirmationModalComponent
} from "../../../../shared/modules/ui-kit/modals/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-dream-details',
  templateUrl: './dream-details.component.html',
  styleUrls: ['./dream-details.component.scss'],
})
export class DreamDetailsComponent extends BaseComponent {
  dream: any;
  loading = false;

  private onDestroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dreamService: DreamService,
    private alertService: AlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
  }

  override async ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(async ({id}) => {
      await this.dreamService.getApi().getUserDreamById(id).then((res) => {
        this.dream = res;
        console.log(this.dream)
      })
    })
  }

  async deleteDream(id: number) {
    const modal = this.modalService.open(ConfirmationModalComponent, {
      size: 'sm',
      centered: true
    });

    modal.closed.subscribe((async res => {
      await this.dreamService.getApi().deleteDream(id).then(async (deleted: any) => {
        this.loading = false;
        this.alertService.successAlert({title: 'Success', message: 'Dream deleted successfully'});
        await this.router.navigate(['/dream/list']);
      }).catch(err => {
        this.alertService.successAlert({title: 'Success', message: err});
      });
    }));
  }
}
