type ScrollCallback = (scrollY: number) => void;

const subscribers = new Set<ScrollCallback>();
let animationFrame = 0;
let listening = false;

function flush() {
  animationFrame = 0;
  const scrollY = window.scrollY;
  for (const callback of subscribers) callback(scrollY);
}

function requestFlush() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(flush);
}

export function onScrollFrame(callback: ScrollCallback): () => void {
  subscribers.add(callback);

  if (!listening) {
    window.addEventListener("scroll", requestFlush, { passive: true });
    window.addEventListener("resize", requestFlush);
    listening = true;
  }

  callback(window.scrollY);

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && listening) {
      window.removeEventListener("scroll", requestFlush);
      window.removeEventListener("resize", requestFlush);
      listening = false;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  };
}
