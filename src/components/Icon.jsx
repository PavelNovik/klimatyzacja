// Линейные иконки: линия 1.75, скруглённые концы (stroke = currentColor)
const paths = {
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  viber: (
    <>
      <path d="M12 3c-5 0-8 1.8-8 7.5 0 3 .8 5 2.6 6.2V20l2.8-2.4c.8.1 1.7.2 2.6.2 5 0 8-1.8 8-7.3S17 3 12 3Z" />
      <path d="M9.5 8.2c.3 2.6 1.8 4.2 4.4 4.9l.9-1 1.6.9-.5 1.3c-3.5.2-6.6-2.8-6.9-6.3l1.3-.5.9 1.6Z" />
    </>
  ),
  telegram: <path d="M21 4.5 3 11.4l5.4 1.9L18 7.2l-7.6 7.4v4.9l3-3.2 4.1 3.2Z" />,
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowUp: <path d="M12 20V5m-6 6 6-6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  reset: <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v4h4" />,
  star: <path d="m12 3.5 2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.8l-5.4 2.9 1.2-5.9-4.4-4.1 6-.7Z" />,
  snow: (
    <>
      <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6" />
      <path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2M4.3 10.4 7.4 9.6 6.6 6.5M17.4 17.5l-.8-3.1 3.1-.8M4.3 13.6l3.1.8-.8 3.1M17.4 6.5l-.8 3.1 3.1.8" />
    </>
  ),
  gauge: (
    <>
      <circle cx="12" cy="13" r="8.5" />
      <path d="M12 13 16 8.5M7 13h1.5M15.5 13H17M12 8V6.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v10h-11ZM13.5 9.5h4l3.5 3.5v3.5h-7.5" />
      <circle cx="6.5" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7.5" />
    </>
  ),
  price: (
    <>
      <path d="M3.5 12.5 12 4h8v8l-8.5 8.5Z" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h2M12 13.5h2M8 17h2" />
    </>
  ),
  invoice: (
    <>
      <path d="M5.5 3h13v18l-2.2-1.5-2.1 1.5-2.2-1.5-2.1 1.5-2.2-1.5-2.2 1.5Z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </>
  ),
  doc: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" />
    </>
  ),
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-5-5l2.5 2.5Z" />,
}

export default function Icon({ name, size = 24, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
