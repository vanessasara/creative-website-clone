import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// ALL cubic-bezier values are LOCKED — do not modify.
CustomEase.create('ease-primary',    '0.87, 0, 0.13, 1');
CustomEase.create('ease-secondary',  '0.31, 0.75, 0.22, 1');
CustomEase.create('ease-fade',       '0.76, 0, 0.24, 1');
CustomEase.create('ease-preloader',  '0.64, 0.04, 0.42, 0.99');
CustomEase.create('ease-transition', '0.16, 1, 0.35, 1');
CustomEase.create('ease-button',     '0.16, 1, 0.3, 1');
