import * as React from 'react';
import { graphql } from 'gatsby';
import { useState } from 'react';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const JobListPage = ({ data }) => {
  const [resume, setResume] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const jobList = data.allPrismicJobDetail.nodes.map((_node) => _node);
  const job = jobList[0].dataRaw;
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('resume', resume);
    formData.append('email', email);
    formData.append('jobName', job.jobname[0].text);
    fetch('/api/node-mailer', {
      method: 'post',
      body: formData,
    })
      .then(() => {
        window.location = '/resume-success';
      })
      .error(() => {
        window.location = '/resume-success';
      });
  };
  return (
    <main style={pageStyles}>
      <h1>와이어드 컴퍼니와 함께 할 멋진 동료를 찾고 있어요!</h1>
      <h2>{job.jobname[0].text}</h2>
      {job.descriptiongroup.map((_description) => {
        return (
          <div>
            <h3>{_description.descriptiontitle[0].text}</h3>
            {_description.descriptioncontent && (
              <div>
                {_description.descriptioncontent.map((_content) => {
                  return <p>{_content.text}</p>;
                })}
              </div>
            )}
          </div>
        );
      })}
      <div>
        <h2>지원하기</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="resume">이력서</label>
            <input
              type="file"
              id="resume"
              name="resume"
              placeholder="file 선택"
              onChange={async (event) => {
                const file = event.currentTarget.files[0];
                setResume(file);
              }}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
};

export const query = graphql`
  query JobPageQuery($uid: String) {
    allPrismicJobDetail(filter: { uid: { eq: $uid } }) {
      nodes {
        uid
        dataRaw
      }
    }
  }
`;

export default JobListPage;
