module.exports = (app) => {
    const itemC = require('../../controllers/item.controller');
    const constants = require('../../config/constants.config');

    app.post(constants.api_path + '/items', itemC.createItem);

    app.get(constants.api_path + '/getItems', itemC.getItem);

    app.get(constants.api_path + '/getIdItems/:item_id', itemC.getItembyId);

    app.put(constants.api_path + '/updateItem/:item_id', itemC.itemUpdate);

    app.delete(constants.api_path + '/deleteItem/:item_id', itemC.itemDelete);
    
}