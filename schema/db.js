// Instantiate Couchbase and Ottoman
var couchbase=require('couchbase');
var ottoman=require('ottoman');

// Build my cluster object and open a new cluster
var myCluster = new couchbase.Cluster('localhost:8091');
var myBucket = myCluster.openBucket('bikeShop');
ottoman.bucket=myBucket;

// Build my "schema" from my model files
require('./model/employee');
require('./model/customer');
require('./model/bike');

// Build the necessary indexes to function
ottoman.ensureIndices(function(){});