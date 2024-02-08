import { useState, FormEvent} from "react";

function LoginFunc() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const mail = formData.get('mail') as string;
        const password = formData.get('password') as string;
    
        const response = await fetch(`http://localhost:5000/api/login/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ mail: mail, password: password}),
            credentials: 'include', // To send cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            console.log('Application submitted:', data.user);
            if (data.success && data.user.pseudo && data.user.mail && data.user.role) {
                localStorage.setItem('userName', data.user.pseudo);
                localStorage.setItem('userMail', data.user.mail);
                localStorage.setItem('userRole', data.user.role);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return {
        handleModalToggle,
        isModalVisible,
        handleLoginUser,
    }

}

export default LoginFunc
