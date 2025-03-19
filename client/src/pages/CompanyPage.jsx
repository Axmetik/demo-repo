import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries';

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
      <div className='box'>
        <h2 className="subtitle">All Vacancies</h2>
        <div style={{display:'flex', flexDirection:'column'}}>
          {company.jobs.map(job => <Link to={`/jobs/${job.id}`} key={job.id}>
            {job.title}
          </Link>)}
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
