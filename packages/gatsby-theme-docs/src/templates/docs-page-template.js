import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query($pageID: String!) {
    docsPage(id: { eq: $pageID }) {
      title
      updated(fromNow: true)
      body
    }
  }
`;
