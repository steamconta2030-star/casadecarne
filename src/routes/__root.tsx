import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import "../styles.css";

export const Route = createRootRoute({
  component: () => (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">Casa de Carne</Link>
        <nav className="nav-links">
          <Link to="/" activeProps={{ className: "active" }}>Catálogo</Link>
          <Link to="/pdv" activeProps={{ className: "active" }}>PDV</Link>
          <Link to="/produtos" activeProps={{ className: "active" }}>Produtos</Link>
        </nav>
      </header>
      <main className="page-wrap"><Outlet /></main>
    </div>
  ),
});
