type SubCategory = { href: string; title: string };

type Category = {
  title: string;
  href?: string;
  imgUrl?: string;
  subCategories: SubCategory[];
};

type MegaMenu1 = {
  categories: Category[];
};

export type MegaMenu1Props = { data: MegaMenu1; minWidth?: string };

type MegaMenu2 = {
  icon: string;
  href: string;
  title: string;
  menuData?: any;
};

export type MegaMenu2Props = { data: MegaMenu2[] };

type MegaMenu3 = {
  categories: Category[];
};

export type MegaMenu3Props = { data: MegaMenu3; minWidth?: string };

export type MenuItem = {
  icon: string;
  title: string;
  href: string;
  menuData?: any;
  menuComponent?: any;
} & (MegaMenu1 | MegaMenu2 | MegaMenu3);
