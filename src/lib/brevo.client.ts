'use server';

import axios from 'axios';

import config from './config';

const brevoAxiosInstance = axios.create({
  baseURL: config.brevoUrl!,
  headers: {
    accept: 'application/json',
    'api-key': config.brevoKey,
    'content-type': 'application/json',
  },
});

export async function subToNewsletter(email: string) {
  try {
    const { data } = await brevoAxiosInstance.post('/contacts/', {
      email,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return { message: 'Something went wrong and we could not submit your form. Please try again later.' };
  }
}

export async function submitContactForm(contactForm: {
  email: string;
  FIRSTNAME: string;
  LASTNAME: string;
  COMPANY: string;
  NEWSLETTER: boolean;
  MESSAGE: string;
}) {
  const payload = {
    email: contactForm.email,
    attributes: {
      ...contactForm,
      WANT_NEWSLETTER: contactForm.NEWSLETTER,
    },
    updateEnabled: true,
    listIds: contactForm.NEWSLETTER ? [6, 7] : [7],
  };
  try {
    const { data } = await brevoAxiosInstance.post('/contacts/', payload);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return { message: 'Something went wrong and we could not submit your form. Please try again later.' };
  }
}
