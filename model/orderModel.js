export default class OrderModel{
    constructor(id,date,customer,item,quantity,paymentMethod,discount,total) {
        this._id = id;
        this._customer = customer;
        this._item = item;
        this._quantity = quantity;
        this._paymentMethod = paymentMethod;
        this._discount = discount;
        this._total = total;
        this._date = date;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get paymentMethod() {
        return this._paymentMethod;
    }

    set paymentMethod(value) {
        this._paymentMethod = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}