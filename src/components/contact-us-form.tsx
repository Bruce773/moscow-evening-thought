'use client';

import { FormEvent, useState } from 'react';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactUsForm() {
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        body.append(key, value);
      }
    });

    try {
      const response = await fetch('/netlify-forms.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p
        className='mx-auto mt-7 max-w-[500px] border border-[#d0ac63] bg-[#071a31]/70 px-4 py-3 text-center font-sans text-sm text-[#f1e7cd]'
        role='status'
      >
        Thank you. We will be in touch soon.
      </p>
    );
  }

  return (
    <form
      className='mx-auto mt-7 flex max-w-[500px] flex-col gap-3'
      name='contact-us'
      method='POST'
      action='/netlify-forms.html'
      data-netlify='true'
      netlify-honeypot='bot-field'
      aria-busy={status === 'submitting'}
      onSubmit={handleSubmit}
    >
      <input type='hidden' name='form-name' value='contact-us' />
      <p className='hidden'>
        <label>
          Do not fill this out if you are human: <input name='bot-field' />
        </label>
      </p>
      <label className='sr-only' htmlFor='contact-name'>
        Name
      </label>
      <input
        className='min-w-0 border border-[rgba(214,178,100,0.55)] bg-[#071a31]/70 px-4 py-3 font-sans text-sm text-[#f1e7cd] placeholder:text-[#c7b997]/70 focus:border-[#e8c77e] focus:outline-none focus:ring-1 focus:ring-[#e8c77e]'
        id='contact-name'
        name='name'
        type='text'
        autoComplete='name'
        placeholder='Name'
        required
        disabled={status === 'submitting'}
      />
      <label className='sr-only' htmlFor='contact-email'>
        Email address
      </label>
      <input
        className='min-w-0 border border-[rgba(214,178,100,0.55)] bg-[#071a31]/70 px-4 py-3 font-sans text-sm text-[#f1e7cd] placeholder:text-[#c7b997]/70 focus:border-[#e8c77e] focus:outline-none focus:ring-1 focus:ring-[#e8c77e]'
        id='contact-email'
        name='email'
        type='email'
        autoComplete='email'
        placeholder='Email address'
        required
        disabled={status === 'submitting'}
      />
      <label className='sr-only' htmlFor='contact-phone'>
        Phone number (optional)
      </label>
      <input
        className='min-w-0 border border-[rgba(214,178,100,0.55)] bg-[#071a31]/70 px-4 py-3 font-sans text-sm text-[#f1e7cd] placeholder:text-[#c7b997]/70 focus:border-[#e8c77e] focus:outline-none focus:ring-1 focus:ring-[#e8c77e]'
        id='contact-phone'
        name='phone'
        type='tel'
        autoComplete='tel'
        placeholder='Phone number (optional)'
        disabled={status === 'submitting'}
      />
      <label className='sr-only' htmlFor='contact-message'>
        Message
      </label>
      <textarea
        className='min-w-0 border border-[rgba(214,178,100,0.55)] bg-[#071a31]/70 px-4 py-3 font-sans text-sm text-[#f1e7cd] placeholder:text-[#c7b997]/70 focus:border-[#e8c77e] focus:outline-none focus:ring-1 focus:ring-[#e8c77e]'
        id='contact-message'
        name='message'
        rows={4}
        placeholder='Ask us a question or request a future discussion topic.'
        required
        disabled={status === 'submitting'}
      />
      <button
        className='border border-[#d0ac63] bg-[#d0ac63] px-5 py-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#071a31] transition-colors hover:bg-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a31] disabled:cursor-wait disabled:opacity-70'
        type='submit'
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit'}
      </button>
      {status === 'error' && (
        <p className='font-sans text-sm text-[#f1e7cd]' role='alert'>
          We could not submit your message. Please try again.
        </p>
      )}
    </form>
  );
}
