import { useEffect, useRef } from 'react';

export default function useClickOutside(
  callback: () => void,
  isOpened: boolean,
) {
  const ref = useRef<any>();

  const handleClick = (e: any) => {
    if (isOpened && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpened]);

  return ref;
}
