import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MobileNavBar from '@/components/navbar/mobileNavBar';

describe('Nav links title', () => {
  it('render the good content', () => {
    render(<MobileNavBar />);
    const linksTexts = [
      'Home',
      'Liste des dépenses',
      'Ecrire un post',
      'Faire un don',
      'Profil',
      'Déconnexion',
    ];
    linksTexts.forEach((text) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
