import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { first, fromEvent, map, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @ViewChild('categories') categories!: ElementRef;
  @ViewChild('options', { static: true }) optionsPanel!: ElementRef;
  @ViewChild('list', { static: true }) optionsList!: ElementRef;
  @Output() frameworkWordEmitter = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

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

  emitWord(word: string) {
    this.frameworkWordEmitter.emit(word);
    this.categories.nativeElement.checked = false;
  }

  setFilter(filter: string) {
    // 1. se setea el visor con la opción
    this.setSelectedOption(filter);

    // 2. Se guarda en el localStorage
    this.filterService.saveFilter(filter);

    // 3. Se emite la palabra
    this.emitWord(filter);
  }

  private setSelectedOption(filter: string, comesFromService: boolean = false) {
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
