const sizeClass = (s?: "sm" | "md" | "lg") => {
  switch (s) {
    case "sm": return "w-4 h-4";
    case "lg": return "w-6 h-6";
    default: return "w-5 h-5";
  }
};

// Более четкие иконки с увеличенным strokeWidth
const STROKE_WIDTH = 2.5;

export function IconMenu({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function IconX({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function IconHome({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function IconGrid({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

export function IconHeart({ className = "", size, filled }: { className?: string; size?: "sm" | "md" | "lg"; filled?: boolean }) {
  if (filled) {
    return (
      <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L12 8.344l3.172-3.172a4 4 0 115.656 5.656L12 19.656l-8.828-8.828a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

export function IconCart({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

export function IconUser({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export function IconTelegram({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.611-.06-2.35-.438-.72-.382-1.126-.625-1.823-1.002-.854-.459-1.34-.756-2.17-1.213-.255-.14-.5-.3-.72-.46-.44-.32-1.04-.75-.99-1.27.02-.25.27-.5.74-.77 1.84-.96 3.07-1.59 4.18-2.28.36-.22.69-.44 1-.66.34-.27.65-.5.94-.68.27-.18.52-.32.73-.42.2-.1.38-.17.53-.22.14-.05.27-.08.39-.09z" />
    </svg>
  );
}

export function IconTruck({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h-1m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

export function IconCreditCard({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

export function IconShield({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export function IconChevronRight({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function IconFilter({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

export function IconSearch({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={STROKE_WIDTH} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
