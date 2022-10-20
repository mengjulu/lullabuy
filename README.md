# LULLABUY
An online shop build with node.js, ejs, redis, mysql, etc., and deploys on AWS with docker.

# Table of Contents
- [Live Demo](#live-demo)
- [Build With](#build-with)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)
- [ER diagram](#er-diagram)
- [Screeshot](#screeshot)

# Live Demo

:round_pushpin:
 https://lullabuy.store/ 

###  Test info
**:bust_in_silhouette: User**
> Account ：test@test.com \
> Password：test1234

**:bust_in_silhouette: Admin user**
> Account ：admin@test.com \
> Password：test1234 

**:credit_card: Credit card format**
> Credit Card Number : xxxx-xxxx-xxxx-xxxx \
> Card Security Code : xxx \
> Date： month/ year (>today)


# Build With

- Node.js (Express): Backend
- EJS: Frontend
- Redis: Cart cache
- MySQL (Sequelize): Database
- JWT & bcrypt: Authentication
- Nodemailer: mail sender
- Mocha & Chai & Supertest: Testing
- etc.

# Getting Started

**Clone**

    git clone https://github.com/mengjulu/lullabuy.git
    cd lullabuy

**Install**

    npm install 

**Add a .env file**
    

| EV                    | Description (`default`)                |
|-----------------------|----------------------------------------|
| JWTSECRET             | JWT secret                             |
| MYSQL_USER            | Mysql username                         |
| MYSQL_PASSWORD        | Mysql password                         |
| MYSQL_DEV_NAME        | Database name in development mode      |
| MYSQL_TEST_NAME       | Database name in test mode             |
| MYSQL_PRODUCTION_NAME | Database name in production mode       |
| MAIN_URL           | Main url (`http://localhost:3000/`) |
| HOTMAIL_ACCOUNT       | Hotmail account                        |
| HOTMAIL_PASSWORD      | Hotmail password                       |
| ECPAY_MERCHANTID      | ECpay merchantID (`3002607`)           |
| ECPAY_HASHKEY         | ECpay hashkey (`pwFHCqoQZGmho4w6`)     |
| ECPAY_HASHIV          | ECpay hashIV (`EkRm7iFT261dpevs`)      |
| REDIS_HOST             | Redis host                            |
| REDIS_PORT             | Redis port                            |
| REDIS_URL           | Redis url                               |

<sub>NOTE</sub>

<sub>1. If you want to test ECpay payment locally, please install ngrok and run `ngrok http 3000`, then replace `MAIN_URL` with the url it provides.\
2. REDIS_HOST, REDIS_PORT or REDIS_URL is needed only when you want to connect to different host, port, or url for other configuration.</sub>


**Establish database and create data**
- Default mode: Development

      npm run establish

- Other mode (test/ production)

      npx sequelize-cli db:create env=<mode>
      npx sequelize-cli db:migrate env=<mode>
      npx sequelize-cli db:seed:all env=<mode>


**Start (Port: 3000)**

    npm start
<sub>Note: Default mode is development, if you want to use other mode, please add `NODE_ENV=<mode>` to the beginning.</sub>

**Test**

    npm test

**Run with Docker**

    docker compose up
    docker compose exec lullabuy npm run establish

<sub> Note: You will pull latest lullabuy image from dockerhub, so if you want to build image from local code, please make sure you have redis.conf file for Dockerfile to copy with and modify your docker compose file properly.</sub>

# API Usage

| Method    | Route                                              | Description                                                 |
|-----------|----------------------------------------------------|-------------------------------------------------------------|
| `SHOP`    |                                                    |                                                             |
| GET       | /                                                  | Get index page                                              |
| GET       | /:productCategory                                  | Return products by category                                 |
| GET       | /:productCategory/:productSubCategory              | Return products by subcategory                              |
| GET       | /:productCategory/:productSubCategory/:productName | Return product details by product name                      |
| GET       | /search                                            | Get search result page                                      |
| POST      | /search                                            | Redirect to search result                                   |
| GET       | /cart                                              | Get cart page                                               |
| POST      | /cart                                              | Add product to cart                                         |
| PUT       | /cart                                              | Update the amount of product in cart                        |
| DELETE    | /cart                                              | Delete the product in cart                                  |
| `ORDER`   |                                                    |                                                             |
| POST      | /checkout                                          | create a new order and redirect to third-party payment page |
| POST      | /payment/callback                                  | retrieve and check result from ECpay                        |
| GET       | /payment/:orderNumber                              | Redirect to ECpay payment                                   |
| POST      | /payment/:orderNumber                              | retrieve result from ECpay and render to payment page       |
| GET       | /order/:token                                      | Return order details (for order confirmation letter)        |
| `AUTH`    |                                                    |                                                             |
| GET       | /signup                                            | Get sign up page                                            |
| POST      | /signup                                            | Create a new user                                           |
| GET       | /signin                                            | Get sign in page                                            |
| POST      | /signin                                            | User sign in                                                |
| GET       | /signout                                           | User sign out                                               |
| `ACCOUNT` |                                                    |                                                             |
| GET       | /account/order                                     | Return user's orders                                        |
| GET       | /account/order/:orderNumber                        | Return user's order details                                 |
| PATCH     | /account/order/:orderNumber                        | Cancel user's order                                         |
| GET       | /account/wishlist                                  | Return user's wishlists                                     |
| PUT       | /account/wishlist                                  | Add/Remove product to/from wishlist                         |
| GET       | /account/settings                                  | Get user's settings page                                    |
| PUT       | /account/settings                                  | Edit user's settings                                        |
| GET       | /account/settings/password                         | Get edit password page                                      |
| PATCH     | /account/settings/password                         | Update user's password                                      |
| `ADMIN`   |                                                    |                                                             |
| GET       | /admin                                             | Get admin index page                                        |
| GET       | /admin/order                                       | Return all orders                                           |
| GET       | /admin/order/:orderNumber                          | Return the order details                                    |
| POST      | /admin/order/:orderNumber                          | Resend an order confirmation letter                         |
| PATCH     | /admin/order/:orderNumber                          | Cancel the order                                            |
| DELETE    | /admin/order/:orderNumber                          | Delete the order                                            |
| GET       | /admin/:productCategory                            | Return manage product by category                           |
| GET       | /admin/:productCategory/:productSubCategory        | Return manage product by subcategory                        |
| GET       | /admin/product                                     | Get create product page                                     |
| POST      | /admin/product                                     | Create a new product                                        |
| GET       | /admin/product/:productID                          | Get edit product page                                       |
| PUT       | /admin/product/:productID                          | Update the product                                          |
| DELETE    | /admin/product/:productID                          | Delete the product                                          |
| GET       | /admin/user                                        | Return all users                                            |
| PATCH     | /admin/user                                        | Update user's authority                                     |
| `ERROR`   |                                                    |                                                             |
| GET       | /error                                             | Get error page                                              |


# ER diagram
<img width="10000" src="https://user-images.githubusercontent.com/52753746/195066652-0910cbf2-e354-45c6-8199-142e7723d9a4.png">


# Screenshot
- Cover page
<img width="1141" alt="Cover page" src="https://user-images.githubusercontent.com/52753746/195378393-0ae85380-6cd4-41bf-bd91-2e7ee35e83de.png">

- Index
<img width="1141" alt="Index" src="https://user-images.githubusercontent.com/52753746/194978096-87b4239c-a410-4d24-807d-143f4dc1738d.png">

- Product description
<img width="1141" alt="Product description" src="https://user-images.githubusercontent.com/52753746/195378616-a9fd9512-6287-49b5-9e3f-7c7a184ef3b6.png">

- Cart
<img width="1141" alt="Cart" src="https://user-images.githubusercontent.com/52753746/195378831-72ee012f-f6f1-4ddc-bd8c-831396a7b296.png">
<img width="1141" alt="Screen Shot 2022-10-12 at 11 20 39 PM" src="https://user-images.githubusercontent.com/52753746/195384422-86978aeb-9442-4b7f-bbbb-dc33904699c3.png">

- Sign up
<img width="1141" alt="Sign up" src="https://user-images.githubusercontent.com/52753746/195378966-b1273d4a-2d9d-429f-9eca-2356189e6294.png">

- Sign in
<img width="1141" alt="Sign in" src="https://user-images.githubusercontent.com/52753746/195378148-e62e9d3d-b97d-4507-a051-d503e340486e.png">

- Wishlist
<img width="1141" alt="Wishlist" src="https://user-images.githubusercontent.com/52753746/194978229-ccb04f6d-b607-4a98-91d3-1f421b50db68.png">

- Order list
<img width="1141" alt="Order list" src="https://user-images.githubusercontent.com/52753746/195379144-3adce0f4-2ca0-47e8-8b6a-6394e84f0452.png">

- Personal info
<img width="1141" alt="Personal info" src="https://user-images.githubusercontent.com/52753746/195379357-3ee6cd0f-3504-461c-b901-436746ccd1ee.png">

- Admin: index
<img width="1141" alt="Admin index" src="https://user-images.githubusercontent.com/52753746/195379607-1d4b402d-a49f-44fc-bb8f-b5bd00bd9b53.png">

- Admin: manage products
<img width="1141" alt="Manage products" src="https://user-images.githubusercontent.com/52753746/195379725-17ba6665-f93f-4f38-b5cf-6f1a1c6ec595.png">

- Admin: manage orders
<img width="1141" alt="Manage orders" src="https://user-images.githubusercontent.com/52753746/195380532-e059a80e-736b-40f0-8008-7faa9c541601.png">

- Admin: manage users
<img width="1141" alt="Manage users" src="https://user-images.githubusercontent.com/52753746/195380628-29ecc12a-e219-455b-9708-f848da15c69c.png">
