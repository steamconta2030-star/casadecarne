import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import stylesUrl from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Casa de Carne" },
    ],
    links: [{ rel: "stylesheet", href: stylesUrl }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="app-shell">
          <header className="topbar">
            <Link to="/" className="brand">
              Casa de Carne
            </Link>
            <nav className="nav-links">
              <Link to="/" activeProps={{ className: "active" }}>
                Catálogo
              </Link>
              <Link to="/pdv" activeProps={{ className: "active" }}>
                PDV
              </Link>
              <Link to="/produtos" activeProps={{ className: "active" }}>
                Produtos
              </Link>
            </nav>
          </header>
          <main className="page-wrap">
            <Outlet />
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
