import React, { useEffect, useState } from 'react';
import AddJobFunc from '@/pages/api/AddJobFunc';
import { Button } from "@material-tailwind/react";

function AddJob() {
    const { openModal, handleFormSubmit, closeModal, isModalOpen } = AddJobFunc();

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
        { userRole === 'Admin' && <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Create Job</Button> }
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow-lg">
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name='jobTitle' placeholder="Job Title" className="border p-2 mb-2 w-full" />
                    <input type="text" name='jobContract' placeholder="Contract" className="border p-2 mb-2 w-full" />
                    <select name="mobility" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">remote</option>
                    <option value="0">daily commute</option>
                    </select>
                    <select name='id_company' className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">Orbis</option>
                    <option value="2">T&S</option>
                    </select>
                    <textarea placeholder="Job Description" name='jobDescription' className="border p-2 mb-2 w-full"></textarea>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    <button onClick={ closeModal } className="ml-2">Cancel</button>
                </form>
                </div>
            </div>
        )}
    </>
    )
}

export default AddJob
