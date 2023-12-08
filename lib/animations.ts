export const SpringTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export type BasicRevealAnimationOptions = {
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number | string;
  delay?: number;
  exitDelay?: number;
  duration?: number;
  ease?: number[];
};

export const basicEase = [0.16, 0.3, 0.3, 1];
export const naturalEaseOut = [0.6, 0.0, 0.3, 1];
export const naturalEaseIn = [0.0, 0.6, 0.3, 1];

export const basicRevealAnimation = ({
  direction = "up",
  distance = 40,
  delay = 0,
  exitDelay = delay,
  duration = 1.4,
  ease = basicEase
}: BasicRevealAnimationOptions = {}) => ({
  initial: {
    opacity: 0,
    y:
      direction === "none"
        ? 0
        : direction === "up"
        ? distance
        : direction === "down"
        ? typeof distance === "number"
          ? -distance
          : `-${distance}`
        : 0,
    x:
      direction === "none"
        ? 0
        : direction === "left"
        ? distance
        : direction === "right"
        ? typeof distance === "number"
          ? -distance
          : `-${distance}`
        : 0
  },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: {
    opacity: 0,
    y:
      direction === "none"
        ? 0
        : direction === "up"
        ? distance
        : direction === "down"
        ? typeof distance === "number"
          ? -distance
          : `-${distance}`
        : 0,
    x:
      direction === "none"
        ? 0
        : direction === "left"
        ? distance
        : direction === "right"
        ? typeof distance === "number"
          ? -distance
          : `-${distance}`
        : 0,
    transition: {
      duration,
      ease,
      delay: exitDelay
    }
  },
  transition: {
    duration,
    ease,
    delay
  }
});
