export interface IPromotionalCode {
  _id?: string
  promotionalCode: string
  discountType: string
  value: number
  minimumAmount: number
  state: boolean
}