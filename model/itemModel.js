export default class ItemModel{
    constructor(id,code,description,qty,unitPrice) {
        this._id = id;
        this._description = description;
        this._qty = qty;
        this._unitPrice = unitPrice;
        this._code = code;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }
}