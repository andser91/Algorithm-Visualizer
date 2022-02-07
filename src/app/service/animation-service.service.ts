import {EventEmitter, Injectable} from '@angular/core';
import {Timer} from "../model/timer";
import {Animation} from "../model/animation/animation";
import {SvgLine} from "../model/svgLine";
import {TerminationPathAnimation} from "../model/animation/terminationPathAnimation";
import {TerminationSortingAnimation} from "../model/animation/terminationSortingAnimation";

@Injectable({
  providedIn: 'root'
})
export class AnimationServiceService {

  public timers: Array<Timer> = new Array<Timer>()
  animationFinishedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  executeSortingAnimations(array: Array<SvgLine>, animations: Array<Animation>, velocity: number) {
    let animationTime = AnimationServiceService.calculateAnimationTime(animations.length, velocity)
    for (let i = 0; i < animations.length; i++) {
      let timer = new Timer(() => {
        animations[i].animate();
      }, i * animationTime)
      this.timers.push(timer);
    }

    this.timers.push(new Timer(() => {
      new TerminationSortingAnimation(this, array).animate();
      this.animationFinishedEvent.emit();
    }, 25000 - velocity * 1000));
  }

    executeSearchAnimations(animations: Array<Animation>, velocity: number) {
    let animationTime = 22 - velocity
    for (let i = 0 ; i < animations.length; i++) {
      let timer = new Timer(() => {
        animations[i].animate();
      }, i * animationTime)
      this.timers.push(timer);
    }

    this.timers.push(new Timer(() => {
      new TerminationPathAnimation(this).animate();
      this.animationFinishedEvent.emit();
    }, animations.length * animationTime));
  }

  executeInstantSearchAnimations(animations: Array<Animation>) {
    for (let i = 0; i < animations.length; i++) {
      animations[i].animate();
    }
    new TerminationPathAnimation(this).animate();
    this.animationFinishedEvent.emit();
  }


  pauseAnimations() {
    for (let i = 0; i < this.timers.length; i++) {
      this.timers[i].pause();
      this.timers[i].paused = true;
    }
  }

  resumeAnimations() {
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].remaining >= 0) {
        this.timers[i].resume();
        this.timers[i].paused = false;
      }
    }
  }

  clearResources() {
    for (let i = 0; i < this.timers.length; i++) {
      this.timers[i].clear();
    }
    this.timers = []
  }

  private static calculateAnimationTime(length: number, velocity: number): number {
    return (25000 - velocity * 1000) / length;
  }
}
