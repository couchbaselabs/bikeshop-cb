//// ▶▶ require objects ◀◀ ////
var bodyParser = require('body-parser');
var db = require('../schema/db');
var bike=require('../schema/model/bike');
var customer=require('../schema/model/customer');
var employee=require('../schema/model/employee');

//// ▶▶ application/json parser ◀◀ ////
var jsonParser = bodyParser.json();

//// ▶▶ application/x-www-form-urlencoded parser ◀◀ ////
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    //// ▶▶ enable cors ◀◀ ////
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //// ▶▶ BIKE add new bike ◀◀ ////
    app.post('/api/bike/create',jsonParser, function(req,res){
        bike.createAndSave(req.body.vin,req.body.year,req.body.make,req.body.model,req.body.description,
                           req.body.condition, req.body.mileage,req.body.price,function(err,done){
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }
                res.status=201;
                res.send(done);
                return;
            });
    });

    //// ▶▶ BIKE find one◀◀ ////
    app.get('/api/bike/findOne/:id',function(req,res) {
        bike.findByStockID(req.params.id,function(err,stock){
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            if(stock && stock.length>0){
                res.status = 202;
                res.send(stock);
                return;
            }else{
                bike.findByVin(req.params.id,function(err,vin){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(vin && vin.length>0){
                        res.status = 202;
                        res.send(vin);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });

    //// ▶▶ BIKE generic find ◀◀ ////
    app.get('/api/bike/find',function(req,res) {
            bike.find(req.query, function (err, done) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(done);
            });
    });

    //// ▶▶ BIKE find using specific parameter ◀◀ ////
    app.get('/api/bike/findLongform', function (req, res) {

        if (req.query.id) {
            bike.findByStockID(req.query.id, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }

        if (req.query.vin) {
            bike.findByVin(req.query.vin, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }

        if (req.query.make) {
            bike.findByMake(req.query.make, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }

        if (req.query.year) {
            bike.findByYear(req.query.year, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }

        if (req.query.condition) {
            bike.findByCondition(req.query.condition, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }

        if (req.query.status) {
            bike.findByStatus(req.query.status, function (err, bikes) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(bikes);
            });
        }
    });

    //// ▶▶ CUSTOMER add new customer ◀◀ ////
    app.post('/api/customer/create',jsonParser, function(req,res){
        customer.createAndSave(req.body.firstName,req.body.lastName,req.body.addrStreet,
                               req.body.addrCity,req.body.addrState,req.body.addrZip,req.body.email,function(err,done){
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }

                res.status=201;
                res.send(done);
                return;
            });
    });

    //// ▶▶ CUSTOMER find one◀◀ ////
    app.get('/api/customer/findOne/:id',function(req,res) {
        customer.findByCustomerID(req.params.id,function(err,cID){
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            if(cID && cID.length>0){
                res.status = 202;
                res.send(cID);
                return;
            }else{
                customer.findByEmail(req.params.id,function(err,email){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(email && email.length>0){
                        res.status = 202;
                        res.send(email);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });

    //// ▶▶ CUSTOMER generic find ◀◀ ////
    app.get('/api/customer/find',function(req,res) {
        customer.find(req.query, function (err, done) {
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            res.status = 202;
            res.send(done);
        });
    });

    //// ▶▶ CUSTOMER find using specific parameter ◀◀ ////
    app.get('/api/customer/findLongform', function (req, res) {

        if (req.query.id) {
            customer.findCustomerID(req.query.id, function (err, customers) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(customers);
            });
        }

        if (req.query.email) {
            customer.findByEmail(req.query.email, function (err, customers) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(customers);
            });
        }

        if (req.query.firstName) {
            customer.findByFirstName(req.query.firstName, function (err, customers) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(customers);
            });
        }

        if (req.query.lastName) {
            customer.findByLastName(req.query.lastName, function (err, customers) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(customers);
            });
        }
    });

    //// ▶▶ Employee add new employee ◀◀ ////
    app.post('/api/employee/create',jsonParser, function(req,res){
        employee.createAndSave(req.body.firstName,req.body.lastName,req.body.addrStreet,
                               req.body.addrCity,req.body.addrState,req.body.addrZip,req.body.soc,req.body.email,function(err,done){
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }

                res.status=201;
                res.send(done);employee
                return;
            });
    });

    //// ▶▶ EMPLOYEE find one◀◀ ////
    app.get('/api/employee/findOne/:id',function(req,res) {
        employee.findByEmployeeID(req.params.id,function(err,cID){
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            if(cID && cID.length>0){
                res.status = 202;
                res.send(cID);
                return;
            }else{
                employee.findByEmail(req.params.id,function(err,email){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(email && email.length>0){
                        res.status = 202;
                        res.send(email);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });

    //// ▶▶ EMPLOYEE generic find ◀◀ ////
    app.get('/api/employee/find',function(req,res) {
        employee.find(req.query, function (err, done) {
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            res.status = 202;
            res.send(done);
        });
    });

    //// ▶▶ EMPLOYEE find using specific parameter ◀◀ ////
    app.get('/api/employee/findLongform', function (req, res) {

        if (req.query.id) {
            employee.findemployeeID(req.query.id, function (err, employees) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(employees);
            });
        }

        if (req.query.email) {
            employee.findByEmail(req.query.email, function (err, employees) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(employees);
            });
        }

        if (req.query.firstName) {
            employee.findByFirstName(req.query.firstName, function (err, employees) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(employees);
            });
        }

        if (req.query.lastName) {
            employee.findByLastName(req.query.lastName, function (err, employees) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(employees);
            });
        }

    });

    //// ▶▶ BIKE create ride ◀◀ ////
    app.post('/api/bike/ride/create',jsonParser, function(req,res){
        bike.findByVin(req.body.vin,function(err,curBikes){
            if(err){
                res.status = 400;
                res.send(err);
                return;
            }
            if(curBikes){
                customer.findByEmail(req.body.custEmail,function(err,curCustomers){
                    if(err){
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(curCustomers){
                        employee.findByEmail(req.body.emplEmail,function(err,curEmployees){
                            if(err){
                                res.status = 400;
                                res.send(err);
                                return;
                            }
                            if(curEmployees){
                                curBikes[0].addRide(curCustomers[0],curEmployees[0],req.body.miles,new Date(),function(err){
                                    if(err){
                                        res.status = 400;
                                        res.send(err);
                                        return;
                                    }
                                        res.status=201;
                                        res.send(curBikes[0]);
                                        return;
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    //// ▶▶ BIKE find test rides ◀◀ ////
    app.get('/api/bike/ride/get/:id', function (req, res) {
        var rideList = {};
        rideList.rides = [];

        bike.findByVin(req.params.id, function (err, curBikes) {
            if (err) {

            }
            if (curBikes) {

                var rides = curBikes[0].rides;
                var curCount = rides.length;

                for (var j = 0; j < rides.length; j++) {
                    (function (i) {

                        var curCustomer = rides[i].customer;
                        var curEmployee = rides[i].employee;

                        curCustomer.load(function (err) {
                            if (err) {

                            }
                            curEmployee.load(function (err) {
                                if (err) {

                                }

                                curCount--;
                                rideList.bike = curBikes[0].vin;
                                rideList.rides.push({
                                                        "ride": i,
                                                        "date": rides[i].date,
                                                        "rider": curCustomer.name.first + " " +
                                                        curCustomer.name.last,
                                                        mileage: rides[i].miles
                                                    });

                                if (curCount === 0) {
                                    res.status = 202;
                                    res.send(rideList);
                                    return;
                                }
                            });
                        });
                    })(j);
                }
            }
        });
    });

}

