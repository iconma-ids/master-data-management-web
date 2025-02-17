import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { AppEventWithContent } from './app-event-with-content';

/**
 * An utility class to manage RX events
 */
@Injectable({
  providedIn: 'root',
})
export class AppEventManager {
  observable: Observable<AppEventWithContent<any> | string>;
  observer: Observer<AppEventWithContent<any> | string> | undefined;

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    
    this.emitChangeSource.next(change);
  }

  constructor() {
    this.observable = new Observable(
      (observer: Observer<AppEventWithContent<any> | string>) => {
        this.observer = observer;
      }
    ).pipe(share());
  }

  /**
   * Method to broadcast the event to observer
   */
  broadcast(event: AppEventWithContent<any> | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   */
  subscribe(eventName: string, callback: any): Subscription {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: AppEventWithContent<any> | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: AppEventWithContent<any> | string) => {
          if (typeof event !== 'string') {
            return event.content;
          }
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method to unsubscribe the subscription
   */
  destroy(subscriber: Subscription): void {
    subscriber.unsubscribe();
  }

  // emitChange(event: AppEventWithContent<any> | string): void {
  //   ;
  //   if (this.observer) {
  //     this.observer.next(event);
  //   }
  // }
}
