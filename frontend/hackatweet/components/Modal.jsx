import ModalLib from 'react-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Sign.module.css';
import Link from 'next/link';
import Image from 'next/image';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



function Modal(props) {

    const dispatch = useDispatch();

    //sign-in
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const handleConnection = () => {

        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(userData => {

                dispatch(login({ username: userData.newUser.username, password: userData.newUser.password }));
                setSignInUsername('');
                setSignInPassword('');

            });
    };

    //sign-up
    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const handleRegister = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
        }).then(response => response.json())
            .then(userCreationData => {
                if (data.result) {
                    dispatch(login({ firstname: userCreationData.newUser.firstname, username: userCreationData.newUser.username, password: userCreationData.newUser.password }));
                    setSignUpFirstname('');
                    setSignUpUsername('');
                    setSignUpPassword('');

                }
            });
    };


    // fenêtre modal (= popup)
    let modalContent;
    if (props.isSignIn) {
        modalContent =
            <div className={styles.signContainer}>
                <Image src="/../public/logo.png" alt="logo" width={150} height={150} />
                <h1>Connect to Hackatweet</h1>
                <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
                <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
                <button id="connection" onClick={() => handleConnection()}>Connect</button>

            </div>


    } else {
        modalContent =

            <div className={styles.signContainer}>
                <Image src="/../public/logo.png" alt="logo" width={150} height={150} />
                <h1>Create your Hachatweet account</h1>
                <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
                <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
                <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
                <button id="register" onClick={() => handleRegister()}>Register</button>

            </div>

    }



    return (

        <ModalLib
            isOpen={props.modalIsOpen}

            onRequestClose={() => props.closeModal()}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {modalContent}
        </ModalLib>

    );
}

module.exports = Modal