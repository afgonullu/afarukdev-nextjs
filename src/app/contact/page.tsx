'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import contactBG from '../../../public/images/contact.jpg';
import PageLayout from '../../components/layouts/PageLayout/PageLayout';
import brevoApi from '../../lib/brevo.client';

const defaultModalMessage = {
  title: 'Thank you!',
  message:
    'I have received your message! I will get back to you as soon as possible. In the meantime, feel free to check out my blog.',
};

export const contactFormSchema = z.object({
  FIRSTNAME: z.string().min(2),
  LASTNAME: z.string().min(2),
  email: z.string().email(),
  COMPANY: z.string(),
  MESSAGE: z.string().min(10),
  NEWSLETTER: z.boolean(),
});

const inputClassNames = {
  label: 'text-secondary',
  base: 'max-w-lg xl:max-w-xs py-2',
  inputWrapper: 'bg-gray-50 data-[hover=true]:bg-gray-50 group-data-[focus=true]:bg-gray-50 text-gray-900 h-auto py-0',
  input: 'bg-gray-50 text-gray-900 border-0 focus:ring-0',
};

const ContactPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState(defaultModalMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof contactFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      FIRSTNAME: '',
      LASTNAME: '',
      email: '',
      COMPANY: '',
      MESSAGE: '',
      NEWSLETTER: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    const result = await brevoApi.submitContactForm(values);

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
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={errors.email ? 'true' : 'false'}
                isInvalid={!!errors.email}
                radius="full"
                label="Email"
                size="sm"
                labelPlacement="outside"
                placeholder="Enter your email"
                classNames={inputClassNames}
                type="text"
              />
            )}
          />
          <Controller
            name="FIRSTNAME"
            control={control}
            render={({ field }) => (
              <Input
                aria-invalid={errors.FIRSTNAME ? 'true' : 'false'}
                isInvalid={!!errors.FIRSTNAME}
                {...field}
                radius="full"
                label="First Name"
                size="sm"
                labelPlacement="outside"
                placeholder="Enter your first name"
                classNames={inputClassNames}
              />
            )}
          />
          <Controller
            name="LASTNAME"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={errors.LASTNAME ? 'true' : 'false'}
                isInvalid={!!errors.LASTNAME}
                radius="full"
                label="Last Name"
                size="sm"
                labelPlacement="outside"
                placeholder="Enter your last name"
                classNames={inputClassNames}
                type="text"
              />
            )}
          />
          <Controller
            name="COMPANY"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={errors.COMPANY ? 'true' : 'false'}
                isInvalid={!!errors.COMPANY}
                radius="full"
                label="Company"
                size="sm"
                labelPlacement="outside"
                placeholder="Enter your company name"
                classNames={inputClassNames}
                type="text"
              />
            )}
          />
          <Controller
            name="MESSAGE"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                aria-invalid={errors.MESSAGE ? 'true' : 'false'}
                isInvalid={!!errors.MESSAGE}
                label="Your Message"
                size="sm"
                labelPlacement="outside"
                placeholder="Enter your message"
                classNames={inputClassNames}
                type="text"
              />
            )}
          />
          <Controller
            name="NEWSLETTER"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} value={field.name} className="w-full" classNames={inputClassNames}>
                I want to receive the newsletter.
              </Checkbox>
            )}
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
    </PageLayout>
  );
};

export default ContactPage;
