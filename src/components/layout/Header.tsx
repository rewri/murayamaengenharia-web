import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

export function Header() {
  const menuItems = navigationItems;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white shadow-sm fixed top-0 w-full z-50 antialiased border-b border-neutral-warm"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <img
          src="/static/images/logo/logo_azul_1.png"
          alt="Murayama Engenharia Logo"
          className="h-14 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.label} to={item.href}>
                  <motion.div
                    whileHover={{
                      textShadow: "0.5px 0 0 currentColor",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`relative transition-colors antialiased text-sm font-semibold font-body ${
                      active
                        ? "text-primary font-bold"
                        : "text-neutral-dark hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                        initial={false}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
          <motion.a
            href="#chatbot"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-accent-700 transition-colors shadow-md antialiased font-body"
          >
            SOLICITE UM ORÇAMENTO
          </motion.a>
        </div>
        <button
          className="md:hidden text-neutral-dark"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <nav className="flex flex-col p-4 gap-4">
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <motion.div
                      initial={{ x: -8, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      whileHover={{
                        x: 4,
                        textShadow: "0.5px 0 0 currentColor",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`transition-colors antialiased font-body ${
                        active
                          ? "text-primary font-bold border-l-2 border-accent pl-3"
                          : "text-neutral-dark hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                );
              })}
              <motion.a
                href="#chatbot"
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: menuItems.length * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(false)}
                className="bg-accent text-white px-3 py-1.5 rounded text-sm font-medium text-center hover:bg-accent-700 transition-colors shadow-md mt-2 antialiased font-body"
              >
                SOLICITE UM ORÇAMENTO
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
