import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [company, setCompany] = useState();

  useEffect(() => {
      getCompany(companyId).then(cmp => setCompany(cmp));
  }, [companyId]);

  console.log('[Company] cmp:', company);
  if (!company) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h2 className='subtitle'>All Jobs</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
