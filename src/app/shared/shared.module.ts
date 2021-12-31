import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { BlackFormComponent } from './components/black-form/black-form.component';

@NgModule({
  declarations: [
    BlackFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BlackFormComponent
  ]
})
export class SharedModule { }
