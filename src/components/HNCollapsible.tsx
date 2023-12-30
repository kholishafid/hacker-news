import * as Collapsible from "@radix-ui/react-collapsible";
import { FC, ReactNode } from "react";

interface HNCollapsibleProps {
  triggerChildren: ReactNode
  children: ReactNode
}

const HNCollapsible: FC<HNCollapsibleProps> = ({ children, triggerChildren }) => {
  return (
    <div>
      <Collapsible.Trigger>
        {triggerChildren}
      </Collapsible.Trigger>
      <Collapsible.Content>
        {children}
      </Collapsible.Content>
    </div>
  );
}

export default HNCollapsible;