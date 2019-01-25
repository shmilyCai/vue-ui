import { GetterTree, Getter } from 'vuex'
import { State, CartProduct } from './index'

const cartProducts: Getter<State, any> = (state: State) => {
  return state.cart.added.map((shape:any) => {
    const product = state.products.all.find((p:any) => p.id === shape.id)
    if (product) {
      const cartProduct: CartProduct = {
        title: product.title,
        price: product.price,
        quantity: shape.quantity,
      }
      return cartProduct
    }
  })
}

const getterTree: GetterTree<State, any> = {
  cartProducts,
}

export default getterTree