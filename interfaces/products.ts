export interface IProduct {
  _id?: string
  name: string
  description: string
  dimentions: { weight: string, height: string, width: string, length: string  }
  images: string[]
  stock: number
  price: number
  beforePrice?: number
  cost?: number
  timeOffer?: string
  variations?: ITypeVariation
  productsOffer?: IProductsOffer[]
  informations?: IInformation[]
  slug: string
  tags: string[]
  category: { category: string, slug: string }
  reviews?: IReview[]
  state: boolean,
  sku?: string,
  titleSeo?: string
  descriptionSeo?: string
  quantityOffers?: IQuantityOffer[]

  createdAt?: string
  updatedAt?: string
}

export interface IReview {
  _id?: string
  calification: number
  name: string
  email?: string
  title?: string
  review: string
  createdAt: Date
}

export interface IProductsOffer {
  productsSale: IProductOffer[]
  price: number
}

export interface IProductOffer {
  name: string
  beforePrice: number
  images: string[]
  slug: string
  variations?: ITypeVariation
  category: string
  price: number
  dimentions: { weight: string, height: string, width: string, length: string }
}

export interface ITypeVariation {
  nameVariation: string
  formatVariation: string
  nameVariations: { variation: string, colorVariation?: string }[]
  nameSubVariation?: string
  formatSubVariation?: string
  nameSubVariations?: { subVariation: string, colorSubVariation?: string }[]
  nameSubVariation2?: string
  formatSubVariation2?: string
  nameSubVariations2?: { subVariation2: string, colorSubVariation2?: string }[]
  variations: IVariation[]
}

export interface IVariation {
  variation: string
  subVariation?: string
  subVariation2?: string
  stock: number
  image?: string
  sku?: string
}

export interface IQuantityOffer {
  _id?: string
  quantity: number
  descount: number
}

export interface IInformation {
  title?: string
  description?: string
  image?: string
  align: string
}