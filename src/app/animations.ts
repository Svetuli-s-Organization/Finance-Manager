import { trigger, state, style, animate, transition, query, group } from '@angular/animations';

export const navigationChange = trigger('navigationChange', [
  transition('* <=> *', [
    query(':enter', [
      style({
        position: 'absolute'
      })
    ], { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-5%)' }),
        animate('100ms ease-out', style({ transform: 'translateX(0)' }))
      ], { optional: true })
    ])
  ])
]);
