import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes
} from "react";

import {
  Check,
  CircleAlert,
  Info,
  Loader2,
  ShieldCheck,
  X
} from "lucide-react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-[#756443] text-white hover:bg-[#625437] shadow-sm hover:shadow-md",

    secondary:
      "bg-[#f8f5ed] text-[#625437] border border-[#c9bea4] hover:bg-[#eee8d8]",

    ghost:
      "text-[#625b4d] hover:bg-[#e5dfd0] hover:text-[#403a2f]",

    danger:
      "bg-[#a94b42] text-white hover:bg-[#8f3d36] shadow-sm"
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl px-4 py-2.5
        text-sm font-semibold
        transition-all duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-2xl
        border border-[#d3cbb8]
        bg-[#faf8f1]/95
        shadow-[0_4px_20px_rgba(77,67,45,0.08)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-xl
        border border-[#cec5af]
        bg-[#fcfaf5]
        px-4 py-3
        text-sm text-[#403a2f]
        outline-none
        transition
        placeholder:text-[#9b927f]
        focus:border-[#9a8962]
        focus:ring-4
        focus:ring-[#b8a77a]/20
        ${props.className ?? ""}
      `}
    />
  );
}

export function Select(
  props: SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className={`
        w-full rounded-xl
        border border-[#cec5af]
        bg-[#fcfaf5]
        px-4 py-3
        text-sm text-[#403a2f]
        outline-none
        focus:border-[#9a8962]
        focus:ring-4
        focus:ring-[#b8a77a]/20
        ${props.className ?? ""}
      `}
    />
  );
}

export function Badge({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "red" | "amber" | "teal";
}) {
  const styles = {
    neutral: "bg-[#e8e2d4] text-[#665f50]",
    green: "bg-[#e3eadb] text-[#526143]",
    red: "bg-[#f3dfdb] text-[#963f38]",
    amber: "bg-[#eee3c7] text-[#806b38]",
    teal: "bg-[#e2e6dc] text-[#58604c]"
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        rounded-full px-2.5 py-1
        text-xs font-semibold
        ${styles[tone]}
      `}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-[#403a2f]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-[#817968]">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#dcd5c5]">
      <div
        className="
          h-full rounded-full
          bg-[#8d7b52]
          transition-all duration-500
        "
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Toast({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      className="
        fixed bottom-5 right-5 z-50
        flex max-w-sm items-center gap-3
        rounded-2xl
        bg-[#403a2f]
        px-4 py-3
        text-sm font-medium text-white
        shadow-xl
        animate-slide-up
      "
    >
      <Check size={18} className="text-[#c8d0b8]" />

      {message}

      <button
        onClick={onClose}
        className="ml-2 opacity-70 hover:opacity-100"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function AIWarning() {
  return (
    <div
      className="
        flex items-start gap-3
        rounded-xl
        border border-[#d6ccb4]
        bg-[#eee9dc]
        p-3
        text-sm text-[#5e5545]
      "
    >
      <ShieldCheck
        size={18}
        className="mt-0.5 shrink-0 text-[#756443]"
      />

      <div>
        <strong className="text-[#514832]">
          AI-assisted draft.
        </strong>{" "}
        Information shown here is for assistance only and must be
        verified by a qualified healthcare professional.
      </div>
    </div>
  );
}

export function Loading({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-[#817968]">
      <Loader2
        size={20}
        className="animate-spin-slow text-[#756443]"
      />
      {text}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-xl
        border border-[#ded7c7]
        bg-[#f2eee4]
        p-4
        text-sm text-[#817968]
      "
    >
      <Info size={18} className="text-[#8d7b52]" />
      {text}
    </div>
  );
}

export function AlertIcon({
  high = false
}: {
  high?: boolean;
}) {
  return high ? (
    <CircleAlert
      className="text-[#a94b42]"
      size={20}
    />
  ) : (
    <Check
      className="text-[#65744e]"
      size={20}
    />
  );
}