import { formatDate, formatMobility } from '../pages/api/utility';
import ApplyForm from './ApplyForm';

interface Job {
  id_job: number;
  title: string;
  publish_date: string;
  contract: string;
  mobility: number;
  description: string;
  id_company: number;
}

interface ShowJobProps {
  job: Job | null;
}

function ShowJob({ job }: ShowJobProps) {
  return (
    <div className='relative w-full h-[500px] mt-6 bg-blue-100 p-8 overflow-y-auto'>
        {job ? (
            <>
              <div className='space-y-4'>
                <ApplyForm jobId={job.id_job} />
                <h2 className='text-3xl md:text-4xl lg:text-5xl text-center'>{job.title}</h2>
                <div className='text-lg md:text-xl text-center'>{job.contract}</div>
                <span className='text-lg md:text-xl text-center'>{formatMobility(job.mobility)}</span>
                <p className='text-md md:text-lg lg:text-xl text-justify break-words'>{job.description}</p>
                <span className='absolute top-5 right-5 text-md md:text-lg'>{formatDate(job.publish_date)}</span>
              </div>
            </>
            ) : ""
        }
    </div>
  )
}

export default ShowJob