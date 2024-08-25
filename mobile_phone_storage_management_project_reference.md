# Mobile Phone Storage Management App - Project Overview

## Project Architecture

**Backend**: Node.js, Express, PostgreSQL, Sequelize  
**Frontend**: React  
**Purpose**: Manage mobile phone storage (device inventory)

---

## 1. Database Models (Sequelize Models)

### 1.1 Device (Main Model)

-  **Attributes**:
   -  imei (Primary Key)
   -  brandId (Foreign Key: Brands)
   -  modelId (Foreign Key: Models)
   -  ramId (Foreign Key: RAM)
   -  storageId (Foreign Key: Storage)
   -  colorId (Foreign Key: Colors)
   -  gradeId (Foreign Key: Grades)
   -  melding (Boolean)
   -  statusId (Foreign Key: Statuses)
   -  catalogId (Foreign Key: Catalogs)
   -  purchaseDate (Date)
   -  cost (Decimal)
   -  notes (Text)
   -  active (Boolean, Default: true)

### 1.2 Related Models

-  **Brand**
   -  id, name
   -  Relationship: `Brand.hasMany(Device)`
-  **Model**
   -  id, name, brandId
   -  Relationship: `Model.hasMany(Device)`
-  **Status**
   -  id, name
   -  Relationship: `Status.hasMany(Device)`
-  **RAM**
   -  id, name (Integer)
   -  Relationship: `RAM.hasMany(Device)`
-  **Storage**
   -  id, name (Integer)
   -  Relationship: `Storage.hasMany(Device)`
-  **Color**
   -  id, name
   -  Relationship: `Color.hasMany(Device)`
-  **Grade**
   -  id, name
   -  Relationship: `Grade.hasMany(Device)`
-  **Catalog**

   -  id, name
   -  Relationship: `Catalog.hasMany(Device)`

-  **DeviceStatusHistory**
   -  id
   -  deviceId (Foreign Key: Device)
   -  statusId (Foreign Key: Status)
   -  changeDate, cost

---

## 2. Database Connection

-  **File**: `./database/database.js`
-  **Database**: PostgreSQL
   -  Host: `localhost`
   -  Port: `5433`
   -  Username: `postgres`
   -  Password: `3570`
   -  Database: `postgres`
-  **Connection Configuration**:
   -  Sequelize instance is configured without logging.
   -  Connection is tested with an `async` function that logs the connection status.

---

## 3. Express Routes and Controllers

-  **API Endpoints**

   -  `GET/POST /api/v1/devices` - Manages devices
   -  `GET/POST /api/v1/brands` - Manages brands
   -  `GET/POST /api/v1/catalogs` - Manages catalogs
   -  `GET/POST /api/v1/colors` - Manages colors
   -  `GET/POST /api/v1/selectoptions` - Fetches options for select fields
   -  `GET /api/v1/statusstats` - Retrieves status statistics
   -  `GET /api/v1/getModelsByBrand` - Fetches models by brand
   -  `GET /api/v1/stats` - Retrieves general statistics

-  **Middleware**
   -  `cors()`, `morgan()`, `express.json()` are used to handle requests, logging, and JSON parsing.

---

## 4. Server Configuration

-  **Server Port**:
   -  Default: `7000`
   -  Host: `0.0.0.0`
-  **Server Start Code**:
   -  File: `./server.js`
   -  Starts the app with `app.listen(PORT, HOST, callback)`.

---

## 5. Notes

-  **Associations**: All necessary Sequelize associations between models have been defined in `./models/index.js`.
-  **IMEI Validation**: Custom IMEI validation is included but currently commented out.
-  **No Timestamps**: Automatic Sequelize timestamps have been disabled across all models.

---

### Usage

This file serves as a reference for the project structure, backend configuration, and key routes and models. Use this file when discussing or modifying the project without needing to restate all the details.
