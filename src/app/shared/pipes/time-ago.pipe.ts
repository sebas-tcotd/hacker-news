import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return 'A long time ago';

    let time = (Date.now() - Date.parse(value)) / 1000;

    if (time < 10) return 'Just now';
    else if (time < 60) return 'A moment ago';

    const timeDividers = [60, 60, 24, 30, 12];
    const timeLapse = [' second', ' minute', ' hour', ' day', ' month', ' year'];

    let i;
    for (i = 0; Math.floor(time / timeDividers[i]) > 0; i++) {
      time /= timeDividers[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';

    return `${Math.floor(time)} ${timeLapse[i] + plural} ago`;
  }
}
