Suggested Tables and Relationships:
Table: brands
id (Primary Key)
name (e.g., Apple, Samsung)

Table: models
id (Primary Key)
brand_id (Foreign Key to brands.id)
name (e.g., iPhone 12, Galaxy S21)

Table: colors
id (Primary Key)
name (e.g., Black, Silver)

Table: grades
id (Primary Key)
name (e.g., New, Used, Refurbished, A, B, C)

Table: devices
id (Primary Key)
model_id (Foreign Key to models.id)
ram (e.g., 4GB, 8GB)
storage_capacity (e.g., 64GB, 128GB)
color_id (Foreign Key to colors.id)
grade_id (Foreign Key to grades.id)
imei (Unique Identifier)
serial_number (Unique Identifier)
purchase_date (Date of Purchase)
status (e.g., In Stock, Sold, Reserved, Repair)
notes (Text for additional information)

123456789012345, Apple, iPhone 12 Pro, 6GB, 256GB, Black, B, In Stock, No, s242, 2020-9-14

IMEI, Brand, Model, RAM, Storage, Color, Grade, Status, Melding, Catalog, Purchase Date

IMEI: 15 character unique universal imei number.
Brand: Apple, Samsung, Google, OnePlus, Sony ...
Model: iPhone 13, Galaxy 21, Pixel 6, OnePlus 9 ...
RAM: 4, 6, 8, 10, 12, 14 ...
Storage: 32, 64, 128, 256, 512, 1024
Color: Black, White, Blue, Red ...
Grade: A, B, C, D, Like New, Excellent
Status: In Stock, Sold, Pending
Melding: Yes, No
Catalog: s242, dc246, ds250, dl212
Purchase Date: Date
