import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits an element's text into word spans wrapped in an overflow-hidden mask,
 * ready for a line-mask reveal. Returns the created word elements.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? '';
  el.textContent = '';
  el.classList.add('split-parent');
  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((chunk) => {
    if (chunk.trim() === '') {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const mask = document.createElement('span');
    mask.className = 'word-mask';
    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.textContent = chunk;
    mask.appendChild(inner);
    el.appendChild(mask);
    words.push(inner);
  });
  return words;
}

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}

/** Simple fade/translate reveal driven by scroll. */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  opts: RevealOptions = {},
) {
  const { y = 40, duration = 1.1, stagger = 0.08, delay = 0, start = 'top 82%' } =
    opts;
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: targets as gsap.DOMTarget,
        start,
      },
    },
  );
}

/** Line-mask heading reveal. Splits into words, animates them up. */
export function revealHeading(el: HTMLElement, start = 'top 85%') {
  const words = splitWords(el);
  gsap.set(el, { autoAlpha: 1 });
  return gsap.fromTo(
    words,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start },
    },
  );
}
