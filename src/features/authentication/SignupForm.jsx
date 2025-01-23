import { useState } from 'react';
import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignupForm() {
    // const { signup, isLoading: isSigningUp } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const {errors} = formState;

    function onSubmit({ username, email, password }) {
        // signup(
        //     { username, email, password },
        //     {
        //         onSettled: () => {
        //             reset();
        //         },
        //     },
        // );
    }

    return (
        <div className='mx-auto mt-8 max-w-md px-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='mb-6 text-2xl font-semibold'>
                    Create an account
                </h2>
                <div className='space-y-6'>
                    <div className='flex flex-col'>
                        <label htmlFor='username' className='mb-1 font-medium'>
                            Username
                            {errors?.username?.message}
                        </label>
                        <input
                            id='username'
                            type='text'
                            autoComplete='username'
                            {...register('username', {
                                required: 'This field is required',
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='mb-1 font-medium'>
                            Email
                            {errors?.email?.message}
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
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='password-input'
                            className='mb-1 font-medium'
                        >
                            Password
                            {errors?.password?.message}
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
                            type='password-confirm'
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
                    <button className='w-full rounded-md bg-gray-800 px-4 py-3 text-white'>
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}
