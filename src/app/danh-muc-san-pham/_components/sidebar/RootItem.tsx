import Link from "next/link";
import Icon from "@component/icon/Icon";

import { StyledMenuItem } from "./components";

type CategoryRootItemProps = {
  href: string;
  icon?: string;
  title: string;
  caret?: boolean;
  count: number;
  children: any;
};

export default function RootItem(props: CategoryRootItemProps) {
  const { href, icon, title, caret = true, children, count } = props;

  return (
    <StyledMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {icon && <Icon variant="small">{icon}</Icon>}
          <span className="title">{title}</span>
          <span>({count})</span>
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>

      {children}
    </StyledMenuItem>
  );
}
