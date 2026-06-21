# Admin T-Shirt and ID Card Dashboard Handoff

The frontend admin page now contains only two booking queues:

- T-shirt bookings
- ID-card bookings

## Dashboard response

The existing request is:

```text
GET /admin/dashboard
Authorization: Bearer <admin-token>
```

Return orders in either `recentOrders` or `orders`. Each order should include:

```json
{
  "id": 101,
  "bookingId": "ORD-2026-00101",
  "razorpayOrderId": "order_...",
  "razorpayPaymentId": "pay_...",
  "productType": "tshirt",
  "name": "Customer Name",
  "phoneNumber": "9876543210",
  "email": "customer@example.com",
  "sizeQuantities": [
    { "size": "38", "quantity": 2 },
    { "size": "40", "quantity": 1 }
  ],
  "totalQuantity": 3,
  "amount": 3,
  "status": "paid",
  "createdAt": "2026-06-21T10:30:00Z",
  "collectedAt": null
}
```

For an ID-card order use `"productType": "idcard"` and include:

```json
{
  "idCardDetails": {
    "cardholderName": "Name Printed On ID",
    "photoUrl": "/api/admin/orders/101/id-photo"
  }
}
```

The photo URL must be an authenticated admin endpoint that returns the image
stored in MySQL. It must not be a public Cloudinary URL.

## Distribution status

The checkbox calls:

```text
PUT /orders/{orderId}/collection
Authorization: Bearer <admin-token>
Content-Type: application/json

{ "collected": true }
```

Unchecking it sends:

```json
{ "collected": false }
```

When `collected` becomes `true`, store the server timestamp in `collectedAt`.
When it becomes `false`, clear `collectedAt`. Keep payment `status` separate and
unchanged so paid/failed payment reporting remains accurate.

## Security requirements

- Require a valid admin JWT for the dashboard, status update, and ID-photo route.
- Never return ID photo bytes in the order-list JSON.
- Return only the protected photo endpoint in `photoUrl`.
- Record who changed the distribution status and when.
- Prevent duplicate handover with a database transaction or optimistic locking.

Excel-compatible T-shirt and ID-card files are generated separately in the
browser from the currently loaded order records.

## How the Spring Boot backend connects to MySQL

React must never receive MySQL host, username, or password values. Only the
Spring Boot service connects to the database.

### 1. Add backend dependencies

Add these dependencies to the backend `pom.xml`:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

### 2. Configure Spring Boot using environment variables

Use this in `application.properties`:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.open-in-view=false
spring.jpa.properties.hibernate.jdbc.time_zone=UTC

app.frontend-url=${FRONTEND_URL:http://localhost:5173}
```

For local development, create backend-only environment values:

```text
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/hukmillane?useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your-local-password
FRONTEND_URL=http://localhost:5173
```

Never put these database values in React, `.env.example`, Git, or Vercel.

### 3. Railway setup

1. Add a MySQL service to the backend Railway project.
2. Open the Spring Boot service and add references to the MySQL service values.
3. Set `SPRING_DATASOURCE_URL` to a JDBC URL in this form:

```text
jdbc:mysql://MYSQL_HOST:MYSQL_PORT/MYSQL_DATABASE?useSSL=true&serverTimezone=UTC
```

4. Set `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` from the
   Railway MySQL service credentials.
5. Set `FRONTEND_URL=https://www.hukmillanecharaja.in`.
6. Keep JWT secrets and Razorpay secrets only in Railway environment variables.

### 4. Recommended order table fields

Use a migration tool such as Flyway and create fields equivalent to:

```sql
CREATE TABLE merchandise_orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id VARCHAR(50) NOT NULL UNIQUE,
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  product_type VARCHAR(20) NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(180),
  size_quantities JSON,
  total_quantity INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(30) NOT NULL,
  collected BOOLEAN NOT NULL DEFAULT FALSE,
  collected_at DATETIME(6),
  collected_by BIGINT,
  id_card_name VARCHAR(120),
  id_card_photo MEDIUMBLOB,
  id_card_photo_mime_type VARCHAR(50),
  id_card_photo_byte_size INT,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL
);

CREATE INDEX idx_orders_product_type ON merchandise_orders(product_type);
CREATE INDEX idx_orders_collected ON merchandise_orders(collected);
CREATE INDEX idx_orders_phone ON merchandise_orders(phone_number);
```

Keep payment status and collection status separate.

### 5. Implement the backend layers

The Spring Boot repository should contain:

```text
controller/AdminOrderController.java
dto/AdminOrderResponse.java
dto/CollectionUpdateRequest.java
entity/MerchandiseOrder.java
repository/MerchandiseOrderRepository.java
service/AdminOrderService.java
security/SecurityConfig.java
```

`AdminOrderService` should:

1. Read paid T-shirt and ID-card records from MySQL.
2. Map entities to response DTOs without returning photo bytes.
3. Update `collected`, `collectedAt`, and `collectedBy` in one transaction.
4. Return a protected photo endpoint for ID-card records.

### 6. Protect endpoints and configure CORS

Only authenticated admins should access:

```text
GET /admin/dashboard
PUT /orders/{id}/collection
GET /api/admin/orders/{id}/id-photo
```

Allow CORS only from:

```text
http://localhost:5173
https://www.hukmillanecharaja.in
https://hukmillanecharaja.in
```

Do not use `*` with authenticated endpoints.

## How the frontend connects to the backend

The frontend uses `src/api/adminOrders.js`. It automatically uses local demo
data when `VITE_API_BASE_URL` is empty.

For local development, create `frontend/.env.local`:

```text
VITE_API_BASE_URL=http://localhost:8080
```

For Vercel, add this environment variable in Project Settings:

```text
VITE_API_BASE_URL=https://your-spring-boot-service.up.railway.app
```

Redeploy Vercel after changing the variable. Never include `/admin/dashboard`
or a trailing slash in the base URL.

Connection flow:

```text
React /admin
  -> Spring Boot JWT login
  -> Spring Boot REST controller
  -> service + JPA repository
  -> Railway MySQL
  -> DTO response without raw photo bytes
  -> React T-shirt / ID-card dashboard
```
