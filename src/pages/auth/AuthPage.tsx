import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

type AuthFormType = "login" | "register" | "recovery";

const AuthPage = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState<AuthFormType>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (formType === "login") {
      if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
      // Simulate successful login
      navigate("/dashboard");
    } else if (formType === "register") {
      if (!email || !password || !confirmPassword || !fullName) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
      if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
      // Simulate successful registration
      navigate("/dashboard");
    } else if (formType === "recovery") {
      if (!email) {
        setError("Por favor, informe seu email.");
        return;
      }
      // Simulate recovery email sent
      setRecoveryEmailSent(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              {formType === "recovery" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFormType("login")}
                  className="absolute left-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <CardTitle className="text-2xl font-bold text-center w-full">
                {formType === "login" && "Entrar"}
                {formType === "register" && "Criar Conta"}
                {formType === "recovery" && "Recuperar Senha"}
              </CardTitle>
            </div>
            <CardDescription className="text-center">
              {formType === "login" && "Acesse sua conta para continuar"}
              {formType === "register" &&
                "Crie sua conta para começar a apostar"}
              {formType === "recovery" &&
                "Informe seu email para recuperar sua senha"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.form
                key={formType}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {formType === "recovery" && recoveryEmailSent ? (
                  <div className="text-center space-y-4">
                    <div className="p-2 bg-primary/10 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg">Email enviado!</h3>
                    <p className="text-muted-foreground">
                      Verifique sua caixa de entrada para instruções de
                      recuperação de senha.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFormType("login");
                        setRecoveryEmailSent(false);
                      }}
                    >
                      Voltar para o login
                    </Button>
                  </div>
                ) : (
                  <>
                    {formType === "register" && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="fullName"
                            placeholder="Seu nome completo"
                            className="pl-10"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {formType !== "recovery" && (
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Eye className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {formType === "register" && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {formType === "login" && (
                      <div className="text-right">
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto text-sm"
                          onClick={() => setFormType("recovery")}
                        >
                          Esqueci minha senha
                        </Button>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {formType === "login" && "Entrar"}
                      {formType === "register" && "Criar Conta"}
                      {formType === "recovery" && "Enviar link de recuperação"}
                    </Button>
                  </>
                )}
              </motion.form>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!recoveryEmailSent && formType !== "recovery" && (
              <div className="text-center w-full">
                {formType === "login" ? (
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-muted-foreground">
                      Não tem uma conta?
                    </span>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setFormType("register")}
                    >
                      Criar Conta
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-muted-foreground">
                      Já tem uma conta?
                    </span>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setFormType("login")}
                    >
                      Entrar
                    </Button>
                  </div>
                )}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Voltar para a página inicial
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
