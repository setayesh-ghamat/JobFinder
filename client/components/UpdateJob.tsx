import {useEffect, useState} from 'react';
import UpdateJobFunc from '@/pages/api/UpdateJobFunc';
import { Button } from "@material-tailwind/react";

interface Job {
    title: string;
    publish_date: string;
    contract: string;
    mobility: number;
    id_company: number;
    description: string;
}

interface UpdateJobProps {
    job: Job;
    jobId: number;
}

function UpdateJob({ job, jobId }: UpdateJobProps) {
    const { openModal, handleJobSelectUpdate, closeModal, isModalOpen } = UpdateJobFunc();

    const [title, setTitle] = useState(job.title);
    const [contract, setContract] = useState(job.contract);
    const [mobility, setMobility] = useState(job.mobility);
    const [id_company, setid_company] = useState(job.id_company);
    const [description, setDescription] = useState(job.description);

    const [userRole, setUserName] = useState<string | null>(null);
    useEffect(() => {
      // This code will only run on the client side after the initial render.
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
          setUserName(storedRole);
      }
  }, []); 
    return (
    <>
        { userRole === 'Admin' && 
            <Button className="flex items-center justify-center w-[30%] text-black focus:outline-none focus:shadow-outline border border-gray-400 rounded bg-green-100 hover:bg-green-200 focus:bg-green-300" 
                onClick={() => openModal(jobId)}>
                Update
            </Button>
        }
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow-lg">
                <form onSubmit={(e) => handleJobSelectUpdate(e)}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name='jobTitle' placeholder="Job Title" className="border p-2 mb-2 w-full" />
                    <input type="text" value={contract} onChange={(e) => setContract(e.target.value)} name='jobContract' placeholder="Contract" className="border p-2 mb-2 w-full" />
                    <select value={mobility} onChange={(e) => setMobility(Number(e.target.value))} name="mobility" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">remote</option>
                    <option value="0">daily commute</option>
                    </select>
                    <select value={id_company} onChange={(e) => setid_company(Number(e.target.value))} name='id_company' className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">Orbis</option>
                    <option value="2">T&S</option>
                    </select>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" name='jobDescription' className="border p-2 mb-2 w-full"></textarea>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    <button onClick={ closeModal } className="ml-2">Cancel</button>
                </form>
                </div>
            </div>
        )}
    </>
    )
}

export default UpdateJob;