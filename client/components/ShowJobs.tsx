import ShowJobFuncs from '@/pages/api/ShowJobFuncs';
import DeleteJobFunc from '@/pages/api/DeleteJobFunc';
import ShowJob from './ShowJob';
import { CardWithLink } from './CardWithLink';
import { useState } from 'react';

function ShowJobs() {

  const { jobs, handleJobSelect, selectedJob } = ShowJobFuncs();
  const { handleJobSelectDelete } = DeleteJobFunc();
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(true);

  const toggleJobDetails = () => {
    setIsJobDetailsOpen(!isJobDetailsOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 overflow-y-auto">
        {jobs.map((job) => (
          <div key={job.id_job} className="p-4 w-full md:w-full lg:w-3/4 xl:w-2/3">
            <CardWithLink job={job} onSelectJob={handleJobSelect} onSelectJobDelete={handleJobSelectDelete} />
          </div>
        ))}
      </div>
      <div className={`w-full md:w-1/2 md:sticky md:top-0 md:h-[80vh] overflow-y-auto p-4 ${isJobDetailsOpen ? '' : 'hidden'}`}>
        <div className="bg-blue-100 p-4 rounded shadow-lg relative">
          <div className="absolute top-2 right-2">
            {/* Small Close button */}
            <button
              onClick={toggleJobDetails}
              className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
            >
              Close
            </button>
          </div>
          <ShowJob job={selectedJob} />
        </div>
      </div>
    </div>
  )
}

export default ShowJobs