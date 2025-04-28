import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doublCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => {
      console.log('Counter changed:', this.counter());
    })
  }

  increment() {
    // this.counter.update(oldCounter => oldCounter + 1);
    this.counter.set(this.counter() + 1);
    this.actions.mutate(oldActions => oldActions.push('INCREMENT'));
  }
  decrement() {
    this.counter.update(oldCounter => oldCounter - 1);
    //this.actions.update(oldActions => [...oldActions, 'DECREMENT']);
    this.actions.mutate(oldActions => oldActions.push('DECREMENT'));
  }
}

