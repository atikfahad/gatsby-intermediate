import React from 'react';
import { Link } from 'gatsby';
import Form from '../components/form';
import Results from '../components/results';

const Index = () => (
  <>
    <h1>Search for Rick & Morty Character</h1>
    <p>
      Trying to remember which Rick you’re talking about? Try out this handy
      search interface!
    </p>
    {/* TODO Add Search form */}
    <Form />
    {/* TODO Add Result */}
    <Results name="rick" />
  </>
);

export default Index;
