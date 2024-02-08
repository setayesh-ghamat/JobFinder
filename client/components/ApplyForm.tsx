import { Button } from "@material-tailwind/react";
import ApplyFunc from '@/pages/api/ApplyFunc';
import { useState } from "react";

interface ApplyJobProps {
    jobId: number;
}

function ApplyForm({ jobId }: ApplyJobProps) {
    const { openModal, handleJobSelectApply, closeModal, isModalOpen} = ApplyFunc();

    const authPseudo = localStorage.getItem('userName');
    const authMail = localStorage.getItem('userMail');

    const [pseudo, setPseudo] = useState(authPseudo || ''); // Set initial value to authPseudo or an empty string
    const [mail, setMail] = useState(authMail || ''); // Set initial value to authMail or an empty string
    const handlePseudoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPseudo(e.target.value);
    };
    const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
    };

  return (
    <>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
            onClick={() => openModal(jobId)}>
            Apply
        </Button>
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow-lg">
                <form onSubmit={(e) =>  handleJobSelectApply(e)}>
                    <input type="text" value={pseudo} onChange={handlePseudoChange} name='pseudo' placeholder="Name" className="border p-2 mb-2 w-full" />
                    <input type="text" value={mail} onChange={handleMailChange} name='mail' placeholder="Email" className="border p-2 mb-2 w-full" />
                    <input type="file" name='cv' placeholder="Your CV" className="border p-2 mb-2 w-full" />
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    <button onClick={ closeModal } className="ml-2">Cancel</button>
                </form>
                </div>
            </div>
        )}
    </>
  )
}

export default ApplyForm;
