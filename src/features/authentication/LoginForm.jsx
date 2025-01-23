import { useState } from 'react';
import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';

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
        <div className='mx-auto mt-8 max-w-md px-4'>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <h2 className='mb-6 text-2xl font-semibold'>Login to Simmit</h2>
                <div className='space-y-6'>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='email-input'
                            className='mb-1 font-medium'
                        >
                            Email
                        </label>
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
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='password-input'
                            className='mb-1 font-medium'
                        >
                            Password
                        </label>
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
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                </div>
                <div className='mt-10'>
                    <button
                        disabled={isLoading}
                        className='w-full rounded-md bg-gray-800 px-4 py-3 text-white'
                    >
                        Login
                    </button>
                </div>
                <div className='outline-solid mt-8 w-full rounded-md px-4 py-3 border-2 border-gray-400 text-center'>
                    New to Simmit?{" "}
                    <Link to={'/signup'} className="text-blue-700 hover:underline">Create an account</Link>
                </div>
            </form>
        </div>
    );
}
