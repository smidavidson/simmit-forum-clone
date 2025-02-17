import { useState } from 'react';
import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignup from './useSignup';
import Button from '../../ui/Button';
import FormErrorMessage from '../../ui/FormErrorMessage';

export default function SignupForm() {
    const { signup, isLoading: isSigningUp } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    // This can display either already taken username or user already registered error
    const [apiUsernameError, setApiUsernameError] = useState('');
    const [apiEmailError, setApiEmailError] = useState('');

    // console.log(errors);

    function onSubmit({ username, email, password }) {
        if (!username || !email || !password) {
            return;
        }

        setApiUsernameError((ue) => {
            return '';
        });
        setApiEmailError((ee) => {
            return '';
        });
        signup(
            { username, email, password },
            {
                onSettled: () => {
                    // Do nothing
                },
                onError: (err) => {
                    console.log(err);
                    const errors = JSON.parse(err.message);
                    errors.forEach((error) => {
                        if (error.includes('Username')) {
                            setApiUsernameError((ue) => {
                                return error;
                            });
                        } else if (error.includes('User')) {
                            setApiEmailError((ue) => {
                                return 'Email address already registered';
                            });
                        }
                    });
                },
            },
        );
    }

    return (
        <div className='mx-auto mt-8 max-w-md px-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='mb-6 text-2xl font-semibold'>
                    Create a Simmit account
                </h2>
                <div className='space-y-6'>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='username'
                            className='mb-1 inline-flex items-center font-medium'
                        >
                            Username{' '}
                            {(errors?.username?.message ||
                                apiUsernameError) && (
                                <FormErrorMessage>
                                    {apiUsernameError ||
                                        errors?.username?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            id='username'
                            type='text'
                            autoComplete='off'
                            {...register('username', {
                                required: 'This field is required',
                                minLength: {
                                    value: 5,
                                    message:
                                        'Username must be at least 5 characters',
                                },
                                onChange: () => {
                                    setApiUsernameError((ue) => {
                                        return '';
                                    });
                                },
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='email'
                            className='mb-1 inline-flex items-center font-medium'
                        >
                            Email{' '}
                            {(errors?.email?.message || apiEmailError) && (
                                <FormErrorMessage>
                                    {apiEmailError || errors?.email?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            id='email'
                            type='text'
                            autoComplete='email'
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Please provide a valid email address',
                                },
                                onChange: () => {
                                    setApiEmailError((ee) => {
                                        return '';
                                    });
                                },
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='password-input'
                            className='mb-1 inline-flex items-center font-medium'
                        >
                            Password{' '}
                            {errors?.password?.message && (
                                <FormErrorMessage>
                                    {errors?.password?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            id='password'
                            type='password'
                            autoComplete='current-password'
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='password-confirm'
                            className='mb-1 font-medium'
                        >
                            Re-enter Password
                        </label>
                        <input
                            id='password-confirm'
                            type='password'
                            autoComplete='current-password'
                            {...register('password-confirm', {
                                required: 'This field is required',
                                validate: (currValue) => {
                                    return (
                                        currValue === getValues().password ||
                                        'Passwords need to match'
                                    );
                                },
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                </div>
                <div className='mt-10'>
                    <Button variant='auth' disabled={isSigningUp}>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    );
}
