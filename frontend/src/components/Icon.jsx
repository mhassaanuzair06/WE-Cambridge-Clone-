import React from "react";

export default function Icon({ name }) {
  const paths = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.2-6 8-6s6.5 2 8 6" /></>,
    heart: <path d="M20.5 5.8c-1.7-1.8-4.5-1.8-6.2 0L12 8.1 9.7 5.8c-1.7-1.8-4.5-1.8-6.2 0-1.8 1.9-1.8 4.9 0 6.7L12 21l8.5-8.5c1.8-1.8 1.8-4.8 0-6.7Z" />,
    cart: <><path d="M6 7h15l-2 9H8L6 7Zm0 0L5 3H2" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>
  };
  return <svg viewBox="0 0 24 24">{paths[name]}</svg>;
}
