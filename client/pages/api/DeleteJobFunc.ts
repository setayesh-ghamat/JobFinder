import { useEffect, useState } from 'react';

function DeleteJobFunc() {

    const [selectedJobDelete, setSelectedJob] = useState(null);

    const [token, setToken] = useState<string | null>(null); // <-- Initialize token state

    useEffect(() => {
      // Extract token from cookies on the client side
      const getCookieValue = (name: string) => 
        document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
      const tokenValue = getCookieValue('token') || null;
      setToken(tokenValue); // <-- Set the token state
    }, []);

    const handleJobSelectDelete = (jobId: number) => {
        fetch(`http://localhost:5000/api/delete/job/${jobId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
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
            handleJobSelectDelete,
            selectedJobDelete
        };
}

export default DeleteJobFunc;