import React from 'react';
import GTechFooter from '../../templates/footer/GTechFooter';

export const Footer: React.FC = () => {
  const links = [
    { label: 'Conditions d\'utilisation', href: '/legal/terms' },
    { label: 'Politique de confidentialité', href: '/legal/privacy' },
    { label: 'Conformité & Âge', href: '/legal/compliance' },
    { label: 'Support & Signaler', href: '/support' },
  ];

  return <GTechFooter appName="Atlas G-market" theme="dark" customLinks={links} />;
};

export default Footer;