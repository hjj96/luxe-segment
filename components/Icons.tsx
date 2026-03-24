// Иконки LS — тонкие штриховые там, где уместно премиальное ощущение
const sizeClass = (s?: "sm" | "md" | "lg") => {
  switch (s) {
    case "sm":
      return "w-4 h-4";
    case "lg":
      return "w-6 h-6";
    default:
      return "w-[1.125rem] h-[1.125rem]";
  }
};

/** Премиальное меню — три линии, stroke */
export function IconMenu({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg
      className={`${sizeClass(size)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconX({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function IconHome({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function IconGrid({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

export function IconHeart({ className = "", size, filled }: { className?: string; size?: "sm" | "md" | "lg"; filled?: boolean }) {
  const path =
    "M16.2857 3C14.5714 3 13.0476 3.75978 12 4.99441C10.9524 3.75978 9.33333 3 7.61905 3C4.57143 3 2 5.56425 2 8.60335C2 8.7933 2 8.98324 2 9.17318C2.38095 13.8268 7.33333 17.7207 10.2857 19.5251C10.7619 19.8101 11.3333 20 12 20C12.5714 20 13.1429 19.8101 13.7143 19.5251C16.6667 17.6257 21.619 13.8268 22 9.17318C22 8.98324 22 8.7933 22 8.60335C22 5.56425 19.4286 3 16.2857 3Z";
  if (filled) {
    return (
      <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d={path} />
      </svg>
    );
  }
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.2857 3C14.5714 3 13.0476 3.75978 12 4.99441C10.9524 3.75978 9.33333 3 7.61905 3C4.57143 3 2 5.56425 2 8.60335C2 8.7933 2 8.98324 2 9.17318C2.38095 13.8268 7.33333 17.7207 10.2857 19.5251C10.7619 19.8101 11.3333 20 12 20C12.5714 20 13.1429 19.8101 13.7143 19.5251C16.6667 17.6257 21.619 13.8268 22 9.17318C22 8.98324 22 8.7933 22 8.60335C22 5.56425 19.4286 3 16.2857 3Z" />
    </svg>
  );
}

export function IconCart({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
    </svg>
  );
}

export function IconUser({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export function IconTelegram({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M16.8799 21.513L22.877 3.92164C23.4767 2.22247 21.7775 0.523306 20.0784 1.12301L2.487 7.12007C0.48798 7.81972 0.48798 10.6183 2.58695 11.2181L8.48405 12.8173C9.78342 13.2171 10.8829 14.2166 11.1827 15.5159L12.7819 21.413C13.3817 23.512 16.1803 23.512 16.8799 21.513Z" />
    </svg>
  );
}

export function IconSearch({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  );
}

export function IconTrash({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 16 16" aria-hidden>
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
    </svg>
  );
}

export function IconTruck({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M9.56443 8.73049L10.0789 10.5926C10.5639 12.3481 10.8064 13.2259 11.5194 13.6252C12.2323 14.0244 13.1374 13.7892 14.9474 13.3188L16.8673 12.8199C18.6774 12.3495 19.5824 12.1143 19.9941 11.4227C20.4057 10.7312 20.1632 9.85344 19.6782 8.09788L19.1638 6.2358C18.6788 4.48023 18.4363 3.60244 17.7233 3.20319C17.0103 2.80394 16.1052 3.03915 14.2952 3.50955L12.3753 4.00849C10.5652 4.47889 9.66021 4.71409 9.24856 5.40562C8.83692 6.09714 9.07943 6.97493 9.56443 8.73049Z" />
      <path d="M2.27749 5.24694C2.38823 4.84781 2.80157 4.61402 3.2007 4.72476L4.9044 5.19744C5.82129 5.45183 6.5469 6.15866 6.80003 7.07489L8.95106 14.8609L9.10935 15.4075C9.74249 15.6438 10.2863 16.0866 10.6314 16.6747L10.9414 16.579L19.8115 14.2739C20.2124 14.1697 20.6219 14.4102 20.7261 14.8111C20.8303 15.212 20.5897 15.6214 20.1888 15.7256L11.3515 18.0223L11.0228 18.1238C11.0161 19.3947 10.1392 20.5555 8.81236 20.9003C7.22189 21.3136 5.58709 20.3982 5.16092 18.8556C4.73476 17.313 5.67861 15.7274 7.26908 15.3141C7.3479 15.2936 7.42682 15.2764 7.5057 15.2623L5.35419 7.47433C5.24592 7.08242 4.92897 6.76092 4.50338 6.64284L2.79968 6.17016C2.40054 6.05942 2.16675 5.64608 2.27749 5.24694Z" />
    </svg>
  );
}

export function IconCreditCard({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" />
    </svg>
  );
}

export function IconShield({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 256 256" aria-hidden>
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM104,184H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16ZM56,128a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H64A8,8,0,0,1,56,128Zm105.79,57.58a4,4,0,0,1-3.58,0C156.65,184.8,120,166.17,120,140a22,22,0,0,1,40-12.64A22,22,0,0,1,200,140C200,166.17,163.35,184.8,161.79,185.58ZM192,88H64a8,8,0,0,1,0-16H192a8,8,0,0,1,0,16Z" />
    </svg>
  );
}

export function IconChevronRight({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function IconFilter({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h10M4 17h16M14 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4M4 12h12M12 20h8" />
    </svg>
  );
}
