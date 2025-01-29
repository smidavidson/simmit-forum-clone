import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmitPost from './useSubmitPost';
import SubmissionContentBox from '../../ui/SubmissionContentBox';
import { BiSend } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import FormErrorMessage from '../../ui/FormErrorMessage';
import Button from '../../ui/Button';
import FormRequiredAsterix from '../../ui/FormRequiredAsterix';
import { useFlairs } from './useFlairs';

const labelClass = 'mb-1 font-medium inline-flex items-center';
const inputBoxClass = 'rounded-md border px-2 py-2';
const inputDivClass = 'flex flex-col pt-4';

export default function SubmitForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const { submitPost, isLoading: isSubmitting } = useSubmitPost();
    const { flairs = [], isLoadingFlairs } = useFlairs();

    if (isLoadingFlairs) {
        return (
            <div className='flex items-center justify-center'>
                <div className='mx-auto max-w-4xl space-y-2 px-4 py-2'>
                    Loading Submit Form...
                </div>
            </div>
        );
    }

    // console.log(flairs);

    function onSubmit({ title, content, link_url, image, flair }) {
        function formatUrl(url) {
            if (url) {
                return url.startsWith('http') ? url : `https://${url}`;
            }
            return url;
        }

        submitPost(
            {
                title,
                content,
                link_url: formatUrl(link_url),
                image: image?.[0],
                flair,
            },
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
                    <div className={inputDivClass}>
                        <label className={labelClass}>
                            Title<FormRequiredAsterix></FormRequiredAsterix>{' '}
                            {errors?.title?.message && (
                                <FormErrorMessage>
                                    {errors?.title?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            className={inputBoxClass}
                            id='title'
                            type='text'
                            {...register('title', {
                                required: 'This field is required',
                            })}
                        ></input>
                    </div>
                    <div className={inputDivClass}>
                        <div className='flex flex-col'>
                            <label className={labelClass}>
                                Select Flair
                                <FormRequiredAsterix></FormRequiredAsterix>{' '}
                                {errors?.flair?.message && (
                                    <FormErrorMessage>
                                        {errors?.flair?.message}
                                    </FormErrorMessage>
                                )}
                            </label>
                            {isLoadingFlairs ? (
                                <div>Loading flairs...</div>
                            ) : (
                                <select
                                    className={inputBoxClass}
                                    {...register('flair', {
                                        required: 'Please select a flair',
                                    })}
                                >
                                    <option value=''>Select a flair...</option>
                                    {flairs.map((flair) => {
                                        return (
                                            <option
                                                key={flair.id}
                                                value={flair.id}
                                            >
                                                {flair.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className={inputDivClass}>
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
                    <div className={inputDivClass}>
                        <label className={labelClass}>
                            Upload Image{' '}
                            {errors?.link_url?.message && (
                                <FormErrorMessage>
                                    {errors?.link_url?.message}
                                </FormErrorMessage>
                            )}
                        </label>
                        <input
                            className='rounded-md border px-2 py-2'
                            id='image'
                            type='file'
                            accept='image/*'
                            {...register('image')}
                        ></input>
                    </div>
                    <div className={inputDivClass}>
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
