import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { first, fromEvent, map, Subscription, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('categories') categories!: ElementRef;
  @ViewChild('options') optionsPanel!: ElementRef;
  @ViewChild('list', { static: true }) optionsList!: ElementRef;
  @Output() frameworkWordEmitter = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.filterService.filter$
      .pipe(
        tap((filter) => this.setFilter(filter, true)),
        first()
      )
      .subscribe();
  }

  emitWord(word: string) {
    this.frameworkWordEmitter.emit(word);
    this.categories.nativeElement.checked = false;
  }

  setFilter(filter: string, isFromService: boolean = false) {
    // 1. se setea el visor con la opción
    const panelContent = this.optionsPanel.nativeElement;

    const optionsList = this.optionsList.nativeElement as HTMLElement;

    if (!isFromService) {
      fromEvent<PointerEvent>(optionsList, 'click')
        .pipe(
          map(
            ({ target }) =>
              (target as HTMLElement).closest('.categories__options')?.innerHTML
          ),
          first()
        )
        .subscribe((content) => (panelContent.innerHTML = content));
    } else {
      if (filter) {
        const option = document.getElementById(filter);
        panelContent.innerHTML = option?.innerHTML;
      }
      return;
    }

    // 2. Se guarda en el localStorage
    this.filterService.setFilter(filter);

    // 3. Se emite la palabra
    this.emitWord(filter);
  }
}
