import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { formatDate, formatMobility } from '../pages/api/utility';
import UpdateJob from "./UpdateJob";
import { useEffect, useState } from "react";

interface Job {
  id_job: number;
  title: string;
  publish_date: string;
  contract: string;
  mobility: number;
  description: string;
  id_company: number;
}

interface CardWithLinkProps {
  job: Job;
  onSelectJob: (jobId: number) => void;
  onSelectJobDelete: (jobId: number) => void;
}


export function CardWithLink({ job, onSelectJob, onSelectJobDelete }: CardWithLinkProps) {
  const [userRole, setUserName] = useState<string | null>(null);
  useEffect(() => {
    // This code will only run on the client side after the initial render.
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
        setUserName(storedRole);
    }
}, []); 
  return (
    <div className="mt-6">
      <Card className="bg-blue-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardBody className="flex flex-col space-y-4">
          <Typography variant="h5" color="red" className="text-3xl mb-2 font-bold">
            {job.title}
          </Typography>
          <Typography className="text-lg text-gray-600 font-medium">
            {job.contract}
          </Typography>
          <Typography className="text-lg text-gray-600 font-medium">
            {formatMobility(job.mobility)}
          </Typography>
          <Typography className="text-lg text-gray-600 font-medium">
            {formatDate(job.publish_date)}
          </Typography>
          <Typography className="mt-2 mb-4 text-lg">
            {job.id_company}
          </Typography>
          <div className="flex justify-center space-x-3 w-full">
            <Button 
              size="sm" 
              variant="text" 
              className="flex items-center justify-center w-[30%] focus:outline-none focus:shadow-outline border border-gray-400 rounded bg-blue-100 hover:bg-blue-200 focus:bg-blue-300"
              onClick={(e) => {
                e.preventDefault();
                onSelectJob(job.id_job);
              }}
            >
              Details
            </Button>
            <UpdateJob key={job.id_job} job={job} jobId={job.id_job} />
            { userRole === 'Admin' && 
              <Button 
                size="sm" 
                variant="text" 
                className="flex items-center justify-center w-[30%] focus:outline-none focus:shadow-outline border border-gray-400 rounded bg-red-100 hover:bg-red-200 focus:bg-red-300"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectJobDelete(job.id_job);
                }}
              >
                Delete
              </Button>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  );
}