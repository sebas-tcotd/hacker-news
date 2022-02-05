import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { FavsComponent } from './favs/favs.component';
import { HomeComponent } from './home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AllComponent, FavsComponent, HomeComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [HomeComponent],
})
export class PagesModule {}
