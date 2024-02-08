import { FormEvent } from "react";
import { useRouter } from 'next/router';



function RegisterFunc() {
    const router = useRouter();

    const handleRegisterUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const pseudo = formData.get('pseudo') as string;
        const mail = formData.get('mail') as string;
        const password = formData.get('password') as string;
        const passwordconfirm = formData.get('passwordConfirm') as string;
    
        const response = await fetch(`http://localhost:5000/api/register/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ pseudo: pseudo, mail: mail, password: password, passwordconfirm: passwordconfirm }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.redirectTo) {
                router.push(data.redirectTo);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return {
        handleRegisterUser,
    }
}

export default RegisterFunc
