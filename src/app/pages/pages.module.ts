import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { FavsComponent } from './favs/favs.component';



@NgModule({
  declarations: [
    AllComponent,
    FavsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
