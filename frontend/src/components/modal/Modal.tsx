import React from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md'>
        <h2 className='mb-4 text-lg font-bold'>{title}</h2>
        {children}
        <div className='mt-4 flex justify-end'>
          <button
            onClick={onClose}
            className='mr-2 px-4 py-2 bg-gray-500 text-white rounded-md'
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-lime-700 text-white rounded-md'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
