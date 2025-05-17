interface Country {
  id: number;
  country: string;
  locale: string;
  name: string;
  icon: string;
  active: boolean;
  top_apps: boolean;
  is_top_collected: boolean;
}

interface CategoryItem {
  id: number;
  name: string;
}

interface Category extends CategoryItem {
  categories: CategoryItem[];
}

type TopHistory = Record<number, Record<number, Record<number, number>>>;

export type { Country, Category, CategoryItem, TopHistory };
