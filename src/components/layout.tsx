import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ClipboardList,
  Home,
  Settings,
  Stethoscope,
  Users,
  ArrowLeft
} from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div
        className="
          flex h-11 w-11 items-center justify-center
          rounded-2xl
          bg-[#756443]
          text-[#f8f5ed]
          shadow-md
        "
      >
        <Activity size={23} />
      </div>

      <div>
        <div className="font-extrabold tracking-tight text-[#403a2f]">
          AyuCare
        </div>

        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d7b52]">
          SIH26047
        </div>
      </div>
    </Link>
  );
}

export function PatientNav() {
  const loc = useLocation();

  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-[#d3cbb8]
        bg-[#f8f5ed]/95
        backdrop-blur
      "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        <Link
          to={loc.pathname.startsWith("/patient") ? "/" : "/"}
          className="
            flex items-center gap-2
            text-sm font-semibold
            text-[#766f61]
            transition
            hover:text-[#756443]
          "
        >
          <ArrowLeft size={16} />
          Exit demo
        </Link>
      </div>
    </header>
  );
}

const items = [
  {
    to: "/doctor",
    label: "Dashboard",
    icon: Home
  },
  {
    to: "/doctor",
    label: "Patient Queue",
    icon: Users
  },
  {
    to: "/doctor",
    label: "Cases",
    icon: ClipboardList
  },
  {
    to: "/doctor",
    label: "Reports",
    icon: BarChart3
  },
  {
    to: "/doctor",
    label: "Settings",
    icon: Settings
  }
];

export function DoctorSidebar() {
  return (
    <aside
      className="
        hidden w-64 shrink-0
        border-r border-[#d3cbb8]
        bg-[#f4f0e6]
        lg:block
      "
    >
      <div className="sticky top-0 flex h-screen flex-col p-5">

        <Logo />

        <div className="mt-10 space-y-1">
          {items.map(({ to, label, icon: Icon }, i) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-semibold
                  transition-all duration-200
                  ${
                    isActive && i === 0
                      ? "bg-[#e3dccb] text-[#5f5338] shadow-sm"
                      : "text-[#6e6759] hover:bg-[#e9e3d5] hover:text-[#514832]"
                  }
                `
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>

        <div
          className="
            mt-auto
            rounded-2xl
            border border-[#d7cfbc]
            bg-[#ebe5d7]
            p-4
          "
        >
          <div className="flex items-center gap-2 text-sm font-bold text-[#403a2f]">
            <Stethoscope
              size={17}
              className="text-[#756443]"
            />

            Demo Doctor
          </div>

          <p className="mt-1 text-xs text-[#817968]">
            Ayurveda consultation
          </p>

          <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[#65744e]">
            <span className="h-2 w-2 rounded-full bg-[#7d8b61]" />
            System ready
          </div>
        </div>

      </div>
    </aside>
  );
}

export function DoctorMobileNav() {
  return (
    <div
      className="
        flex gap-1 overflow-x-auto
        border-b border-[#d3cbb8]
        bg-[#f4f0e6]
        p-2
        lg:hidden
      "
    >
      {items.slice(0, 4).map(
        ({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className="
              flex shrink-0 items-center gap-2
              rounded-lg px-3 py-2
              text-xs font-semibold
              text-[#6e6759]
              transition
              hover:bg-[#e5dfd0]
              hover:text-[#514832]
            "
          >
            <Icon size={15} />
            {label}
          </NavLink>
        )
      )}
    </div>
  );
}