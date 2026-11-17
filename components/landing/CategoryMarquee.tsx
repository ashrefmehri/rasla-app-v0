const categories = [
  "Mode",
  "Cosmétiques",
  "Accessoires",
  "Déco maison",
  "Électronique",
  "Fait main",
  "Bijoux",
  "Chaussures",
  "Enfants",
  "Épicerie fine",
];

function Chips({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 gap-3 pe-3 ${hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pe-0"}`}
    >
      {categories.map((c) => (
        <li
          key={c}
          className="rounded-full border border-border bg-surface-alt px-4 py-2 text-[15px] whitespace-nowrap text-ink-subtle"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite marquee (CSS only, so it stays a server component).
 * Reduced motion: the copy is hidden and the list wraps, centered.
 */
export function CategoryMarquee() {
  return (
    <section
      aria-labelledby="categories-title"
      className="mx-auto flex max-w-7xl flex-col items-center gap-5 py-10"
    >
      <p id="categories-title" className="px-2 text-center text-[15px] font-medium text-ink">
        Pensé pour les boutiques tunisiennes qui vendent sur Facebook
      </p>
      <div className="group w-full cursor-default overflow-hidden select-none mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:mask-none">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <Chips />
          <Chips hidden />
        </div>
      </div>
    </section>
  );
}
