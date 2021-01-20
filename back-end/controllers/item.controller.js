const { request, response } = require('express');
const itemService = require('../services/item.service');


module.exports = {
    createItem: (request, response) => {
        let items = request.body;
        
        if (!items.item_name || !items.selected_item) {
            return response.status(400).send("All the details are mandatory.");
        }

        itemService.addItem(items, function (err, returnedItem) {
            if (err) {
                //Send error response
                return response.status(400).send("Something went wrong while storing the details. Please try after some time.");
            }
            return response.status(200).send(returnedItem);
        });
    },

    getItem: (request, response) => {
        itemService.getItems(function (err, data) {
            if (err) {
                return response.status(404).send("Something went wrong. Please try after some time.");
            }
            if (data && data.length > 0) {
                return response.status(200).send( data);
                // return response.status(200).json(new response(200, data));
            }
            return response.status(404).send("No Items found.");
        });
    },

    getItembyId: (request, response) => {
        let item_id = request.params.item_id;
        if (!item_id) {
            return response.status(400).send("Please specify a valid item id.");
        }
        itemService.findItem(item_id, function (err, data) {
            if (err) {
               return response.status(404).send("Something went wrong. Please try after some time."); 
            }
            if (data && data.length > 0) {
                return response.status(200).send(data);
            }
            return response.status(404).send("No Items found.");
        })
    },

    itemUpdate: (request, response) => {
        let item = request.body;
        let item_id = request.params.item_id;
    
        if (!item || !item.item_name || !item.selected_item) {
            return response.status(400).send("Please specify a valid item.");
        }
        if (!item_id) {
            return response.status(400).send("Please specify a valid item id.");
        }
        
       itemService.updateItem(item, item_id, function (err, returnedItem) {
            if (err) {
               return response.status(500).send("Error while updating item."); 
            }
            if (returnedItem) {
                return response.status(200).send(returnedItem);
            }
            return response.status(404).send("No Items found.");
        }) 
    },

    itemDelete: (request, response) => {
        let item_id = request.params.item_id;
        if (!item_id) {
            return response.status(400).send("Please specify a valid id.");
        }

        itemService.deletedItem(item_id, function (err, returnedItem) {
            if (err) {
                return response.status(404).send("Error while deleting item.")
            }
            if (returnedItem) {
                return response.status(200).send(returnedItem);
            }
            return response.status(404).send("Something went wrong.. Please try after some time!!")
        })
    }
}