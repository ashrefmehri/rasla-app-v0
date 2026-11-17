import type { ComponentProps, ReactNode } from "react";
import { controlHeight } from "./rhythm";

const inputBase =
  `${controlHeight} w-full rounded-xl border bg-surface px-3.5 text-base font-normal text-ink placeholder:text-ink-muted focus:border-teal-700 lg:text-[15px]`;

export type AuthFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  /** Helper under the label (e.g. why we ask for the phone). */
  description?: string;
  error?: string;
  /** Error styling without an error message (the hint carries the text). */
  invalid?: boolean;
  /** Under the input; linked with aria-describedby. */
  hint?: ReactNode;
  /** Announce hint changes (password strength). */
  hintLive?: boolean;
  /** End of the label row (e.g. "Mot de passe oublié ?"). */
  labelAside?: ReactNode;
  /** Fixed text before the value (e.g. "+216"). */
  prefix?: string;
  /** Inside the input, at the end (e.g. show/hide button). */
  trailing?: ReactNode;
  /** Extra content between the input and the hint (e.g. strength bar). */
  below?: ReactNode;
};

/**
 * Label + input + hint + inline error, all wired with aria-describedby.
 * Input text is 16px below lg so iOS doesn't zoom.
 */
export function AuthField({
  id,
  label,
  description,
  error,
  invalid,
  hint,
  hintLive,
  labelAside,
  prefix,
  trailing,
  below,
  className = "",
  ...input
}: AuthFieldProps) {
  const descId = `${id}-desc`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [description && descId, hint && hintId, error && errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {labelAside}
      </div>
      {description && (
        <p id={descId} className="-mt-1 text-[13px] text-ink-muted">
          {description}
        </p>
      )}
      <div className="relative">
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-px start-px flex items-center rounded-s-[11px] border-e border-border bg-surface-alt px-3 text-base text-ink-subtle select-none lg:text-[15px]"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          aria-invalid={error || invalid ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputBase} ${error || invalid ? "border-error" : "border-control-border"} ${prefix ? "ps-19" : ""} ${trailing ? "pe-12" : ""}`}
          {...input}
        />
        {trailing && <div className="absolute inset-y-0 end-1 flex items-center">{trailing}</div>}
      </div>
      {below}
      {hint && (
        <p id={hintId} aria-live={hintLive ? "polite" : undefined} className="text-[13px]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
