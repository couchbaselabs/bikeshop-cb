var db = require('./../db.js');
var ottoman = require('ottoman');

var BikeMdl = ottoman.model('Bike', {
    stockID: {type:'string', auto:'uuid', readonly:true},
    acquiredON: {type: 'Date', default:function(){return new Date()}},
    vin:'string',
    make: 'string',
    model: 'string',
    year: 'integer',
    description: 'string',
    condition: 'string',
    price: 'number',
    status: 'string',
    mileage: 'integer',
    photos:[{type:'string'}],
    rides: [{
        customer:{ref:'Customer'},
        employee:{ref:'Employee'},
        date:'Date',
        miles:'number'}],
    sale:{
        customer:{ref:'Customer'},
        employee:{ref:'Employee'},
        amount:'number',
        warranty:'number',
        date:{type: 'Date', default:function(){return new Date()}}}
    }, {
    index: {
        findByStockID: {
            type: 'refdoc',
            by: 'stockID'
        },
        findByMake:{
            by: 'make'
        },
        findByYear:{
            by:'year'
        },
        findByCondition:{
            by:'condition'
        },
        findByStatus:{
            by:'status'
        },
        findByVin:{
            type:'refdoc',
            by:'vin'
        }
    }
});

BikeMdl.createAndSave = function (vin, year, make, model, description, condition, mileage, price, done) {
    this.create({
                    vin: vin, year: year, make: make, model: model, description: description,
                    condition: condition, mileage: mileage, price: price
                }, done);
}

BikeMdl.prototype.addRide = function (customer, employee, miles, date, done) {
    if (!this.rides) {
        this.rides = [];
    }
    this.rides.push({
                        customer: customer,
                        employee: employee,
                        miles: miles,
                        date:date
                    });
    this.save(done);
}

BikeMdl.createAndSaveLongform = function(vin,year,make,model,description,condition,mileage,price,done){

    var bike=new BikeMdl();

    bike.vin=vin;
    bike.year=year;
    bike.make=make;
    bike.model=model
    bike.description=description;
    bike.condition=condition;
    bike.mileage=mileage;
    bike.price=price;

    bike.save(function(err){
        if(err){
            done(err,null);
            return;
        }
        done(null,bike)
    });
}

BikeMdl.prototype.update = function(){};

BikeMdl.prototype.archive = function(){};

module.exports=BikeMdl;

