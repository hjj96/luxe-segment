// Иконки для сайта LS
const sizeClass = (s?: "sm" | "md" | "lg") => {
  switch (s) {
    case "sm": return "w-4 h-4";
    case "lg": return "w-6 h-6";
    default: return "w-5 h-5";
  }
};

// Кнопка вызова бокового меню (4 квадрата)
export function IconMenu({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 56 56" aria-hidden>
      <path d="M 34.4335 26.0664 L 45.0976 26.0664 C 48.0976 26.0664 49.5743 24.5664 49.5743 21.4727 L 49.5743 10.9961 C 49.5743 7.9023 48.0976 6.4258 45.0976 6.4258 L 34.4335 6.4258 C 31.4570 6.4258 29.9570 7.9023 29.9570 10.9961 L 29.9570 21.4727 C 29.9570 24.5664 31.4570 26.0664 34.4335 26.0664 Z M 10.9023 26.0664 L 21.5898 26.0664 C 24.5663 26.0664 26.0663 24.5664 26.0663 21.4727 L 26.0663 10.9961 C 26.0663 7.9023 24.5663 6.4258 21.5898 6.4258 L 10.9023 6.4258 C 7.9257 6.4258 6.4257 7.9023 6.4257 10.9961 L 6.4257 21.4727 C 6.4257 24.5664 7.9257 26.0664 10.9023 26.0664 Z M 10.9023 49.5742 L 21.5898 49.5742 C 24.5663 49.5742 26.0663 48.0977 26.0663 45.0039 L 26.0663 34.5039 C 26.0663 31.4336 24.5663 29.9336 21.5898 29.9336 L 10.9023 29.9336 C 7.9257 29.9336 6.4257 31.4336 6.4257 34.5039 L 6.4257 45.0039 C 6.4257 48.0977 7.9257 49.5742 10.9023 49.5742 Z M 34.4335 49.5742 L 45.0976 49.5742 C 48.0976 49.5742 49.5743 48.0977 49.5743 45.0039 L 49.5743 34.5039 C 49.5743 31.4336 48.0976 29.9336 45.0976 29.9336 L 34.4335 29.9336 C 31.4570 29.9336 29.9570 31.4336 29.9570 34.5039 L 29.9570 45.0039 C 29.9570 48.0977 31.4570 49.5742 34.4335 49.5742 Z" />
    </svg>
  );
}

