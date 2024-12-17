export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface LoginUserResponseInterface {
  user: User;
  session_id: string;
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_photo: string;
  email: string;
  password_changed_at: string;
  created_at: string;
}

export interface MediaUploadInterface {
  image: string;
  filename: string;
}

export interface MediaUploadResponseInterface {
  media_ref: string;
  url: string;
  aws_id: string;
  created_at: string;
}

export interface CreateCollectionInterface {
  collection_description: string;
  collection_name: string;
  header_image: string;
  thumbnail_image: string;
}

export interface FetchItemsInterface {
  page_id: string;
  page_size: string;
}

export interface FetchCollectionResponseInterface {
  collection: Collection[];
  next_page_token: string;
}

export interface Collection {
  id: string;
  collection_name: string;
  collection_description: string;
  thumbnail_image: string;
  header_image: string;
  product_count: string;
  created_at: string;
}

export interface CreateProductRequestInterface {
  product_name: string;
  product_description: string;
  product_code: string;
  price: number;
  sale_price: string;
  collection: number;
  quantity: number;
  color: string;
  size: string;
  status: string;
  main_image: string;
  other_image_1: string;
  other_image_2: string;
  other_image_3: string;
}

export interface MediaInterface {
  id: string;
  media_ref: string;
  url: string;
  aws_id: string;
  created_at: string;
}

export interface ProductMediaInterface {
  id: string;
  product_media_ref: string;
  product_id: string;
  is_main_image: boolean | undefined;
  media_id: MediaInterface;
}

export interface ProductInterface {
  id: string;
  product_ref_no: string;
  product_name: string;
  product_description: string;
  product_code: string;
  price: string;
  sale_price: string;
  product_image_main: ProductMediaInterface;
  product_image_other_1: ProductMediaInterface;
  product_image_other_2: ProductMediaInterface;
  product_image_other_3: ProductMediaInterface;
  collection: Collection;
  quantity: number;
  color: string[];
  size: string[];
  status: string;
  created_at: string;
}

export interface ProductResponseInterface {
  product: ProductInterface[];
  next_page_token: string;
}

export interface CartItemInterface {
  product_id: number;
  product_name: string;
  product_price: string;
  product_quantity: number;
  product_image: string;
  product_color: string;
  product_size: string;
}

export interface RegisterInterface {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface CartResponseRootInterface {
  cart: CartResponseInterface[];
  next_page_token: string;
}

export interface CartResponseInterface {
  id: string;
  product_id: string;
  product_name: string;
  product_price: string;
  product_quantity: string;
  product_image: string;
  product_color: string;
  product_size: string;
  user_ref_id: User;
  created_at: string;
}

export interface UpdateCartItemRequestPayloadInterface {
  item_id: number;
  product_quantity: number;
}

export interface CreateCartRequestInterface {
  product_id: number;
  product_name: string;
  product_price: string;
  product_quantity: number;
  product_image: string;
  product_color: string;
  product_siz: string;
}

export interface FilteredColorsInterface {
  id: number;
  name: string;
}

export interface FilteredSizesInterface {
  id: number;
  name: string;
}

export interface UpdateProductStatusPayload {
  product_id: number;
  status: string;
}

export interface ShippingMethodInterface {
  name: string;
  cost: string;
}

export interface OrderDetailsInterface {
  email_phone: string;
  country: string;
  address: string;
  first_name: string;
  last_name: string;
  town_city: string;
  postal_code: string;
  landmark: string;
  shipping_method: ShippingMethodInterface;
  payment_method: string;
}

export interface OrderDetailsErrorInterface {
  email_phone: string;
  country: string;
  address: string;
  first_name: string;
  last_name: string;
  town_city: string;
  postal_code: string;
  landmark: string;
  shipping_method: string;
  payment_method: string;
}
