import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GameCard from "@/components/games/GameCard";

const LandingPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // In a real app, you would update the theme in a context or using a theme provider
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mock data for banner carousel
  const banners = [
    {
      id: 1,
      title: "Bônus de Boas-Vindas",
      description: "Ganhe até R$500 no seu primeiro depósito!",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
      color: "from-green-500/20 to-emerald-700/40",
    },
    {
      id: 2,
      title: "Apostas ao Vivo",
      description: "Acompanhe e aposte em tempo real nos principais jogos!",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
      color: "from-blue-500/20 to-indigo-700/40",
    },
    {
      id: 3,
      title: "Campeonato Brasileiro",
      description: "Aposte nos jogos do Brasileirão com as melhores odds!",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=80",
      color: "from-yellow-500/20 to-amber-700/40",
    },
  ];

  // Mock data for games
  const games = [
    {
      id: 1,
      title: "Flamengo x Palmeiras",
      league: "Campeonato Brasileiro",
      date: "15/06/2023",
      time: "16:00",
      minValue: 10,
      odds: {
        home: 2.1,
        draw: 3.2,
        away: 2.8,
      },
    },
    {
      id: 2,
      title: "Santos x Corinthians",
      league: "Campeonato Brasileiro",
      date: "15/06/2023",
      time: "19:00",
      minValue: 5,
      odds: {
        home: 2.5,
        draw: 3.0,
        away: 2.4,
      },
    },
    {
      id: 3,
      title: "São Paulo x Atlético-MG",
      league: "Campeonato Brasileiro",
      date: "16/06/2023",
      time: "20:00",
      minValue: 10,
      odds: {
        home: 1.9,
        draw: 3.3,
        away: 3.1,
      },
    },
    {
      id: 4,
      title: "Fluminense x Vasco",
      league: "Campeonato Brasileiro",
      date: "16/06/2023",
      time: "21:30",
      minValue: 5,
      odds: {
        home: 2.2,
        draw: 3.1,
        away: 2.7,
      },
    },
    {
      id: 5,
      title: "Botafogo x Grêmio",
      league: "Campeonato Brasileiro",
      date: "17/06/2023",
      time: "16:00",
      minValue: 10,
      odds: {
        home: 2.0,
        draw: 3.2,
        away: 2.9,
      },
    },
    {
      id: 6,
      title: "Internacional x Cruzeiro",
      league: "Campeonato Brasileiro",
      date: "17/06/2023",
      time: "18:30",
      minValue: 5,
      odds: {
        home: 1.8,
        draw: 3.4,
        away: 3.2,
      },
    },
  ];

  // Sports categories
  const sportsCategories = [
    { id: "futebol", name: "Futebol" },
    { id: "basquete", name: "Basquete" },
    { id: "tenis", name: "Tênis" },
    { id: "volei", name: "Vôlei" },
    { id: "outros", name: "Outros" },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${isDarkTheme ? "bg-gray-800/90 backdrop-blur-sm border-b border-gray-700" : "bg-white/90 backdrop-blur-sm border-b border-gray-200"} shadow-md`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold"
              >
                <span className="text-green-500">Bet</span>
                <span className="text-amber-400">Sport</span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {sportsCategories.map((sport) => (
                <Link
                  key={sport.id}
                  to={`/esportes/${sport.id}`}
                  className={`hover:text-green-500 transition-colors ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
                >
                  {sport.name}
                </Link>
              ))}
            </div>

            {/* Auth and Theme Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className={`border-green-500 text-green-500 hover:bg-green-500 hover:text-white ${isDarkTheme ? "border-opacity-70" : ""}`}
                >
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Criar Conta
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full ${isDarkTheme ? "text-amber-400 hover:text-amber-300" : "text-gray-700 hover:text-gray-900"}`}
              >
                {isDarkTheme ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full ${isDarkTheme ? "text-amber-400 hover:text-amber-300" : "text-gray-700 hover:text-gray-900"}`}
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
                onClick={toggleMobileMenu}
                className="text-gray-400 hover:text-white"
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
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-16 left-0 right-0 z-40 ${isDarkTheme ? "bg-gray-800 border-b border-gray-700" : "bg-white border-b border-gray-200"} shadow-lg md:hidden`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {/* Sports Categories */}
              <div className="flex flex-col space-y-2">
                {sportsCategories.map((sport) => (
                  <Link
                    key={sport.id}
                    to={`/esportes/${sport.id}`}
                    className={`py-2 px-4 rounded-md hover:bg-gray-700 ${isDarkTheme ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {sport.name}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Banner Carousel */}
        <section className="mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl h-[300px] md:h-[400px] w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${banner.color} mix-blend-overlay`}
                    ></div>
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {banner.title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-200 mb-4">
                        {banner.description}
                      </p>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Apostar Agora
                      </Button>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-black/30 hover:bg-black/50 text-white border-none" />
            <CarouselNext className="right-4 bg-black/30 hover:bg-black/50 text-white border-none" />
          </Carousel>
        </section>

        {/* Popular Games Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              <span className="text-green-500">Jogos</span> Populares
            </h2>
            <Link
              to="/boloes"
              className="text-green-500 hover:text-green-400 flex items-center"
            >
              Ver Todos <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GameCard
                  title={game.title}
                  league={game.league}
                  date={game.date}
                  time={game.time}
                  minValue={game.minValue}
                  odds={game.odds}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-green-500">Por que</span> escolher a BetSport?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card
                className={`h-full ${isDarkTheme ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Melhores Odds</h3>
                  <p
                    className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Oferecemos as melhores odds do mercado para maximizar seus
                    ganhos em cada aposta.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card
                className={`h-full ${isDarkTheme ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Segurança Garantida
                  </h3>
                  <p
                    className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Sua segurança é nossa prioridade. Utilizamos criptografia
                    avançada para proteger seus dados e transações.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card
                className={`h-full ${isDarkTheme ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Saques Rápidos</h3>
                  <p
                    className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Processamos seus saques em até 24 horas, para que você possa
                    aproveitar seus ganhos rapidamente.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl p-8 md:p-12 ${isDarkTheme ? "bg-gradient-to-r from-green-900/40 to-gray-800/40 border border-green-800/50" : "bg-gradient-to-r from-green-50 to-gray-50 border border-green-100"}`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para começar a apostar?
            </h2>
            <p
              className={`text-lg mb-6 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              Crie sua conta agora e ganhe um bônus de boas-vindas de até R$500
              no seu primeiro depósito!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/cadastro">
                <Button className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                  Criar Conta
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white w-full sm:w-auto"
                >
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer
        className={`py-12 ${isDarkTheme ? "bg-gray-800 border-t border-gray-700" : "bg-gray-100 border-t border-gray-200"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                <span className="text-green-500">Bet</span>
                <span className="text-amber-400">Sport</span>
              </h3>
              <p
                className={`mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                A melhor plataforma de apostas esportivas do Brasil.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Esportes</h3>
              <ul
                className={`space-y-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                {sportsCategories.map((sport) => (
                  <li key={sport.id}>
                    <Link
                      to={`/esportes/${sport.id}`}
                      className="hover:text-green-500"
                    >
                      {sport.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
              <ul
                className={`space-y-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                <li>
                  <Link to="/sobre" className="hover:text-green-500">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/termos" className="hover:text-green-500">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="hover:text-green-500">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/responsabilidade" className="hover:text-green-500">
                    Jogo Responsável
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-green-500">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <ul
                className={`space-y-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                <li>Email: contato@betsport.com.br</li>
                <li>Telefone: (11) 1234-5678</li>
                <li>Horário: 24 horas, 7 dias por semana</li>
              </ul>
            </div>
          </div>

          <div
            className={`mt-8 pt-8 ${isDarkTheme ? "border-t border-gray-700" : "border-t border-gray-200"}`}
          >
            <p
              className={`text-center ${isDarkTheme ? "text-gray-500" : "text-gray-600"}`}
            >
              &copy; {new Date().getFullYear()} BetSport. Todos os direitos
              reservados. Proibido para menores de 18 anos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
