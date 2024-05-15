import clsx from 'clsx';
import { InputHTMLAttributes, useEffect, useRef } from 'react';

interface InputCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  partiallyChecked?: boolean;
}

export default function InputCheckbox({
  id,
  label,
  className,
  partiallyChecked = false,
  ...props
}: InputCheckboxProps) {
  const defaultClasses = 'relative flex items-start';
  const inputClasses = 'flex h-6 items-center';
  const labelClasses = 'ml-3 text-sm leading-6';

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = partiallyChecked;
    }
  }, [partiallyChecked]);

  return (
    <div className={clsx(defaultClasses, className)}>
      <div className={inputClasses}>
        <input
          ref={inputRef}
          id={id}
          aria-describedby={`${id}-description`}
          name={id}
          type='checkbox'
          className='h-4 w-4 rounded cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600'
          {...props}
        />
      </div>
      <div className={labelClasses}>
        <label htmlFor={id} className='font-normal text-gray-900'>
          {label}
        </label>
      </div>
    </div>
  );
}
