import React from 'react';
import { Link } from 'react-router-dom';

import { IoMdCreate } from 'react-icons/io';

import { Container } from './styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <>
        <IoMdCreate />
        <Link to="/">MyTypingGame</Link>
      </>
    </Container>
  );
};

export default Menu;
