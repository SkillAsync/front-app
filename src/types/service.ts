export interface dataServie {
  uuid:string,
  image: string,
  user: {
    uuid:string,
    first_name: string
  },
  category: {
    uuid:string,
    name: string
  },
  title: string,
  description: string,
  price: number
}

export interface service {
  data : dataServie,
}
