import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {debounce, debounceTime, Subject, Subscription} from "rxjs";

@Directive({
  selector : '[appDebounceClick]'
})
export class DebounceClickDirective{

  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter()
  private clicks = new Subject();
  private subscription : Subscription = new Subscription();

  constructor() {}

  ngOnInit(){
    this.subscription = this.clicks.pipe(debounceTime(this.debounceTime)).subscribe( e => this.debounceClick.emit(e))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event : MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
