import {apiClient} from "./client.ts"

class Woocommerce {
  private api = apiClient;

  constructor(){}


  async getAllProducts<T>() : Promise<T> {
    const data = await this.api.get('/products');
    return data
  }

  async getSingleProduct<T> (id : string) : Promise<T> {
   const data = await this.api.get(`/products/${id}`); 
  }

}

export const woo = new Woocommerce()
