import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeadlineComponent } from './headline/headline.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [HeaderComponent, HeadlineComponent, TimeAgoPipe],
  imports: [CommonModule],
  exports: [HeaderComponent, HeadlineComponent],
})
export class SharedModule {}
