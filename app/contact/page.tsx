import * as React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'

type Inputs = {
    name: string;
    email: string;
    topic: string;
    message: string;
}

export default function ContactUs() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const payload = await response.json();
            if (!payload.success) {
                //
            } else {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='columns contact-us'>
            <div className='column left-show'>
                <h1 className='mb-4 is-size-1 is-size-3-mobile has-text-weight-bold'>Contact Us</h1>
                <p className='feedback-text'>We all love feedback especially us, reach out to us on anything and everything</p>
            </div>
            <div className='column right-details'>
                <div>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <div className="field-body">
                                <div className="field">
                                    <div className='control'>
                                        <input className={`input ${errors.name && 'is-danger'}`} type="text" placeholder="Your Name" {...register("name", {
                                            required: 'Name is required.',
                                            maxLength: {
                                                value: 20,
                                                message: 'Name is too long'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Name too short'
                                            }
                                        })} />
                                    </div>
                                    {errors.name && (
                                        <p className="help is-danger">
                                            {errors.name.message || 'Input is invalid'}
                                        </p>
                                    )}
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${errors.email && 'is-danger'}`} type="email" placeholder="Your Email" {...register("email", {
                                            required: 'Email is required',
                                            maxLength: {
                                                value: 30,
                                                message: 'Email is too long'
                                            },
                                            pattern: {
                                                value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/,
                                                message: 'Email is not valid'
                                            }
                                        })} />
                                    </div>
                                    {errors.email && (
                                        <p className="help is-danger">
                                            {errors.email.message || 'Input is invalid'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className={`input ${errors.topic && 'is-danger'}`} type="text" placeholder="Provide the subject of this communication" {...register("topic", {
                                            required: 'A topic is required'
                                        })} />
                                    </div>
                                    {
                                        errors.topic && (
                                            <p className="help is-danger">
                                                {errors.topic.message || 'Invalid input'}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <textarea className={`textarea ${errors.message && "is-danger"}`} placeholder="Explain how we can help you" {...register("message", {
                                            required: 'A message is required'
                                        })}></textarea>
                                    </div>
                                    {errors.message && (
                                        <p className='help is-danger'>
                                            {errors.message.message || 'Invalid input'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-secondary is-block is-full-width text-white">
                                            Send message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
