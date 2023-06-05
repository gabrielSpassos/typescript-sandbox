export class ShoppingCart {
  products: Product[] = []
  defaultDiscount = 0;

  hello(): number {
    return 42;
  }

  addProduct(product: Product) {
    const productIndex = this.findProductIndexById(product.id);
    if (productIndex == -1) {
      this.products.push(product);
    }else{
      this.updateProductQuantity(product.id, this.products[productIndex].quantity + product.quantity)
    }
  }

  viewCart(): Product[] {
    return this.products;
  }

  removeProduct(productId: number) {
    const productIndex = this.findProductIndexById(productId);
    this.products.splice(productIndex, 1)
  }

  updateProductQuantity(productId: number, quantity: number) {
    const productIndex = this.findProductIndexById(productId);
    this.products[productIndex].quantity = quantity
  }

  getTotalCost(): number{
    return this.products.reduce((total, p) => (p.price * p.quantity) + total, 0);
  }

  addDiscount(productId: number, discount: Discount) {
    const productIndex = this.findProductIndexById(productId);
    const discountValue = this.getDiscountValue(discount);

    this.products[productIndex].price = this.products[productIndex].price - (this.products[productIndex].price * (discountValue / 100))
    this.products[productIndex].discount = discount;
  }

  checkout(): string {
    const totalCost = this.getTotalCost();
    const endCheckoutMessage = `\nTotal Cost: ${totalCost}`;
    const productsMessage = this.products.map(product => this.formatProduct(product)).join("\n");
    return productsMessage + endCheckoutMessage;
  }

  findProductIndexById(productId: number): number {
    return this.products.findIndex(p => p.id === productId);
  }

  formatProduct(product: Product): string {
    const discountValue = null != product.discount ? this.getDiscountValue(product.discount) : this.defaultDiscount;
    return `Product Id: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}, Discount: ${discountValue}.`;
  }

  getDiscountValue(discount: Discount): number {
    const discountValue = null != discount.value 
          ? discount.value 
          : null != discount.type ? discount.type.value : this.defaultDiscount;
    return discountValue;
  }
}

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount?: Discount;
};

export type Discount = { 
  value?: number;
  type?: DiscountType;
};

export type DiscountType = {
  name: string;
  value: number;
}