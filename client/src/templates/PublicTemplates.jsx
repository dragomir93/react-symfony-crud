import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './headers/NavBar';

const PublicTemplates = ({ children }) => {

  return (
    <>
      <NavBar/>
      {children}
    </>
  );
};

PublicTemplates.propTypes = {
  children: PropTypes.node,
};

PublicTemplates.defaultProps = {
  children: null,
};

export default PublicTemplates;
