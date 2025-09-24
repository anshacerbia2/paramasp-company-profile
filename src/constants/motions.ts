import { Easing, Variants } from "motion";

type CONTAINER_VARIANT = {
  hidden?: {
    opacity?: number;
    x?: number;
    y?: number;
  };

  show?: {
    opacity?: number;
    x?: number;
    y?: number;
    transition?: {
      duration?: number;
      delay?: number;
      staggerChildren?: number;
      when?:
        | "beforeChildren"
        | "afterChildren"
        | "beforeParent"
        | "afterParent";
      ease?: Easing;
    };
  };
};

type ITEM_VARIANT_BASE = {
  index?: number;
  duration?: number;
  initDelay?: number;
  delay?: number;
  oneDir?: boolean;
  staggerChildren?: number;
  when?: "beforeChildren" | "afterChildren" | "beforeParent" | "afterParent";
  ease?: Easing;
};

type ITEM_VARIANT_X = ITEM_VARIANT_BASE & {
  x?: number;
};

type ITEM_VARIANT_Y = ITEM_VARIANT_BASE & {
  y?: number;
};

export const CONTAINER_VARIANT = ({
  hidden,
  show,
}: CONTAINER_VARIANT): Variants => ({
  hidden: hidden ?? {},
  show: show
    ? {
        ...show,
        transition: {
          staggerChildren: 0.2,
          ...(show.transition ?? {}),
        },
      }
    : {
        transition: {
          staggerChildren: 0.2,
        },
      },
});

// export const VARIANT: Variants = {
//   hidden: ({ index, oneDir = true, x = 0, y = 0 }) => ({
//     opacity: 0,
//     x: !oneDir && index !== undefined && index % 2 === 0 ? -x : x,
//     y: !oneDir && index !== undefined && index % 2 === 0 ? -y : y,
//   }),

//   show: ({
//     index,
//     initDelay,
//     delay,
//     duration = 0.4,
//     ease = "easeOut",
//     staggerChildren,
//     when,
//     type = "spring", // default spring
//     stiffness = 120, // control speed (higher = faster)
//     damping = 20, // control bounce (lower = more bounce)
//   }) => ({
//     opacity: 1,
//     x: 0,
//     y: 0,
//     transition: {
//       type, // bisa "spring" | "tween"
//       ...(type === "spring" ? { stiffness, damping } : { duration, ease }),
//       ...((initDelay !== undefined || delay !== undefined) && {
//         delay: (initDelay ?? 0) + (index ?? 1) * (delay ?? 0),
//       }),
//       ...(staggerChildren !== undefined && { staggerChildren }),
//       ...(when !== undefined && { when }),
//     },
//   }),
// };

export const VARIANT: Variants = {
  hidden: ({ index, opacity, oneDir = true, x = 0, y = 0 }) => ({
    opacity: opacity ?? 0,
    x: !oneDir && index !== undefined && index % 2 === 0 ? -x : x,
    y: !oneDir && index !== undefined && index % 2 === 0 ? -y : y,
  }),

  show: ({
    index,
    initDelay,
    delay,
    duration = 0.4,
    ease = "easeOut",
    staggerChildren,
    when,
    type,
    stiffness = 60,
    damping = 20,
  }) => {
    // transition object kosong, diisi berdasarkan user input
    const baseTransition: Record<string, unknown> = {};

    if (type) baseTransition.type = type;

    // spring params (hanya kepake kalau type === "spring")
    if (type === "spring") {
      baseTransition.stiffness = stiffness;
      baseTransition.damping = damping;
    }

    // tween params (hanya kepake kalau type !== "spring" / tween)
    if (type !== "spring") {
      baseTransition.duration = duration;
      baseTransition.ease = ease;
    }

    return {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ...baseTransition,
        ...((initDelay !== undefined || delay !== undefined) && {
          delay: (initDelay ?? 0) + (index ?? 1) * (delay ?? 0),
        }),
        ...(staggerChildren !== undefined && { staggerChildren }),
        ...(when !== undefined && { when }),
      },
    };
  },
};

export const ITEM_VARIANT_X = ({
  index,
  duration = 0.4,
  initDelay,
  delay,
  ease = "easeOut",
  oneDir = true,
  staggerChildren,
  when,
  x = 50,
}: ITEM_VARIANT_X): Variants => ({
  hidden: {
    opacity: 0,
    x: !oneDir && index !== undefined && index % 2 === 0 ? -x : x,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      ease: ease,
      ...((initDelay !== undefined || delay !== undefined) && {
        delay: (initDelay ?? 0) + (index ?? 1) * (delay ?? 0),
      }),
      ...(staggerChildren !== undefined && { staggerChildren }),
      ...(when !== undefined && { when }),
    },
  },
});

export const ITEM_VARIANT_Y = ({
  index,
  duration = 0.4,
  initDelay,
  delay,
  ease = "easeOut",
  oneDir = true,
  staggerChildren,
  when,
  y = 50,
}: ITEM_VARIANT_Y): Variants => ({
  hidden: {
    opacity: 0,
    y: !oneDir && index !== undefined && index % 2 === 0 ? -y : y,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: ease,
      ...((initDelay !== undefined || delay !== undefined) && {
        delay: (initDelay ?? 0) + (index ?? 1) * (delay ?? 0),
      }),
      ...(staggerChildren !== undefined && { staggerChildren }),
      ...(when !== undefined && { when }),
    },
  },
});
