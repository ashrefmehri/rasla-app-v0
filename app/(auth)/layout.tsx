/**
 * Auth pages: exactly one screen (h-dvh, never scrolls), no Lenis,
 * no landing header/footer. Only AuthShell's white sheet may scroll inside.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return <div className="flex h-dvh flex-col overflow-hidden bg-surface">{children}</div>;
}
