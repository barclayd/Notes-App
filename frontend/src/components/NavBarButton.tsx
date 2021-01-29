import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  path: string;
  label: string;
}

const activeButtonStyle =
  "bg-blue-300 text-white px-3 mx-1 py-2 rounded-md text-sm font-medium focus:outline-none";

const inactiveButtonStyle =
  "border-blue-300 border-solid text-white border-2 mx-3 px-3 py-2 rounded-md text-sm font-medium focus:outline-none";

export const NavBarButton: FC<Props> = ({ path, label }) => {
  const location = useLocation();

  const isActiveLink = location.pathname === `/${path}`;

  return (
    <Link to={`/${path}`}>
      <button
        className={isActiveLink ? activeButtonStyle : inactiveButtonStyle}
      >
        {label}
      </button>
    </Link>
  );
};
