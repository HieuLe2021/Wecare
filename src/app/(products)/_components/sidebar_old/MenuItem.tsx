import Link from "next/link";
import Icon from "@component/icon/Icon";
import { StyledMenuItem } from "./styles";

// ===============================================================
type CategoryMenuItemProps = {
  href: string;
  icon?: string;
  title: string;
  caret?: boolean;
  children: any;
};
// ===============================================================

export default function MenuItem(props: CategoryMenuItemProps) {
  const { href, icon, title, caret = true, children } = props;

  return (
    <StyledMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {icon && <Icon variant="small">{icon}</Icon>}
          <span className="title">{title}</span>
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>

      {children}
    </StyledMenuItem>
  );
}
