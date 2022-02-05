import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeadlineComponent } from './headline/headline.component';

@NgModule({
  declarations: [HeaderComponent, HeadlineComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, HeadlineComponent],
})
export class SharedModule {}
