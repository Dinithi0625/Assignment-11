export default class CartModel{
    constructor(id,cartItem,price,quantity,total) {
        this._cartItem = cartItem;
        this._price = price;
        this._quantity = quantity;
        this._total = total;
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get cartItem() {
        return this._cartItem;
    }

    set cartItem(value) {
        this._cartItem = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}