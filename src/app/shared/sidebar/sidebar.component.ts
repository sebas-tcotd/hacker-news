import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { first, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

/** Component that shows the sidebar only in mobile resolution. */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit {
  /** Property referencing the check status of the sidebar. */
  @ViewChild('sidebarCheck') public sidebarCheck!: ElementRef;

  /** Property referencing the framework options list. */
  @ViewChild('options') public options!: ElementRef;

  /** Emitter issuing the framework word to be searched in the parent component. */
  @Output() public frameworkWordEmitter = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

  /** @ignore */
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

  /**
   * Emits the word to the parent component.
   * @param word The word to be emitted.
   */
  public emitWord(word: string): void {
    this.sidebarCheck.nativeElement.checked = false;
    this.frameworkWordEmitter.emit(word);
  }

  /** Removes the active state of the options list. */
  public resetState(): void {
    const options = document.querySelectorAll('.sidebar__item');
    options.forEach((listItem) =>
      listItem.classList.remove('sidebar__item--is-active')
    );
  }

  /**
   * Sets the filter status in the sidebar, stores it in LocalStorage and emits it to the parent component.
   * @param filter The framework word to be set.
   */
  public setFilter(filter: string): void {
    this.resetState();

    const option = document.getElementById(`sidebar-${filter}`);
    option?.classList.add('sidebar__item--is-active');

    this.filterService.saveFilter(filter);

    this.emitWord(filter);
  }
}
