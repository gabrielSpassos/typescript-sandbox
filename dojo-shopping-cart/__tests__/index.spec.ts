import { ShoppingCart, Product, Discount, DiscountType } from "../index";
import { describe, it, expect, beforeEach } from "@jest/globals";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;
  let product: Product;
  let discount: Discount;
  let discountType : DiscountType;

  beforeEach(() => {
    cart = new ShoppingCart();
    product = { id: 1, name: "p1", price: 10, quantity: 1 };
    discount = { value: 20 };
    discountType = { name: "buy-one-get-one-free", value: 50 };
  });

  it("should return 42", () => {
    expect(cart.hello()).toBe(42);
  });

  it("add product", () => {
    cart.addProduct(product);
    expect(cart.viewCart().length).toBe(1);
  });

  it("remove product", () => {
    cart.addProduct(product);
    cart.removeProduct(1);
    expect(cart.viewCart().length).toBe(0);
  });

  it("update cart", () => {
    cart.addProduct(product);
    cart.updateProductQuantity(1, 2);
    expect(cart.viewCart()[0].quantity).toBe(2);
  })

  it("total cost", () => {
    product = {id: 1, name: "p1", price: 10, quantity: 2 }

    cart.addProduct(product);
    expect(cart.getTotalCost()).toBe(20);
  });

  it("give discount", () => {
    product = {id: 1, name: "p1", price: 10, quantity: 2}

    cart.addProduct(product);
    cart.addDiscount(1, discount);
    expect(cart.getTotalCost()).toBe(16);
  });

  it("give discount with discount type", () => {
    product = {id: 1, name: "p1", price: 10, quantity: 2}
    discount = { type: discountType }

    cart.addProduct(product);
    cart.addDiscount(1, discount);
    expect(cart.getTotalCost()).toBe(10);
  });

  it("checkout", () =>{
    product = { id: 1, name: "p1", price: 10, quantity: 2}
    const message = "Product Id: 1, Name: p1, Price: 10, Quantity: 2, Discount: 0.\nTotal Cost: 20";

    cart.addProduct(product);
    expect(cart.checkout()).toBe(message);
  });

  it("checkout with discount", () =>{
    product = { id: 1, name: "p1", price: 10, quantity: 2}
    const message = "Product Id: 1, Name: p1, Price: 8, Quantity: 2, Discount: 20.\nTotal Cost: 16";

    cart.addProduct(product);
    cart.addDiscount(1, discount);
    expect(cart.checkout()).toBe(message);
  });

  it("checkout with multiple products", () =>{
    const product2 = { id: 2, name: "p2", price: 25, quantity: 1}
    const message = "Product Id: 1, Name: p1, Price: 10, Quantity: 1, Discount: 0.\nProduct Id: 2, Name: p2, Price: 25, Quantity: 1, Discount: 0.\nTotal Cost: 35";

    cart.addProduct(product);
    cart.addProduct(product2);
    expect(cart.checkout()).toBe(message);
  });

  it("checkout with multiple products and multiple discount", () =>{
    const product2 = { id: 2, name: "p2", price: 25, quantity: 1}
    const discount2 = { type: discountType }
    const message = "Product Id: 1, Name: p1, Price: 8, Quantity: 1, Discount: 20.\nProduct Id: 2, Name: p2, Price: 12.5, Quantity: 1, Discount: 50.\nTotal Cost: 20.5";

    cart.addProduct(product);
    cart.addDiscount(1, discount);
    cart.addProduct(product2);
    cart.addDiscount(2, discount2);
    expect(cart.checkout()).toBe(message);
  });

});
