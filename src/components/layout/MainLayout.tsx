import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps = {}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Set initial theme
  useEffect(() => {
    // Default to dark theme
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Sports menu items
  const sportsMenuItems = [
    { name: "Futebol", path: "/esportes/futebol" },
    { name: "Basquete", path: "/esportes/basquete" },
    { name: "Tênis", path: "/esportes/tenis" },
    { name: "Vôlei", path: "/esportes/volei" },
    { name: "Outros", path: "/esportes/outros" },
  ];

  // Footer links
  const footerLinks = [
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Termos de Uso", path: "/termos" },
    { name: "Política de Privacidade", path: "/privacidade" },
    { name: "Jogo Responsável", path: "/jogo-responsavel" },
    { name: "Contato", path: "/contato" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-green-400"
              >
                BetSport<span className="text-yellow-400">BR</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Sports Menu */}
              <nav className="flex space-x-4">
                {sportsMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="bg-green-500 text-black hover:bg-green-400">
                    Criar Conta
                  </Button>
                </Link>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="ml-2 text-gray-300 hover:text-yellow-400"
                >
                  {isDarkTheme ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2 text-gray-300 hover:text-yellow-400"
              >
                {isDarkTheme ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
            >
              <div className="container mx-auto px-4 py-3">
                <nav className="flex flex-col space-y-3">
                  {sportsMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-gray-300 hover:text-green-400 transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col space-y-2 mt-4 pb-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      Entrar
                    </Button>
                  </Link>
                  <Link
                    to="/cadastro"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-green-500 text-black hover:bg-green-400">
                      Criar Conta
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children || <Outlet />}</main>

      {/* Footer */}
      <footer
        className={`border-t ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-300"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="text-2xl font-bold text-green-400 mb-4">
                BetSport<span className="text-yellow-400">BR</span>
              </div>
              <p className="text-gray-400 text-sm">
                A melhor plataforma de apostas esportivas do Brasil. Aposte com
                responsabilidade e divirta-se!
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Links Úteis
              </h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Suporte
              </h3>
              <ul className="space-y-2">
                {footerLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} BetSportBR. Todos os direitos
              reservados.
            </p>
            <p className="mt-2">
              Proibido para menores de 18 anos. Jogue com responsabilidade.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
