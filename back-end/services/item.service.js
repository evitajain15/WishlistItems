const WishlistItems = require('../models/item.model');

module.exports = {
    addItem: (item, callback) => {
        const items = new WishlistItems({
            item_name: item.item_name ,
            selected_item: item.selected_item
        });

        items.save()
            .then(returnedItem => {
                return callback(null, returnedItem);
            }).catch(err => {
                return callback(err, null);     
            });
    },

    getItems: (callback) => {
        WishlistItems.find( {}, function (err, data) {
            if (!err) {
                return callback(null, data)
            }
            return callback(err, null);
        });
    },

    findItem: (item_id,callback) => {
        WishlistItems.find({ _id:item_id },'_id item_name selected_item', function (err, data) {
            if (!err) {
                return callback(null, data)
            }
            return callback(err, null)
        })
    },

    updateItem: (item, item_id, callback) => {
        const itemToUpdate = {
            item_name: item.item_name,
            selected_item: item.selected_item
        };
        WishlistItems.findByIdAndUpdate(item_id, itemToUpdate, {
            new: true
        })
            .then(returnedItem => {
                if (!returnedItem) {
                    return callback(true, null);
                }
                return callback(null, returnedItem);
            })
            .catch(err => {
                return callback(err, null);
        })
    },

    deletedItem: (item_id, callback) => {
        WishlistItems.findByIdAndDelete(item_id, {_id: item_id})
            .then(returnedItem => {
                if (!returnedItem) {
                     return callback(null, returnedItem);
                }
               
            })
            .catch(err => {
                return callback(err, null);
        })
    }
}