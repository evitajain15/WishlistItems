const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
        item_name: {
            type: String,
            required: true
        },
        selected_item: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    })

ItemSchema.virtual('item_id').get(function () {
    return this._id;
})


module.exports = mongoose.model('WishlistItems', ItemSchema);