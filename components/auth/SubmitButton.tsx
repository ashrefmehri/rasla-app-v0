import { ArrowIcon } from "@/components/landing/icons";
import { controlHeight } from "./rhythm";

/** Primary pill submit with a loading state (spinner + label, disabled). */
export function SubmitButton({
  loading,
  children,
  loadingLabel,
}: {
  loading: boolean;
  children: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${controlHeight} flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-teal-700 text-base font-semibold text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-800 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-surface/40 border-t-surface motion-reduce:animate-none"
          />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <ArrowIcon />
        </>
      )}
    </button>
  );
}

export const textLink =
  "cursor-pointer font-medium text-teal-700 underline-offset-2 hover:underline";
