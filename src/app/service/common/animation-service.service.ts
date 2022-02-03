import {EventEmitter, Injectable} from '@angular/core';
import {Timer} from "../../model/timer";
import {Animation} from "../../model/animation/animation";
import {TerminationAnimation} from "../../model/animation/terminationAnimation";
import {SvgLine} from "../../model/svgLine";

@Injectable({
  providedIn: 'root'
})
export class AnimationServiceService {

  public timers: Array<Timer> = new Array<Timer>()
  animationFinishedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  executeAnimations(array: Array<SvgLine>, animations: Array<Animation>, velocity: number) {
    let animationTime = AnimationServiceService.calculateAnimationTime(animations.length, velocity)
    for (let i = 0; i < animations.length; i++) {
      let timer = new Timer(() => {
        animations[i].animate();
      }, i * animationTime)
      this.timers.push(timer);
    }

    this.timers.push(new Timer(() => {
      new TerminationAnimation(this, array).animate();
      this.animationFinishedEvent.emit();
    }, 25000 - velocity * 1000));
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
