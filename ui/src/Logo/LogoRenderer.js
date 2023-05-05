import React from 'react';

const Logo = () => {
  const svgLogo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100" viewBox="0 0 400 100">
      <rect width="100%" height="100%" fill="#2D3748" />
      <text x="50%" y="65" font-family="Verdana" font-size="40" font-weight="bold" text-anchor="middle" fill="#FFFFFF">
        TicketEase
      </text>
    </svg>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgLogo }}
      style={{ width: '400px', height: '100px' }}
    />
  );
};

export default Logo;
