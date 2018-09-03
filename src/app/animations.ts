import { trigger, style, animate, transition, query, group } from '@angular/animations';

export const navigationChange = trigger('navigationChange', [
  transition('* <=> *', [
    group([
      query(':enter', [
        style({ transform: 'translateX(-5%)' }),
        animate('250ms ease-out', style({ transform: 'translateX(0)' })),
      ], { optional: true }),
      query(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-out', style({ opacity: '1' })),
      ], { optional: true })
    ])
  ])
]);
