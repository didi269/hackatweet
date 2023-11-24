import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Sign.module.css';
import Link from 'next/link';
import Image from 'next/image';



function SignIn() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [signInLastname, setSignInLastname] = useState('');
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const handleConnection = () => {

        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastname: signInLastname, username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signInUsername, token: data.token }));
                    setSignInLastname('');
                    setSignInUsername('');
                    setSignInPassword('');
                    setIsModalVisible(false)
                }
            });
    };


    return (

        <div className={styles.signContainer}>
            <Image src="/../public/logo.png" alt="logo" width={150} height={150} />
            <h1>Create your Hackatweet account</h1>

            <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
            <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
            <button id="connection" onClick={() => handleConnection()}>Connect</button>
            <button>Sign In</button>

        </div>
    )
}

export default SignIn;
