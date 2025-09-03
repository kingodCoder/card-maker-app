
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Register = () => {
  const [etablissement, setEtablissement] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeEtablissement, setTypeEtablissement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une vraie application, nous ferions ici l'inscription avec un backend
    console.log("Inscription avec:", { etablissement, email, password, typeEtablissement });
    // Rediriger vers le tableau de bord après inscription
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Inscription</h1>
            <p className="text-gray-500 mt-2">Créez votre compte pour commencer</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="etablissement">Nom de l'établissement</Label>
                <Input
                  id="etablissement"
                  placeholder="Nom de votre établissement"
                  value={etablissement}
                  onChange={(e) => setEtablissement(e.target.value)}
                  required
                />
              </div>
              
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
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type d'établissement (optionnel)</Label>
                <Select value={typeEtablissement} onValueChange={setTypeEtablissement}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecole">École/Université</SelectItem>
                    <SelectItem value="entreprise">Entreprise</SelectItem>
                    <SelectItem value="hopital">Hôpital/Clinique</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="association">Association</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                S'inscrire
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="text-brand-600 hover:underline">
                  Se connecter
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

export default Register;
