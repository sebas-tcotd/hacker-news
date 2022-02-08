import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { first, fromEvent, map, Subscription, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

/** Component that shows the framework filter dropdown. */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  /** Property referencing the entire dropdown */
  @ViewChild('categories') categories!: ElementRef;

  /** Property referencing the dropdown selector */
  @ViewChild('options', { static: true }) optionsPanel!: ElementRef;

  /** Property referencing the dropdown list */
  @ViewChild('list', { static: true }) optionsList!: ElementRef;

  /** Emitter issuing the framework word for the parent component */
  @Output() frameworkWordEmitter = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

  /** @ignore */
  ngOnInit(): void {
    setTimeout(
      () =>
        this.filterService.filter$
          .pipe(
            tap((filter) => this.setSelectedOption(filter, true)),
            first()
          )
          .subscribe((filter) => this.setFilter(filter)),
      500
    );
  }

  /**
   * Emits the word to the parent component.
   * @param word The framework word.
   */
  emitWord(word: string): void {
    this.frameworkWordEmitter.emit(word);
    this.categories.nativeElement.checked = false;
  }

  /**
   * Sets the filter persistently.
   * @param filter The framework word for being filtered.
   */
  setFilter(filter: string): void {
    this.setSelectedOption(filter);

    this.filterService.saveFilter(filter);

    this.emitWord(filter);
  }

  /**
   * Sets the option dropdown by the filter.
   * @param filter The framework word for being filtered.
   * @param comesFromService Parameter if determines the method in called within the service subscription.
   * @returns A subscription for the click event if it's called from the service.
   */
  private setSelectedOption(
    filter: string,
    comesFromService: boolean = false
  ): Subscription | undefined {
    const panelContent = this.optionsPanel.nativeElement;
    const optionsList = this.optionsList.nativeElement as HTMLElement;

    if (!filter) return;

    if (!comesFromService) {
      return fromEvent<PointerEvent>(optionsList, 'click')
        .pipe(
          map(
            ({ target }) =>
              (target as HTMLElement).closest('.categories__options')?.innerHTML
          ),
          first()
        )
        .subscribe((content) => (panelContent.innerHTML = content));
    }

    const option = document.getElementById(filter);
    panelContent.innerHTML = option?.innerHTML;
    return;
  }
}
