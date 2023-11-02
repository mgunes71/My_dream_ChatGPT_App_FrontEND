import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DreamService} from "../../services/dream.service";
import {AlertService} from "../../../../shared/modules/ui-kit/alert/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-dream',
  templateUrl: './add-dream.component.html',
  styleUrls: ['./add-dream.component.scss'],
})
export class AddDreamComponent implements OnInit{
  loading = false;

  form: FormGroup = this.fb.group({
    question: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });
  inputText!: string;

  constructor(private readonly fb: FormBuilder, private dreamService: DreamService, private alertService: AlertService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {

  }

  async sendDream() {
    const formValue = this.form.value;
    await this.dreamService.getApi().addDream(formValue).then((res) => {
      this.alertService.successAlert({title: 'success', message: 'Your dream has been sent for interpretation. It will be sent to you as soon as possible.'})
      this.router.navigate(['/']);
    });
    this.form.reset();
  }
}
