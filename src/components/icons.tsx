export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.75 14.5A8.5 8.5 0 0 1 9.5 3.25a.5.5 0 0 0-.6-.7A9.5 9.5 0 1 0 21.45 15.1a.5.5 0 0 0-.7-.6z" />
    </svg>
  );
}

export function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
    >
      <span
        className={`bg-foreground h-px w-5 transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
      />
      <span
        className={`bg-foreground h-px w-5 transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
      />
    </span>
  );
}

export function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.05-.78-.09-1.98.02-2.83.1-.77 1.06-4.9 1.06-4.9s-.27-.54-.27-1.34c0-1.25.73-2.19 1.63-2.19.77 0 1.14.58 1.14 1.27 0 .77-.49 1.93-.75 3-.21.89.45 1.62 1.33 1.62 1.6 0 2.83-1.69 2.83-4.12 0-2.15-1.55-3.66-3.76-3.66-2.56 0-4.06 1.92-4.06 3.9 0 .77.3 1.6.67 2.05a.27.27 0 0 1 .06.26c-.07.29-.23.9-.26 1.03-.04.17-.14.21-.31.13-1.16-.54-1.88-2.24-1.88-3.6 0-2.93 2.13-5.62 6.14-5.62 3.22 0 5.72 2.3 5.72 5.37 0 3.2-2.02 5.78-4.82 5.78-.94 0-1.83-.49-2.13-1.07l-.58 2.2c-.21.8-.78 1.81-1.16 2.42A10 10 0 1 0 12 2z" />
    </svg>
  );
}
