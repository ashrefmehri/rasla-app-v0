"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/landing/icons";
import { AuthField, type AuthFieldProps } from "./AuthField";

/** AuthField with a show/hide button. */
export function PasswordField(props: Omit<AuthFieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);
  return (
    <AuthField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
          aria-controls={props.id}
          className="flex size-10 cursor-pointer items-center justify-center rounded-md text-ink-muted hover:bg-surface-alt"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
}
