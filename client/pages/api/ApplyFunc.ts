import { useState, FormEvent } from 'react';

function ApplyFunc() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJobId, setCurrentJobId] = useState<number | null>(null);

    const openModal = (jobId: number) => {
        setCurrentJobId(jobId);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleJobSelectApply = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // if user is connected send the variable
        const storedName = localStorage.getItem('userName');
        if (storedName){
            const connected: string = 'true';
            formData.append('connected', connected)
        }

        fetch(`http://localhost:5000/api/apply/job/${currentJobId}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Application submitted:', data);
            closeModal();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    return {
        openModal,
        closeModal,
        handleJobSelectApply,
        isModalOpen,
    };
}

export default ApplyFunc;
