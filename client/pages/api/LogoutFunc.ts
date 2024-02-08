function Logout(onSuccess: () => void) {

    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        localStorage.removeItem('userRole');

        fetch(`http://localhost:5000/api/logout/user`, {
            method: 'POST',
            credentials: 'include', // To send cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return {
        handleLogout,
    }
}

export default Logout