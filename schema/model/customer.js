var db = require('./../db.js');
var ottoman = require('ottoman');

function PhoneValidator(val) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val && !val.match(phoneno)) {
        throw new Error('Phone number is invalid.');
    }
}

var CustomerMdl = ottoman.model('Customer', {
    customerID: {type:'string', auto:'uuid', readonly:true},
    createdON: {type: 'Date', default:new Date()},
    name:{
        first:'string',
        last:'string'},
    address:{
        street:'string',
        city:'string',
        state:'string',
        zip:'integer',
        country:{type:'string',default:'USA'}},
    phone:{type:'string',validator: PhoneValidator},
    email:'string',
    history:[{
        date:{type: 'Date', default:new Date()},
        employee:'Employee',
        interaction:'string',
        notes:'string'
    }],
    active:{type:'boolean',default:true}
    },{
    index: {
        findByCustomerID:{
            by:'customerID',
            type:'refdoc'
        },
        findByEmail: {
            by: 'email',
            type: 'refdoc'
        },
        findByFirstName: {
            by: 'name.first'
        },
        findByLastName: {
            by: 'name.last'
        }
    }
});

CustomerMdl.createAndSave = function (firstname, lastname, addrStreet, addrCity, addrState, addrZip, email, done) {
    this.create({
                    name: {first: firstname, last: lastname},
                    address: {street: addrStreet, city: addrCity, state: addrState, zip: addrZip},
                    email: email
                }, done);
}

module.exports = CustomerMdl;