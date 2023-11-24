import styles from '../styles/Login.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';


function Login() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const signInClicked = () => {
        setModalIsOpen(true)
        setIsSignIn(true)
    }

    const signUpClicked = () => {
        setModalIsOpen(true)
        setIsSignIn(false)
    }

    return (

        <div>
            <div className={styles.loginContainair}>
                <div className={styles.containairGauche}>


                </div>
                <div className={styles.containairDroite}>
                    <Image src="/../public/logo.png" alt="logo" width={150} height={150} />
                    <h1>See what's happening</h1>
                    <h3>Join Hackatweet today.</h3>
                    <button onClick={() => signUpClicked()}>Sign up</button>
                    <span>Already have an account</span>
                    <button onClick={() => signInClicked()}>Sign In</button>
                </div>
            </div >
            <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} isSignIn={isSignIn} />
        </div >

    );
}

export default Login;
