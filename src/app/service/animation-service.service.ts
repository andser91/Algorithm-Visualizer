import { Injectable } from '@angular/core';
import {Timer} from "../model/timer";
import {Animation} from "../model/animation/animation";
import {TerminationAnimation} from "../model/animation/terminationAnimation";
import {SvgLine} from "../model/svgLine";
import {animation} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class AnimationServiceService {

  public timers: Array<Timer> = new Array<Timer>()

  constructor() {}

  executeAnimations(array : Array<SvgLine> ,animations: Array<Animation>) {
    let animationTime = 12000/animations.length
    animations.push(new TerminationAnimation(this, array))
    for (let i = 0; i < animations.length; i++) {
      let timer = new Timer(() => {
          animations[i].animate();
      }, i * animationTime)
      this.timers.push(timer);
    }

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

}
