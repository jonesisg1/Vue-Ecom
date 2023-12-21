export interface Product {
    id?: number,
    img?: string,
    title?: string,
    price?: number,
    color?: string,
    type?: string,
  }

export interface State {
    filtersVisible: boolean,
    productInfo: Product,
    cartItems: Product[],
    items: Product[],
  }

export interface Filters {
  types: string[],
  colors: string[],
  minPrice: number,
  maxPrice: number
}

export interface BikeSizeData {
  [key: string] : string[]
}

export type SizesOptions = Record<string, string[]>;

export interface Bike {
  brand: string;
  price: number;
  bike_id: number;
  category: string;
  created_at: string;
  model_name: string;
  model_year: number | null;
  fork_travel: SizesOptions[];
  wheel_sizes: SizesOptions[];
  bike_alt_ref: string;
  model_family: string;
  frame_material: string;
  sizes_in_stock: string[];
  book_price_from: number;
  book_price_to?: number
  best_price: number;
  img_src: string;
};

export interface BikeFilterSelection {
  header: string,
  selection: string[]|number[]
}

export interface BikeFilterState {
  [key: string]: string[]|number[];
};