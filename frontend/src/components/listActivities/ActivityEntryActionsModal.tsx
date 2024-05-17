import { useEffect, useState } from 'react';
import useClickOutside from '@/utils/useClickOutside';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  actions: { label: string; action: () => void }[];
  alignment?: 'right' | 'left';
};

export default function ActivityEntryActionsModal({
  isOpened,
  onClose,
  actions,
  alignment = 'right',
}: Props) {
  const [opened, setOpened] = useState(isOpened);

  useEffect(() => {
    setOpened(isOpened);
  }, [isOpened]);

  const ref = useClickOutside(() => {
    onClose();
  }, opened);

  return (
    <>
      {opened && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className={`bg-very_light_grey shadow-xl z-10 rounded-xl`}
          style={
            alignment === 'left'
              ? { left: '0%', position: 'absolute' }
              : { right: '0%', position: 'absolute' }
          }
        >
          {actions.map(({ label, action }, index) => (
            <div
              key={index}
              onClick={() => {
                action();
                onClose();
              }}
              className='flex items-center justify-start py-2 px-5 poppins-semiBold w-[130px] hover:bg-white rounded-xl'
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
