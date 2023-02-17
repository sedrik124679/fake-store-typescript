export interface IProduct {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rating: {
        rate: number,
        count: number
    },
    category: string
}

export interface ICart {
    id: number,
    userId: number,
    date: string,
    products: {
        productId: number,
        quantity: number
    }[]
}
