import { useState } from "react";
import "./navigation.css";

const navItems = [
  { id: "home",        label: "Home",        icon: "fi fi-rr-house-chimney"  },
  { id: "challenges",  label: "Challenges",  icon: "fi fi-rr-bullseye-arrow" },
  { id: "leaderboard", label: "Leaderboard", icon: "fi fi-rr-ranking-star"   },
];

export default function Sidebar() {
  const [active, setActive]       = useState("home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="nav-wrapper">

      <button
        className="sidebar__hamburger"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <i className="fi fi-rr-bars-staggered" />
      </button>

      <div className={`nav-items ${collapsed ? "collapsed" : ""}`}>
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`sidebar__item ${active === id ? "active" : ""}`}
            onClick={() => setActive(id)}
          >
            <i className={`${icon} sidebar__icon`} />
            <span className="label">{label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}