import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { first, fromEvent, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categories') categories!: ElementRef;
  @ViewChild('options') optionsPanel!: ElementRef;
  @ViewChild('list', { static: true }) optionsList!: ElementRef;
  @Output() frameworkWordEmitter = new EventEmitter<string>();
  listSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  emitWord(word: string) {
    this.frameworkWordEmitter.emit(word);
    this.categories.nativeElement.checked = false;
  }

  setFilter(filter: string) {
    // 1. se setea el visor con la opción
    const panelContent = this.optionsPanel.nativeElement;

    const optionsList = this.optionsList.nativeElement as HTMLElement;

    fromEvent<PointerEvent>(optionsList, 'click')
      .pipe(
        map(
          ({ target }) =>
            (target as HTMLElement).closest('.categories__options')?.innerHTML
        ),
        first()
      )
      .subscribe((content) => (panelContent.innerHTML = content));

    // 2. Se guarda en el localStorage
    localStorage.setItem('framework-filter', filter);

    // 3. Se emite la palabra
    this.emitWord(filter);
  }
}
