import React from 'react';
import { Link } from 'gatsby';

const Index = () => (
  <>
    <h1>Rick & Morty Character Lookup</h1>
    <p>
      Look up your favourite characters from <em>Rick & Morty </em>
      <a href="https://rickandmortyapi.com">Rick & Morty API</a>
    </p>
    <Link to="/search">Search</Link>
  </>
);

export default Index;
