# bikeshop-cb
Node.js Example Application for Couchbase using the Ottoman ODM

##QuickStart with Couchbase Server and Docker
Here is how to get a single node Couchbase Server cluster running on Docker Compose:

**Step - 1** : Build the app with docker-compose

```console
docker-compose build
```

**Step - 2** : Run the app with docker-compose

```console
docker-compose up
```

**Step - 3** : Next, visit `http://localhost:8091` on the host machine to see the Web Console to start Couchbase Server setup.

[Web Console to start Couchbase Server setup](https://user-images.githubusercontent.com/55015479/82157927-1a08af00-984a-11ea-9971-aad85a9a64bf.png)

**Step - 4** : Create a new bucket named *bikeShop*.

[Add Bucket](https://user-images.githubusercontent.com/55015479/82157987-82f02700-984a-11ea-8151-2df64740cce0.png)

**Step - 5** : Add new user named *bikeShop* with role **Application Access**.

[Add User](https://user-images.githubusercontent.com/55015479/82158077-10cc1200-984b-11ea-8c3a-25f02f429e82.png)

**Step - 6** : Create `.env` file with password the user *bikeShop*.

```
DB_BUCKET_PASSWORD=*****
```

**Step - 7** : See the request documentation at [https://documenter.getpostman.com/view/1710498/SzmmUEKR](https://documenter.getpostman.com/view/1710498/SzmmUEKR).
