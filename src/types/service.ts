interface dataServie {
  image: string,
  user: {
    first_name: string
  },
  category: {
    name: string
  },
  title: string,
  description: string
}

export interface service {
  data : dataServie,
}
