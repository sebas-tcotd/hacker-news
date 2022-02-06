import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeadlineComponent } from './headline/headline.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, HeadlineComponent, TimeAgoPipe, SidebarComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, HeadlineComponent],
})
export class SharedModule {}
