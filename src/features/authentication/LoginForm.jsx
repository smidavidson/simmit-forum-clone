import { useState } from 'react';
import { useLogin } from './useLogin';

export default function LoginForm() {
    // temporary fill in with test account data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail((ce) => {
                        return '';
                    });
                    setPassword((cp) => {
                        return '';
                    });
                },
            },
        );
    }

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <div>
                <label htmlFor='email-input'>Email:</label>
                <input
                    id='email-input'
                    type='text'
                    autoComplete='username'
                    value={email}
                    onChange={(e) => {
                        setEmail((ce) => {
                            return e.target.value;
                        });
                    }}
                ></input>
            </div>
            <div>
                <label htmlFor='password-input'>Password:</label>
                <input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => {
                        setPassword((cp) => {
                            return e.target.value;
                        });
                    }}
                ></input>
            </div>
            <button disabled={isLoading}>Login</button>
        </form>
    );
}
