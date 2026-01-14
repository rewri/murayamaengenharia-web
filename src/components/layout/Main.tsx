import { Outlet } from "react-router-dom";
import { CookieBanner } from "../features/legal/CookieBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Main() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light font-body text-neutral-dark">
      <Header />
      <main className="pt-16 flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
