import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  /**
   * Uso del debouncer para determinar un periodo de tiempo en
   * el cual se va a esperar para poder mandar a llamar el
   * siguiente metodo, en este caso el subscribe.
   */
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(500)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }

  buscar(): void {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(): void {
    this.debouncer.next(this.termino);
  }
}
