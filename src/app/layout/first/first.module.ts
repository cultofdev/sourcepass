import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent, Form, Question } from './first.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    FirstComponent
  ],
  exports: [
    FirstComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    Form,
    Question
  ]
})
export class FirstModule { }
