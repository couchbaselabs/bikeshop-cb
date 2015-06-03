var db = require('./../db.js');
var ottoman = require('ottoman');

function PhoneValidator(val) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val && !val.match(phoneno)) {
        throw new Error('Phone number is invalid.');
    }
}

var EmployeeMdl = ottoman.model('Employee', {
    employeeID: {type:'string', auto:'uuid', readonly:true},
    hiredON: {type: 'Date', default:function(){return new Date()}},
    leftON:'Date',
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
    soc:'string',
    email:'string',
    password:'string',
    active:{type:'boolean',default:true}
    },{
    index: {
        findByEmployeeID:{
            by:'employeeID',
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

EmployeeMdl.createAndSave = function (firstname, lastname, addrStreet, addrCity, addrState, addrZip, soc, email, done) {
    this.create({
                    name: {first: firstname, last: lastname},
                    address: {street: addrStreet, city: addrCity, state: addrState, zip: addrZip},
                    soc:soc, email: email
                }, done);
}

module.exports=EmployeeMdl;