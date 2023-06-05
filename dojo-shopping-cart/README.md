# TypeScript Shopping Cart Challenge

The purpose of this challenge is to design and implement a simple shopping cart system with TypeScript.

## Requirements

Your task is to write a program with the following functionality:

1. **Adding and Removing Items:** Users should be able to add items to the cart and remove them. Each item should have a unique ID, a name, and a price. You will need to implement methods for adding and removing items.

    ```typescript
    addProduct(product: Product): void;
    removeProduct(productId: number): void;
    ```

2. **Updating Quantity:** Users should be able to update the quantity of a given item in the cart.

    ```typescript
    updateProductQuantity(productId: number, quantity: number): void;
    ```

3. **Calculating Total Cost:** The cart should be able to calculate and return the total cost of all items in it, taking into account their quantities.

    ```typescript
    getTotalCost(): number;
    ```

4. **Discounts and Promotions:** The program should be able to handle various discounts and promotions, such as buy-one-get-one-free deals and percentage discounts on certain items. Implement a method to add a discount to a product, and ensure that this discount is taken into account when calculating the total cost.

    ```typescript
    addDiscount(productId: number, discount: Discount): void;
    ```

5. **Viewing Cart Contents:** Users should be able to view the current contents of their cart at any time. This should include each item's ID, name, quantity, and price, as well as any discounts applied to it.

    ```typescript
    viewCart(): Product[];
    ```

6. **Checking Out:** When the user checks out, they should receive a receipt listing all the items in their cart, their quantities, prices, and any discounts, along with the total cost.

    ```typescript
    checkout(): Receipt;
    ```

## Constraints

- Use TypeScript for this challenge.
- All product IDs are unique and positive integers.
- All product quantities are positive integers.
- All product prices are positive numbers, to two decimal places.
- All discounts are either a percentage off (0-100) or a buy-one-get-one-free deal.

## Usage

* Install dependencies 

```shell
npm install
```

* Run unit tests

```shell
npm test
```