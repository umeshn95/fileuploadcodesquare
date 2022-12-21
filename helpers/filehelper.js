'use strict';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.originalname.includes('catalog')){
            cb(null, 'catalog');
        }
        else if(file.originalname.includes('pricebook')){
            cb(null, 'pricebook');
        }
        else if(file.originalname.includes('inventory')){
            cb(null, 'inventory');
        }
        else if(file.originalname.includes('image')){
            cb(null, 'image');
        }
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg' || file.mimetype === 'text/xml'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload}