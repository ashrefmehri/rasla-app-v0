import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
      className={`pointer-events-none select-none ${props.className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export const ArrowIcon = (p: P) => (
  <Svg size={18} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const PlayIcon = (p: P) => (
  <Svg size={18} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5v14l11-7z" />
  </Svg>
);

export const CheckIcon = (p: P) => (
  <Svg size={16} strokeWidth={2.4} {...p}>
    <path d="M5 12l5 5 9-10" />
  </Svg>
);

export const SparkleIcon = (p: P) => (
  <Svg size={18} strokeWidth={2.2} {...p}>
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
  </Svg>
);

export const DressIcon = (p: P) => (
  <Svg size={34} strokeWidth={1.6} {...p}>
    <path d="M9 3l3 2 3-2 3 4-2 2v12H8V9L6 7z" />
  </Svg>
);

export const ChatIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
  </Svg>
);

export const CartIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 6h15l-1.5 9h-12z" />
    <path d="M6 6L5 3H2" />
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
  </Svg>
);

export const EyeIcon = (p: P) => (
  <Svg size={18} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const EyeOffIcon = (p: P) => (
  <Svg size={18} {...p}>
    <path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.6 3.5M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
  </Svg>
);

export const PersonIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Svg>
);
