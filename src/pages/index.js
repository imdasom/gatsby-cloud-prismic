import * as React from 'react';
import { graphql } from 'gatsby';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const IndexPage = ({ data }) => {
  const dataRaw = data.allPrismicHome.nodes[0].dataRaw;
  return (
    <main style={pageStyles}>
      <title>와이어드 컴퍼니</title>
      <div>
        <a href="/">회사 소개</a>
      </div>
      <div>
        <a href="/culture">팀 문화</a>
      </div>
      <div>
        <a href="/job-list">채용 공고</a>
      </div>
      <h1>{dataRaw.maintitle[0].text}</h1>
      <div>{dataRaw.maincontent[0].text}</div>
      <hr />
      <div>
        {dataRaw.interviewgroup.map((_interview) => {
          return (
            <div>
              <h3>{_interview.interviewcontent[0].text}</h3>
              <h6>{_interview.interviewee[0].text}</h6>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allPrismicHome {
      nodes {
        id
        dataRaw
      }
    }
  }
`;

export default IndexPage;
