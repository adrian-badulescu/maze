import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private service: Service, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [""],
      width: ['', [Validators.required]],
      height: ["", [Validators.required]],
      start: [""],
      end: [""],
      density: [""]

    })

  }

  onSubmit() {
    this.service.calcStyles(this.form.value);
  }

}
