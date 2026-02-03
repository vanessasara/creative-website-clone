import { gsap }                    from 'gsap';
import { ScrollTrigger }          from 'gsap/ScrollTrigger';
import { SplitText }              from 'gsap/SplitText';
import { ScrambleTextPlugin }     from 'gsap/ScrambleTextPlugin';
import { Flip }                   from 'gsap/Flip';
import { Draggable }              from 'gsap/Draggable';
import { MotionPathPlugin }       from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin }          from 'gsap/DrawSVGPlugin';

// Side-effect: registers all 6 custom eases via CustomEase.create()
import './easings';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  Flip,
  Draggable,
  MotionPathPlugin,
  DrawSVGPlugin,
);

export {
  gsap,
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  Flip,
  Draggable,
  MotionPathPlugin,
  DrawSVGPlugin,
};
