import { useState, useEffect, FormEvent } from 'react';

function UpdateJobFunc() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [token, setToken] = useState<string | null>(null); // <-- Initialize token state

    useEffect(() => {
      // Extract token from cookies on the client side
      const getCookieValue = (name: string) => 
        document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
      const tokenValue = getCookieValue('token') || null;
      setToken(tokenValue); // <-- Set the token state
    }, []);

    const [currentJobId, setCurrentJobId] = useState<number | null>(null);

    const openModal = (jobId: number) => {
        setCurrentJobId(jobId);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleJobSelectUpdate = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const transformedData = {
            title: formData.get('jobTitle'),
            contract: formData.get('jobContract'),
            mobility: formData.get('mobility'),
            description: formData.get('jobDescription'),
            id_company: formData.get('id_company'),
        };

        fetch(`http://localhost:5000/api/update/job/${currentJobId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(transformedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Job updated:', data);
                closeModal(); 
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
        };
    
        return {
            openModal,
            closeModal,
            handleJobSelectUpdate,
            isModalOpen,
        };
}

export default UpdateJobFunc