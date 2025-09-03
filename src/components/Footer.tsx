
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Carte Pro Studio</h3>
            <p className="text-gray-600 text-sm">
              Créez vos cartes d'identité professionnelles en ligne en quelques clics.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 text-sm hover:text-brand-600">Accueil</Link></li>
              <li><Link to="/fonctionnalites" className="text-gray-600 text-sm hover:text-brand-600">Fonctionnalités</Link></li>
              <li><Link to="/tarifs" className="text-gray-600 text-sm hover:text-brand-600">Tarifs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/mentions-legales" className="text-gray-600 text-sm hover:text-brand-600">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="text-gray-600 text-sm hover:text-brand-600">Politique de confidentialité</Link></li>
              <li><Link to="/cgv" className="text-gray-600 text-sm hover:text-brand-600">CGV</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">support@carteprostudio.com</li>
              <li className="text-gray-600 text-sm">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Carte Pro Studio. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
