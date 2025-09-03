
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <span className="sr-only">Logo</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
            >
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <path d="M7 9h10" />
              <path d="M7 13h10" />
              <circle cx="12" cy="9" r="2" />
            </svg>
            <span>Carte Pro Studio</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-sm">
            Accueil
          </Link>
          <Link to="/fonctionnalites" className="font-medium text-sm">
            Fonctionnalités
          </Link>
          <Link to="/tarifs" className="font-medium text-sm">
            Tarifs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Connexion
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">
              Inscription
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
