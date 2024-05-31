type SubCategory = { href: string; title: string };

export type Category = {
  title: string;
  href: string;
  imgUrl: string | null;
  subCategories: SubCategory[];
};

type MegaMenu1 = {
  menuComponent: "MegaMenu1";
  menuData: {
    categories: Category[];
  };
};

export type MegaMenu1Props = { data: MegaMenu1; minWidth?: string };

type MegaMenu2 = {
  menuComponent: "MegaMenu2";
  menuData: Category[];
};

export type MegaMenu2Props = { data: MegaMenu2[] };

type MegaMenu3 = {
  categories: Category[];
  menuData?: never;
};

export type MegaMenu3Props = { data: MegaMenu3; minWidth?: string };

export type MenuItem = {
  id: string;
  icon: string;
  title: string;
  href: string;
  count: number;
} & (MegaMenu1 | MegaMenu2);
// MegaMenu3;
