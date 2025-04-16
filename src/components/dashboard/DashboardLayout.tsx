import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Ticket,
  Wallet,
  Users,
  History,
  Trophy,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <motion.div
        whileHover={{ scale: 1.03, x: 3 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-green-500/20 text-green-400 border-l-2 border-green-500 shadow-neon-green"
            : "hover:bg-accent/50 border-l-2 border-transparent"
        }`}
      >
        <motion.div
          className="text-xl"
          animate={
            isActive
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                  color: "#4ade80", // text-green-400
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <span>{label}</span>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="ml-auto"
            >
              <ChevronRight className="h-4 w-4 text-green-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const DashboardLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "João Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
    level: 12,
    xp: 75, // percentage
    balance: 1250.75,
  };

  const navItems = [
    { to: "/dashboard", icon: <Home />, label: "Início" },
    { to: "/dashboard/meus-boloes", icon: <Ticket />, label: "Meus Bolões" },
    { to: "/dashboard/carteira", icon: <Wallet />, label: "Carteira" },
    { to: "/dashboard/afiliados", icon: <Users />, label: "Afiliados" },
    { to: "/dashboard/historico", icon: <History />, label: "Histórico" },
    { to: "/dashboard/gamificacao", icon: <Trophy />, label: "Gamificação" },
    { to: "/dashboard/suporte", icon: <HelpCircle />, label: "Suporte" },
    {
      to: "/dashboard/configuracoes",
      icon: <Settings />,
      label: "Configurações",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col w-64 border-r border-border bg-black/40 backdrop-blur-md shadow-inner-glow"
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <div className="text-xs text-muted-foreground">
                Nível {user.level}
              </div>
            </div>
          </div>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between text-xs mb-1">
              <span>XP</span>
              <span>{user.xp}%</span>
            </div>
            <Progress value={user.xp} className="h-2 bg-muted/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${user.xp}%` }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-green-500 rounded-full shadow-neon-green"
              />
            </Progress>
          </motion.div>
          <Card
            variant="neon"
            className="mt-3 bg-black/40 backdrop-blur-md border-green-800/50"
          >
            <CardContent className="p-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-muted-foreground"
              >
                Saldo disponível
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-semibold text-green-400"
              >
                R$ {user.balance.toFixed(2)}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Header & Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md border-b border-green-900/30 shadow-neon-green"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">
                R$ {user.balance.toFixed(2)}
              </div>
            </div>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      Nível {user.level}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span>XP</span>
                    <span>{user.xp}%</span>
                  </div>
                  <Progress value={user.xp} className="h-2 bg-muted/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${user.xp}%` }}
                      transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full bg-green-500 rounded-full shadow-neon-green"
                    />
                  </Progress>
                </motion.div>
                <Card
                  variant="neon"
                  className="mt-3 bg-black/40 backdrop-blur-md border-green-800/50"
                >
                  <CardContent className="p-3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs text-muted-foreground"
                    >
                      Saldo disponível
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-semibold text-green-400"
                    >
                      R$ {user.balance.toFixed(2)}
                    </motion.div>
                  </CardContent>
                </Card>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.to} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavItem
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      isActive={location.pathname === item.to}
                    />
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 overflow-y-auto pt-0 md:pt-0 bg-gradient-to-b from-black/40 to-gray-900/20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:p-6 p-4 pt-16 md:pt-6 min-h-screen"
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
