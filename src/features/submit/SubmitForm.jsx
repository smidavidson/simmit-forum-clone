import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmitPost from './useSubmitPost';
import SubmissionContentBox from '../../ui/SubmissionContentBox';
import { BiSend } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import FormErrorMessage from '../../ui/FormErrorMessage';
import Button from '../../ui/Button';
import FormRequiredAsterix from '../../ui/FormRequiredAsterix';

const labelClass = 'mb-1 font-medium inline-flex items-center';
const inputClass = 'rounded-md border px-2 py-2';

export default function SubmitForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const navigate = useNavigate();

    const { submitPost, isLoading: isSubmitting } = useSubmitPost();

    function onSubmit({ title, content, link_url }) {
        submitPost(
            { title, content, link_url },
            {
                onSettled: () => {
                    // Navigate to page of newly submitted post after submission?
                    reset();
                },
            },
        );
    }

    return (
        <div className='mx-auto max-w-4xl p-4'>
            <h2 className='mb-6 text-2xl font-semibold'>Create post</h2>
            <div className='bg-white px-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label className={labelClass}>
                            Title<FormRequiredAsterix></FormRequiredAsterix>{' '}
                            {errors?.title?.message && (
                                <FormErrorMessage>
                                    {errors?.title?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            className={inputClass}
                            id='title'
                            type='text'
                            {...register('title', {
                                required: 'This field is required',
                            })}
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className={labelClass}>
                            Link{' '}
                            {errors?.link_url?.message && (
                                <FormErrorMessage>
                                    {errors?.link_url?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            className='rounded-md border px-2 py-2'
                            id='link_url'
                            {...register('link_url', {
                                pattern: {
                                    value: /^(https?:\/\/)?([a-zA-Z\d-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
                                    message: 'Please provide a valid URL',
                                },
                            })}
                        ></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className={labelClass}>
                            Body<FormRequiredAsterix></FormRequiredAsterix>{' '}
                            {errors?.content?.message && (
                                <FormErrorMessage>
                                    {errors?.content?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <SubmissionContentBox
                            className='rounded-md'
                            id='content'
                            {...register('content', {
                                required: 'This field is required',
                            })}
                            placeholder='Say something about your post!'
                        ></SubmissionContentBox>
                    </div>
                    <Button variant='small' disabled={isSubmitting}>
                        Post<BiSend></BiSend>
                    </Button>
                </form>
            </div>
        </div>
    );
}
