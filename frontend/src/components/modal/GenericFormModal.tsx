import React, { FormEvent, ReactNode } from 'react';
import Typography from '@/components/commons/typography/Typography';
import Button from '@/components/commons/buttons/Button';

interface GenericModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  title,
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <div className='modal-box w-11/12 max-w-5xl absolute z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Typography variant='heading' className='pb-2 text-black'>
        {title}
      </Typography>
      <form method='dialog' onSubmit={onSubmit} className='m-4'>
        <button
          type='button'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black hover:bg-[#204660] hover:text-white text-lg font-light'
          onClick={onClose}
        >
          ✕
        </button>
        {children}
        <div className='text-right'>
          <Button className='mt-2' size='xl' type='submit' data-testid='submit'>
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenericModal;
