import { defineStore } from "pinia";
import type { State } from '@/components/types'

export const useMainStore = defineStore("main", {
  state: (): State => ({
    filtersVisible: true,
    productInfo: {},
    cartItems: [],
    items: [],
  }),
  getters: {
    // Cart Component
    itemsNumber: ({ cartItems }): number => cartItems.length,
    totalPrice: ({ cartItems }): number | undefined => {
      if (cartItems.length !== 1) {
        const sum = cartItems?.reduce((acc: number, obj: any) => {
          let result = acc + obj.price
          return result
        },0);
        return sum;
      }
      return cartItems[0].price;
    },
  },
  actions: {
    // Cart Component
    inCart(n: object) {
      return this.cartItems.push(n);
    },
    outCart(n: number) {
      let index = this.cartItems.findIndex((x) => x.id === n);
      return this.cartItems.splice(index, 1);
    },
    // Info Component
    addtoInfo(n: number) {
      const selectedProduct = this.items.find((item) => item.id === n);
      this.productInfo = selectedProduct! ;
    },
    showFilter() {
      this.filtersVisible = true
    },
    hideFilter() {
      this.filtersVisible = false
    }
  },
});
