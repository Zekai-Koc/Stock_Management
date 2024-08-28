// src/data/states.js

export const statusOptions = [
   { id: 1, name: "In Stock" },
   { id: 2, name: "Sold" },
   { id: 3, name: "Shipped" },
   { id: 4, name: "In Transit" },
   { id: 5, name: "Returned" },
   { id: 6, name: "Refunded" },
   { id: 7, name: "Repaired" },
   { id: 8, name: "Warranty" },
   { id: 9, name: "Defective" },
   { id: 10, name: "Damaged" },
   { id: 11, name: "Recycled" },
   { id: 12, name: "Lost" },
   { id: 13, name: "Stolen" },
   { id: 14, name: "Other" },
   { id: 15, name: "Re-Shipped" },
];

export const defaultState = {
   imei: "",
   status: "",
   cost: "",
   devices: [],
};
