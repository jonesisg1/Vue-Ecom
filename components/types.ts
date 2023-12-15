export interface Product {
    id?: number,
    img?: string,
    title?: string,
    price?: number,
    color?: string,
    type?: string,
  }

export interface State {
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

type ForkTravelOptions = Record<string, string[]>;
type WheelSizesOptions = Record<string, string[]>;

export interface Bike {
  brand: string;
  price: number;
  bike_id: number;
  category: string;
  created_at: string;
  model_name: string;
  model_year: number | null;
  fork_travel: ForkTravelOptions[];
  wheel_sizes: WheelSizesOptions[];
  bike_alt_ref: string;
  model_family: string;
  frame_material: string;
};

export interface BikeFilterSelection {
  header: string,
  selection: string[]
}

export interface BikeFilterState {
  [key: string]: string[];
};