export function IconX({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function IconHome({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function IconGrid({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

// Лайк (избранное) — заливка для filled, контур для outline
export function IconHeart({ className = "", size, filled }: { className?: string; size?: "sm" | "md" | "lg"; filled?: boolean }) {
  const path = "M16.2857 3C14.5714 3 13.0476 3.75978 12 4.99441C10.9524 3.75978 9.33333 3 7.61905 3C4.57143 3 2 5.56425 2 8.60335C2 8.7933 2 8.98324 2 9.17318C2.38095 13.8268 7.33333 17.7207 10.2857 19.5251C10.7619 19.8101 11.3333 20 12 20C12.5714 20 13.1429 19.8101 13.7143 19.5251C16.6667 17.6257 21.619 13.8268 22 9.17318C22 8.98324 22 8.7933 22 8.60335C22 5.56425 19.4286 3 16.2857 3Z";
  if (filled) {
    return (
      <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d={path} />
      </svg>
    );
  }
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.2857 3C14.5714 3 13.0476 3.75978 12 4.99441C10.9524 3.75978 9.33333 3 7.61905 3C4.57143 3 2 5.56425 2 8.60335C2 8.7933 2 8.98324 2 9.17318C2.38095 13.8268 7.33333 17.7207 10.2857 19.5251C10.7619 19.8101 11.3333 20 12 20C12.5714 20 13.1429 19.8101 13.7143 19.5251C16.6667 17.6257 21.619 13.8268 22 9.17318C22 8.98324 22 8.7933 22 8.60335C22 5.56425 19.4286 3 16.2857 3Z" />
    </svg>
  );
}

// Корзина
export function IconCart({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 16 16" aria-hidden>
      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
    </svg>
  );
}

// Аккаунт
export function IconUser({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    </svg>
  );
}

// Телеграм
export function IconTelegram({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M16.8799 21.513L22.877 3.92164C23.4767 2.22247 21.7775 0.523306 20.0784 1.12301L2.487 7.12007C0.48798 7.81972 0.48798 10.6183 2.58695 11.2181L8.48405 12.8173C9.78342 13.2171 10.8829 14.2166 11.1827 15.5159L12.7819 21.413C13.3817 23.512 16.1803 23.512 16.8799 21.513Z" />
    </svg>
  );
}

// Поиск
export function IconSearch({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M21.1592 18.0701L17.7962 14.7027C18.3057 13.5803 18.6115 12.4578 18.6115 11.2333C18.6115 8.98843 17.7962 6.94761 16.1656 5.417C12.9045 2.15169 7.70701 2.15169 4.44586 5.417C1.18471 8.6823 1.18471 13.8864 4.44586 17.1517C5.97452 18.6823 8.11465 19.6007 10.2548 19.6007C11.4777 19.6007 12.7006 19.2945 13.7197 18.7843L17.0828 22.1517C17.5924 22.6619 18.4076 22.968 19.121 22.968C19.8344 22.968 20.5478 22.6619 21.1592 22.1517C22.2803 20.9272 22.2803 19.0905 21.1592 18.0701ZM5.87261 15.519C3.42675 13.0701 3.42675 9.09047 5.87261 6.74353C7.09554 5.51904 8.6242 4.90679 10.2548 4.90679C11.8854 4.90679 13.414 5.51904 14.6369 6.74353C15.8599 7.96802 16.4713 9.49863 16.4713 11.1313C16.4713 12.7639 15.8599 14.3966 14.6369 15.519C13.414 16.6415 11.8854 17.3558 10.2548 17.3558C8.6242 17.3558 6.99363 16.7435 5.87261 15.519Z" />
    </svg>
  );
}

// Удалить
export function IconTrash({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 16 16" aria-hidden>
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
    </svg>
  );
}

// Доставка
export function IconTruck({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M9.56443 8.73049L10.0789 10.5926C10.5639 12.3481 10.8064 13.2259 11.5194 13.6252C12.2323 14.0244 13.1374 13.7892 14.9474 13.3188L16.8673 12.8199C18.6774 12.3495 19.5824 12.1143 19.9941 11.4227C20.4057 10.7312 20.1632 9.85344 19.6782 8.09788L19.1638 6.2358C18.6788 4.48023 18.4363 3.60244 17.7233 3.20319C17.0103 2.80394 16.1052 3.03915 14.2952 3.50955L12.3753 4.00849C10.5652 4.47889 9.66021 4.71409 9.24856 5.40562C8.83692 6.09714 9.07943 6.97493 9.56443 8.73049Z" />
      <path d="M2.27749 5.24694C2.38823 4.84781 2.80157 4.61402 3.2007 4.72476L4.9044 5.19744C5.82129 5.45183 6.5469 6.15866 6.80003 7.07489L8.95106 14.8609L9.10935 15.4075C9.74249 15.6438 10.2863 16.0866 10.6314 16.6747L10.9414 16.579L19.8115 14.2739C20.2124 14.1697 20.6219 14.4102 20.7261 14.8111C20.8303 15.212 20.5897 15.6214 20.1888 15.7256L11.3515 18.0223L11.0228 18.1238C11.0161 19.3947 10.1392 20.5555 8.81236 20.9003C7.22189 21.3136 5.58709 20.3982 5.16092 18.8556C4.73476 17.313 5.67861 15.7274 7.26908 15.3141C7.3479 15.2936 7.42682 15.2764 7.5057 15.2623L5.35419 7.47433C5.24592 7.08242 4.92897 6.76092 4.50338 6.64284L2.79968 6.17016C2.40054 6.05942 2.16675 5.64608 2.27749 5.24694Z" />
    </svg>
  );
}

// Оплата
export function IconCreditCard({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" />
    </svg>
  );
}

// Гарантия
export function IconShield({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="currentColor" viewBox="0 0 256 256" aria-hidden>
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM104,184H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16ZM56,128a8,8,0,0,1,8-8H96a8,8,0,0,1,0,16H64A8,8,0,0,1,56,128Zm105.79,57.58a4,4,0,0,1-3.58,0C156.65,184.8,120,166.17,120,140a22,22,0,0,1,40-12.64A22,22,0,0,1,200,140C200,166.17,163.35,184.8,161.79,185.58ZM192,88H64a8,8,0,0,1,0-16H192a8,8,0,0,1,0,16Z" />
    </svg>
  );
}

export function IconChevronRight({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function IconFilter({ className = "", size }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <svg className={`${sizeClass(size)} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h10M4 17h16M14 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4M4 12h12M12 20h8" />
    </svg>
  );
}
