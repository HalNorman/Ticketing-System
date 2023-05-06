import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const LogoText = styled(Typography)({
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '4px',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: '40px',
});

const Logo = (props) => {
  const title = props.title;
  return <LogoText sx={{backgroundColor: "primary.main", color: "secondary.main"}}>
    {title}
    </LogoText>;
};

export default Logo;

