import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const LogoText = styled(Typography)({
  background: '#2D3748',
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '4px',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: '40px',
});

const Logo = () => {
  return <LogoText>TicketEase</LogoText>;
};

export default Logo;

