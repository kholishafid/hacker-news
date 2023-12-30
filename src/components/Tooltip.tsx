import * as Tooltip from '@radix-ui/react-tooltip';

import { FC } from 'react';

interface HNTooltipsProps {
  children: React.ReactNode,
  text: string
}

const HNTooltips: FC<HNTooltipsProps> = ({ children, text }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className='bg-gray-700 rounded-md text-xs text-gray-50 py-1 px-2' sideOffset={5}
          >
            {text}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default HNTooltips