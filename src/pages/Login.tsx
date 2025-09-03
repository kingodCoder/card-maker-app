
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une vraie application, nous ferions ici la connexion avec un backend
    console.log("Tentative de connexion avec:", { email, password });
    // Rediriger vers le tableau de bord après connexion
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-gray-500 mt-2">Accédez à votre espace personnel</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                Se connecter
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Vous n'avez pas de compte ?{" "}
                <Link to="/register" className="text-brand-600 hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
