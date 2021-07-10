import * as React from 'react';
import { graphql } from 'gatsby';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const CulturePage = ({ data }) => {
  const dataRaw = data.allPrismicCulturePage.nodes[0].dataRaw;
  return (
    <main style={pageStyles}>
      <h1>{dataRaw.culturemaintitle[0].text}</h1>
      <div>{dataRaw.culturemaincontent[0].text}</div>
    </main>
  );
};

export const query = graphql`
  query CulturePageQuery {
    allPrismicCulturePage {
      nodes {
        dataRaw {
          culturemaincontent {
            text
          }
          culturemaintitle {
            text
          }
        }
      }
    }
  }
`;

export default CulturePage;
