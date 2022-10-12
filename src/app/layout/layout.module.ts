import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FirstModule } from './first/first.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    FirstModule,
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
