import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { first, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarCheck') sidebarCheck!: ElementRef;
  @ViewChild('options') options!: ElementRef;
  @Output() frameworkWordEmitter = new EventEmitter<string>();
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.filterService.filter$
      .pipe(
        first(),
        tap((filter) => {
          console.log(filter), this.setFilter(filter);
        })
      )
      .subscribe();
  }

  emitWord(word: string) {
    this.sidebarCheck.nativeElement.checked = false;
    this.frameworkWordEmitter.emit(word);
  }

  resetState() {
    const options = document.querySelectorAll('.sidebar__item');
    options.forEach((listItem) =>
      listItem.classList.remove('sidebar__item--is-active')
    );
  }

  setFilter(filter: string) {
    this.resetState();

    const option = document.getElementById(`sidebar-${filter}`);
    option?.classList.add('sidebar__item--is-active');

    this.filterService.setFilter(filter);

    this.emitWord(filter);
  }
}
