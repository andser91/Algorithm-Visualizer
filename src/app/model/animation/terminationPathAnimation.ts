import {AnimationServiceService} from "../../service/animation-service.service";
import {Animation} from "./animation";

export class TerminationPathAnimation extends Animation{

  private animationService: AnimationServiceService;

  constructor(animationService: AnimationServiceService) {
    super();
    this.animationService = animationService;

  }

  animate(): void {
    // this.animationService.clearResources();
  }
}
