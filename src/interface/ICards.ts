export interface ICard {
  name: string
  manaCost: string
  cmc: number
  colors: string[]
  colorIdentity: string[]
  type: string
  types: string[]
  subtypes: string[]
  rarity: string
  set: string
  setName: string
  text: string
  artist: string
  number: string
  power: string
  toughness: string
  layout: string
  multiverseid: string
  imageUrl: string
  variations: string[]
  foreignNames: ICardForeignName[]
  printings: string[]
  originalText: string
  originalType: string
  legalities: ICardLegalityElement[]
  id: string
}

export interface ICardForeignName {
  name: string
  text: string
  type: string
  flavor: string
  imageUrl: string
  language: string
  multiverseid: number
}

export interface ICardLegalityElement {
  format: string
  legality: ICardLegalityEnum
}

export enum ICardLegalityEnum {
  Legal = 'Legal',
  Restricted = 'Restricted'
}
