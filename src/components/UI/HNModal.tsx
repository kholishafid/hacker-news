import { FC, ReactNode } from "react";
import * as Dialog from '@radix-ui/react-dialog';

interface HNModalProps {
  children: ReactNode
  trigger: ReactNode
}

const HNModal: FC<HNModalProps> = ({ children, trigger }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/5" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg p-6"
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  );
}

export default HNModal;