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

const subToNewsletter = async (email: string) => {
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
};

const submitContactForm = async (contactForm: any) => {
  try {
    const { data } = await brevoAxiosInstance.post('/contacts/', contactForm);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return { message: 'Something went wrong and we could not submit your form. Please try again later.' };
  }
};

const brevoApi = {
  submitContactForm,
  subToNewsletter,
};

export default brevoApi;
