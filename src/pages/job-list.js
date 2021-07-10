import * as React from 'react';
import { graphql } from 'gatsby';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const JobListPage = ({ data }) => {
  const jobList = data.allPrismicJobDetail.nodes.map((_node) => _node);
  return (
    <main style={pageStyles}>
      <h1>와이어드 컴퍼니와 함께 할 멋진 동료를 찾고 있어요!</h1>
      <ul>
        {jobList &&
          jobList.map((_job) => {
            console.log('_job', _job);
            return (
              <li>
                <a href={`/job/${_job.uid}`}>{_job.dataRaw.jobname[0].text}</a>
              </li>
            );
          })}
      </ul>
    </main>
  );
};

export const query = graphql`
  query JobListPageQuery {
    allPrismicJobDetail {
      nodes {
        uid
        dataRaw
      }
    }
  }
`;

export default JobListPage;
