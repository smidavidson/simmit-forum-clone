import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormErrorMessage from '../../ui/FormErrorMessage';
import Button from '../../ui/Button';

export default function LoginForm() {
    const { login, isLoading } = useLogin();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ email, password }) {
        if (!email || !password) {
            return;
        }

        login(
            { email, password },
            {
                onSettled: () => {
                    reset();
                },
            },
        );
    }

    return (
        <div className='mx-auto mt-8 max-w-md px-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='mb-6 text-2xl font-semibold'>Login to Simmit</h2>
                <div className='space-y-6'>
                    <div className='flex flex-col'>
                        <label
                            htmlFor='email-input'
                            className='mb-1 inline-flex items-center font-medium'
                        >
                            Email{' '}
                            {errors?.email?.message && (
                                <FormErrorMessage>
                                    {errors?.password?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            id='email-input'
                            type='text'
                            autoComplete='email'
                            {...register('email', {
                                required: 'This field is required',
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
                            autoComplete='password'
                            {...register('password', {
                                required: 'This field is required',
                            })}
                            className='rounded-md border px-3 py-2'
                        ></input>
                    </div>
                </div>
                <div className='mt-10'>
                    <Button disabled={isLoading} variant='auth'>
                        Login
                    </Button>
                </div>
                <div className='outline-solid mt-8 w-full rounded-md border-2 border-gray-400 px-4 py-3 text-center'>
                    New to Simmit?{' '}
                    <Link
                        to={'/signup'}
                        className='text-blue-700 hover:underline'
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}
