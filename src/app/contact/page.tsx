'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import contactBG from '../../../public/images/contact.jpg';
import PageLayout from '../../components/layouts/PageLayout/PageLayout';

const SvgBlob = () => (
  <svg id="10015.io" viewBox="0 0 960 960" width={640} height={640} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="blob">
        <path
          fill="#474bff"
          d="M375.5,319Q331,398,247.5,384.5Q164,371,97,305.5Q30,240,78.5,142.5Q127,45,239.5,46Q352,47,386,143.5Q420,240,375.5,319Z"
        />
      </clipPath>
    </defs>
  </svg>
);

type ContactFormData = {
  FIRSTNAME: string;
  LASTNAME: string;
  SMS: string;
  COMPANY: string;
  MESSAGE: string;
  WANT_NEWSLETTER: boolean;
};

const inputClassNames = {
  label: 'text-secondary',
  base: 'max-w-lg xl:max-w-xs py-2',
  inputWrapper: 'bg-gray-50 data-[hover=true]:bg-gray-50 group-data-[focus=true]:bg-gray-50 text-gray-900 h-auto py-0',
  input: 'bg-gray-50 text-gray-900 border-0 focus:ring-0',
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <PageLayout title="Let's Get In Touch" background="dark">
      <p>
        If you have any questions or would like to work together, please feel free to reach out to me. I usually reply
        in 3 business days.
      </p>
      <div className="flex gap-8 py-4">
        <div className="relative hidden flex-1 xl:flex">
          <Image src={contactBG} alt="Background of Landing Page" className="absolute h-full object-cover" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-wrap justify-center gap-2">
          <Input
            {...register('FIRSTNAME')}
            radius="full"
            label="First Name"
            size="sm"
            labelPlacement="outside"
            placeholder="Enter your first name"
            classNames={inputClassNames}
            type="text"
          />
          <Input
            {...register('LASTNAME')}
            radius="full"
            label="Last Name"
            size="sm"
            labelPlacement="outside"
            placeholder="Enter your last name"
            classNames={inputClassNames}
            type="text"
          />
          <Input
            {...register('SMS')}
            radius="full"
            label="Phone Number"
            size="sm"
            labelPlacement="outside"
            placeholder="Enter your phone number"
            classNames={inputClassNames}
            type="text"
          />
          <Input
            {...register('COMPANY')}
            radius="full"
            label="Company"
            size="sm"
            labelPlacement="outside"
            placeholder="Enter your company name"
            classNames={inputClassNames}
            type="text"
          />
          <Textarea
            {...register('MESSAGE')}
            label="Your Message"
            size="sm"
            labelPlacement="outside"
            placeholder="Enter your message"
            classNames={inputClassNames}
            type="text"
          />
          <Button
            radius="full"
            className="mt-2 w-full max-w-lg bg-purple-500 px-12 py-2 font-semibold tracking-tight text-gray-50 hover:bg-purple-700 data-[hover]:opacity-100 xl:max-w-xs"
            type="submit"
          >
            Connect With Me
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
