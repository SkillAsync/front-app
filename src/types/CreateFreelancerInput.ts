export interface CreateFreelancerInput {
  user: {
    connect: string
  }
  category: {
    connect: string
  }
  description: string
}
