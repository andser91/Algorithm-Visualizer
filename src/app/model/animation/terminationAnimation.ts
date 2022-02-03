import {Animation} from "./animation";
import {SvgLine} from "../svgLine";
import {AnimationServiceService} from "../../service/animation-service.service";

export class TerminationAnimation extends Animation {

  private animationService: AnimationServiceService;
  private readonly array: Array<SvgLine>;

  constructor(animationService: AnimationServiceService, array: Array<SvgLine>) {
    super();
    this.animationService = animationService;
    this.array = array;
  }

  animate(): void {
    this.animationService.clearResources();
    this.array.forEach(elem => {
      if (elem.color !== "green"){
        elem.color = "green";
      }
    });
  }
}
