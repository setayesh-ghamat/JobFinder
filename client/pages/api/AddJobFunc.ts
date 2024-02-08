import { useState, useEffect, FormEvent } from 'react';

const AddJobFunc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null); // <-- Initialize token state

  useEffect(() => {
    // Extract token from cookies on the client side
    const getCookieValue = (name: string) => 
      document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
    const tokenValue = getCookieValue('token') || null;
    setToken(tokenValue); // <-- Set the token state
  }, []); // <-- Empty dependency array ensures this runs only once after initial render

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const jobTitle = formData.get('jobTitle') as string;
    const jobContract = formData.get('jobContract') as string;
    const jobMobility = formData.get('mobility') as string;
    const jobDescription = formData.get('jobDescription') as string;
    const jobCompany = formData.get('id_company') as string;

    const publishDate = new Date().toISOString().split('T')[0];

  
    const response = await fetch('http://localhost:5000/api/add/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ title: jobTitle, contract: jobContract, mobility: jobMobility, publish_date: publishDate, description: jobDescription, id_company: jobCompany }),
    });
  
    const data = await response.json();
  
    if (data.success) {
      // Handle success, maybe close the modal and refresh job listings
      closeModal();
    } else {
      // Handle error
      console.error(data.error);
    }
  };
  return {
    openModal,
    handleFormSubmit,
    closeModal,
    isModalOpen
  };
}

export default AddJobFunc;