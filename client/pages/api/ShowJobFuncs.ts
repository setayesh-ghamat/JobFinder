import { useState, useEffect } from 'react';

interface Job {
    id_job: number;
    title: string;
    publish_date: string;
    contract: string;
    mobility: number;
    description: string;
    id_company: number;
}

const ShowJobFuncs = () => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState(null);
    
    // show all jobs
    useEffect(() => {
    fetch('http://localhost:5000/')
        .then((response) => response.json())
        .then((data) => {
        setJobs(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []);

    // show job by id
    const handleJobSelect = (jobId: number) => {
    fetch(`http://localhost:5000/api/job/${jobId}`)
        .then((response) => response.json())
        .then((data) => {
        if (data && data.length > 0) {
            setSelectedJob(data[0]);
        }
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    };

    return {
        jobs,
        handleJobSelect,
        selectedJob
    };
}

export default ShowJobFuncs;