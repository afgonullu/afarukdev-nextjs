'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import brevoApi from '../../../lib/brevo.client';
import LandingSection from '../../layouts/LandingSection/LandingSection';

const defaultModalMessage = {
  title: 'Thank you!',
  message:
    'You have subscribed to my newsletter! I promise to only send you the best content and keep your email a secret.',
};

const formSchema = z.object({
  email: z.string().email(),
});

const MailIcon = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

const NewsletterSub = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState(defaultModalMessage);

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await brevoApi.subToNewsletter(values.email);

    if (result.message) {
      setMessage({ title: 'There was an error :/', message: result.message });
    }

    onOpen();
  };

  const handleModalClose = (onClose: () => void) => {
    onClose();
    setMessage(defaultModalMessage);
  };

  return (
    <LandingSection title="" background="secondary" image="/images/newsletter.jpg" imagePosition="right">
      <div className="flex max-w-max flex-col justify-start text-center xl:text-end">
        <h4>Join the Newsletter</h4>
        <p>
          Every day, I craft articles and generate content with the sole intent of delivering value to you. By joining,
          you will receive the latest posts and updates directly in your mailbox!{' '}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-4xl flex-wrap items-center justify-center gap-4 py-4 xl:justify-end"
        >
          <Input
            {...register('email')}
            radius="full"
            classNames={{
              label: 'none',
              base: 'max-w-xs',
              inputWrapper:
                'bg-gray-50 data-[hover=true]:bg-gray-50 group-data-[focus=true]:bg-gray-50 text-purple-700 h-auto py-0',
              input: 'bg-gray-50 text-purple-700 border-0 focus:ring-0',
            }}
            type="email"
            placeholder="you@example.com"
            startContent={<MailIcon className="pointer-events-none shrink-0 text-2xl text-purple-700" />}
          />
          <Button
            radius="full"
            className="bg-purple-500 px-12 font-semibold tracking-tight text-gray-50 hover:bg-purple-700 data-[hover]:opacity-100"
            type="submit"
          >
            Subscribe
          </Button>
        </form>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{message.title}</ModalHeader>
              <ModalBody>
                <p>{message.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => handleModalClose(onClose)}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </LandingSection>
  );
};

export default NewsletterSub;
