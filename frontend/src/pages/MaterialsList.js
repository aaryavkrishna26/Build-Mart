import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { LocationContext } from '../context/LocationContext';
import { CartContext } from '../context/CartContext';
import ItemCard from '../components/ItemCard';
import './MaterialsList.css';

const MOCK_MATERIALS = [
  // DELHI
  { _id: 'd1m1', name: 'UltraTech Cement', category: 'Cement', price: 340, originalPrice: 400, discount: 15, quantity: 500, unit: 'bag', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: '50kg OPC 53 grade cement.', rating: 4.5, reviews: 120, seller: { phone: '9811001001' } },
  { _id: 'd1m2', name: 'River Sand', category: 'Sand', price: 45, originalPrice: 60, discount: 10, quantity: 1000, unit: 'cubic ft', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: 'Clean river sand for plastering.', rating: 4.2, reviews: 80, seller: { phone: '9811001001' } },
  { _id: 'd1m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 580, originalPrice: 650, discount: 12, quantity: 200, unit: 'piece', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: 'Fe-500 grade TMT rods.', rating: 4.7, reviews: 200, seller: { phone: '9811001001' } },
  { _id: 'd1m4', name: 'Red Bricks', category: 'Bricks', price: 8, originalPrice: 10, discount: 10, quantity: 5000, unit: 'piece', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: 'Standard red clay bricks.', rating: 4.3, reviews: 150, seller: { phone: '9811001001' } },
  { _id: 'd1m5', name: '20mm Aggregates', category: 'Aggregates', price: 45, originalPrice: 60, discount: 8, quantity: 2000, unit: 'cubic ft', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: 'Crushed stone aggregates.', rating: 4.4, reviews: 90, seller: { phone: '9811001001' } },
  { _id: 'd1m6', name: 'Plaster of Paris', category: 'Materials', price: 170, originalPrice: 220, discount: 18, quantity: 300, unit: 'bag', availability: true, shopName: 'Delhi Build Store', sellerName: 'Ramesh Kumar', location: 'Delhi', city: 'Delhi', description: '25kg POP bag.', rating: 4.6, reviews: 110, seller: { phone: '9811001001' } },

  { _id: 'd2m1', name: 'UltraTech Cement', category: 'Cement', price: 325, originalPrice: 400, discount: 15, quantity: 600, unit: 'bag', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: '50kg OPC 53 grade cement.', rating: 4.3, reviews: 95, seller: { phone: '9811001002' } },
  { _id: 'd2m2', name: 'River Sand', category: 'Sand', price: 50, originalPrice: 60, discount: 10, quantity: 1200, unit: 'cubic ft', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: 'Clean river sand.', rating: 4.1, reviews: 70, seller: { phone: '9811001002' } },
  { _id: 'd2m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 560, originalPrice: 650, discount: 12, quantity: 250, unit: 'piece', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: 'Fe-500 grade TMT rods.', rating: 4.5, reviews: 180, seller: { phone: '9811001002' } },
  { _id: 'd2m4', name: 'Red Bricks', category: 'Bricks', price: 7, originalPrice: 10, discount: 10, quantity: 8000, unit: 'piece', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: 'Standard red clay bricks.', rating: 4.2, reviews: 130, seller: { phone: '9811001002' } },
  { _id: 'd2m5', name: '20mm Aggregates', category: 'Aggregates', price: 42, originalPrice: 60, discount: 8, quantity: 2500, unit: 'cubic ft', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: 'Crushed stone aggregates.', rating: 4.3, reviews: 75, seller: { phone: '9811001002' } },
  { _id: 'd2m6', name: 'Plaster of Paris', category: 'Materials', price: 160, originalPrice: 220, discount: 18, quantity: 400, unit: 'bag', availability: true, shopName: 'Capital Construction Hub', sellerName: 'Suresh Sharma', location: 'Delhi', city: 'Delhi', description: '25kg POP bag.', rating: 4.4, reviews: 95, seller: { phone: '9811001002' } },

  { _id: 'd3m1', name: 'UltraTech Cement', category: 'Cement', price: 350, originalPrice: 400, discount: 12, quantity: 400, unit: 'bag', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: '50kg OPC 53 grade cement.', rating: 4.4, reviews: 105, seller: { phone: '9811001003' } },
  { _id: 'd3m2', name: 'River Sand', category: 'Sand', price: 48, originalPrice: 60, discount: 10, quantity: 900, unit: 'cubic ft', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: 'Clean river sand.', rating: 4.3, reviews: 85, seller: { phone: '9811001003' } },
  { _id: 'd3m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 570, originalPrice: 650, discount: 12, quantity: 180, unit: 'piece', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: 'Fe-500 grade TMT rods.', rating: 4.6, reviews: 160, seller: { phone: '9811001003' } },
  { _id: 'd3m4', name: 'Red Bricks', category: 'Bricks', price: 9, originalPrice: 10, discount: 8, quantity: 6000, unit: 'piece', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: 'Standard red clay bricks.', rating: 4.1, reviews: 140, seller: { phone: '9811001003' } },
  { _id: 'd3m5', name: '20mm Aggregates', category: 'Aggregates', price: 50, originalPrice: 60, discount: 8, quantity: 1800, unit: 'cubic ft', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: 'Crushed stone aggregates.', rating: 4.2, reviews: 65, seller: { phone: '9811001003' } },
  { _id: 'd3m6', name: 'Plaster of Paris', category: 'Materials', price: 180, originalPrice: 220, discount: 15, quantity: 250, unit: 'bag', availability: true, shopName: 'Delhi Material Depot', sellerName: 'Mahesh Singh', location: 'Delhi', city: 'Delhi', description: '25kg POP bag.', rating: 4.5, reviews: 100, seller: { phone: '9811001003' } },

  // MUMBAI
  { _id: 'm1m1', name: 'UltraTech Cement', category: 'Cement', price: 360, originalPrice: 420, discount: 14, quantity: 550, unit: 'bag', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: '50kg OPC 53 grade cement.', rating: 4.5, reviews: 130, seller: { phone: '9821001001' } },
  { _id: 'm1m2', name: 'River Sand', category: 'Sand', price: 55, originalPrice: 70, discount: 10, quantity: 1100, unit: 'cubic ft', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: 'Clean river sand.', rating: 4.2, reviews: 90, seller: { phone: '9821001001' } },
  { _id: 'm1m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 600, originalPrice: 680, discount: 12, quantity: 220, unit: 'piece', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: 'Fe-500 grade TMT rods.', rating: 4.7, reviews: 210, seller: { phone: '9821001001' } },
  { _id: 'm1m4', name: 'Red Bricks', category: 'Bricks', price: 9, originalPrice: 12, discount: 10, quantity: 7000, unit: 'piece', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: 'Standard red clay bricks.', rating: 4.3, reviews: 160, seller: { phone: '9821001001' } },
  { _id: 'm1m5', name: '20mm Aggregates', category: 'Aggregates', price: 52, originalPrice: 65, discount: 8, quantity: 2200, unit: 'cubic ft', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: 'Crushed stone aggregates.', rating: 4.4, reviews: 95, seller: { phone: '9821001001' } },
  { _id: 'm1m6', name: 'Plaster of Paris', category: 'Materials', price: 190, originalPrice: 240, discount: 18, quantity: 320, unit: 'bag', availability: true, shopName: 'Mumbai Build Center', sellerName: 'Vijay Patil', location: 'Mumbai', city: 'Mumbai', description: '25kg POP bag.', rating: 4.6, reviews: 115, seller: { phone: '9821001001' } },

  { _id: 'm2m1', name: 'UltraTech Cement', category: 'Cement', price: 345, originalPrice: 420, discount: 14, quantity: 480, unit: 'bag', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: '50kg OPC 53 grade cement.', rating: 4.3, reviews: 100, seller: { phone: '9821001002' } },
  { _id: 'm2m2', name: 'River Sand', category: 'Sand', price: 58, originalPrice: 70, discount: 10, quantity: 950, unit: 'cubic ft', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: 'Clean river sand.', rating: 4.1, reviews: 75, seller: { phone: '9821001002' } },
  { _id: 'm2m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 590, originalPrice: 680, discount: 12, quantity: 190, unit: 'piece', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: 'Fe-500 grade TMT rods.', rating: 4.5, reviews: 175, seller: { phone: '9821001002' } },
  { _id: 'm2m4', name: 'Red Bricks', category: 'Bricks', price: 10, originalPrice: 12, discount: 8, quantity: 5500, unit: 'piece', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: 'Standard red clay bricks.', rating: 4.2, reviews: 140, seller: { phone: '9821001002' } },
  { _id: 'm2m5', name: '20mm Aggregates', category: 'Aggregates', price: 48, originalPrice: 65, discount: 8, quantity: 1900, unit: 'cubic ft', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: 'Crushed stone aggregates.', rating: 4.3, reviews: 80, seller: { phone: '9821001002' } },
  { _id: 'm2m6', name: 'Plaster of Paris', category: 'Materials', price: 175, originalPrice: 240, discount: 15, quantity: 280, unit: 'bag', availability: true, shopName: 'Western Construction Store', sellerName: 'Sanjay Desai', location: 'Mumbai', city: 'Mumbai', description: '25kg POP bag.', rating: 4.4, reviews: 105, seller: { phone: '9821001002' } },

  // LUCKNOW
  { _id: 'l1m1', name: 'UltraTech Cement', category: 'Cement', price: 315, originalPrice: 380, discount: 15, quantity: 520, unit: 'bag', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: '50kg OPC 53 grade cement.', rating: 4.4, reviews: 110, seller: { phone: '9831001001' } },
  { _id: 'l1m2', name: 'River Sand', category: 'Sand', price: 38, originalPrice: 50, discount: 10, quantity: 1300, unit: 'cubic ft', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: 'Clean river sand.', rating: 4.3, reviews: 88, seller: { phone: '9831001001' } },
  { _id: 'l1m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 545, originalPrice: 620, discount: 12, quantity: 230, unit: 'piece', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: 'Fe-500 grade TMT rods.', rating: 4.6, reviews: 190, seller: { phone: '9831001001' } },
  { _id: 'l1m4', name: 'Red Bricks', category: 'Bricks', price: 6, originalPrice: 9, discount: 10, quantity: 9000, unit: 'piece', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: 'Standard red clay bricks.', rating: 4.2, reviews: 155, seller: { phone: '9831001001' } },
  { _id: 'l1m5', name: '20mm Aggregates', category: 'Aggregates', price: 38, originalPrice: 55, discount: 8, quantity: 2400, unit: 'cubic ft', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: 'Crushed stone aggregates.', rating: 4.3, reviews: 70, seller: { phone: '9831001001' } },
  { _id: 'l1m6', name: 'Plaster of Paris', category: 'Materials', price: 155, originalPrice: 200, discount: 18, quantity: 350, unit: 'bag', availability: true, shopName: 'Lucknow Build Bazaar', sellerName: 'Arvind Mishra', location: 'Lucknow', city: 'Lucknow', description: '25kg POP bag.', rating: 4.5, reviews: 98, seller: { phone: '9831001001' } },

  { _id: 'l2m1', name: 'UltraTech Cement', category: 'Cement', price: 320, originalPrice: 380, discount: 15, quantity: 450, unit: 'bag', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: '50kg OPC 53 grade cement.', rating: 4.3, reviews: 92, seller: { phone: '9831001002' } },
  { _id: 'l2m2', name: 'River Sand', category: 'Sand', price: 40, originalPrice: 50, discount: 10, quantity: 1100, unit: 'cubic ft', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: 'Clean river sand.', rating: 4.1, reviews: 72, seller: { phone: '9831001002' } },
  { _id: 'l2m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 555, originalPrice: 620, discount: 12, quantity: 200, unit: 'piece', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: 'Fe-500 grade TMT rods.', rating: 4.5, reviews: 165, seller: { phone: '9831001002' } },
  { _id: 'l2m4', name: 'Red Bricks', category: 'Bricks', price: 7, originalPrice: 9, discount: 8, quantity: 7500, unit: 'piece', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: 'Standard red clay bricks.', rating: 4.2, reviews: 135, seller: { phone: '9831001002' } },
  { _id: 'l2m5', name: '20mm Aggregates', category: 'Aggregates', price: 42, originalPrice: 55, discount: 8, quantity: 2100, unit: 'cubic ft', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: 'Crushed stone aggregates.', rating: 4.2, reviews: 60, seller: { phone: '9831001002' } },
  { _id: 'l2m6', name: 'Plaster of Paris', category: 'Materials', price: 160, originalPrice: 200, discount: 15, quantity: 300, unit: 'bag', availability: true, shopName: 'Nawabi Construction Store', sellerName: 'Vivek Tiwari', location: 'Lucknow', city: 'Lucknow', description: '25kg POP bag.', rating: 4.4, reviews: 88, seller: { phone: '9831001002' } },

  // JAIPUR
  { _id: 'j1m1', name: 'UltraTech Cement', category: 'Cement', price: 330, originalPrice: 390, discount: 15, quantity: 510, unit: 'bag', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: '50kg OPC 53 grade cement.', rating: 4.4, reviews: 115, seller: { phone: '9841001001' } },
  { _id: 'j1m2', name: 'River Sand', category: 'Sand', price: 42, originalPrice: 55, discount: 10, quantity: 1150, unit: 'cubic ft', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: 'Clean river sand.', rating: 4.2, reviews: 82, seller: { phone: '9841001001' } },
  { _id: 'j1m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 560, originalPrice: 630, discount: 12, quantity: 210, unit: 'piece', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: 'Fe-500 grade TMT rods.', rating: 4.6, reviews: 185, seller: { phone: '9841001001' } },
  { _id: 'j1m4', name: 'Red Bricks', category: 'Bricks', price: 7, originalPrice: 10, discount: 10, quantity: 8500, unit: 'piece', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: 'Standard red clay bricks.', rating: 4.3, reviews: 148, seller: { phone: '9841001001' } },
  { _id: 'j1m5', name: '20mm Aggregates', category: 'Aggregates', price: 44, originalPrice: 58, discount: 8, quantity: 2300, unit: 'cubic ft', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: 'Crushed stone aggregates.', rating: 4.3, reviews: 78, seller: { phone: '9841001001' } },
  { _id: 'j1m6', name: 'Plaster of Paris', category: 'Materials', price: 165, originalPrice: 210, discount: 18, quantity: 330, unit: 'bag', availability: true, shopName: 'Jaipur Build Mart', sellerName: 'Govind Sharma', location: 'Jaipur', city: 'Jaipur', description: '25kg POP bag.', rating: 4.5, reviews: 102, seller: { phone: '9841001001' } },

  { _id: 'j2m1', name: 'UltraTech Cement', category: 'Cement', price: 320, originalPrice: 390, discount: 15, quantity: 460, unit: 'bag', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: '50kg OPC 53 grade cement.', rating: 4.2, reviews: 98, seller: { phone: '9841001002' } },
  { _id: 'j2m2', name: 'River Sand', category: 'Sand', price: 44, originalPrice: 55, discount: 10, quantity: 1000, unit: 'cubic ft', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: 'Clean river sand.', rating: 4.0, reviews: 68, seller: { phone: '9841001002' } },
  { _id: 'j2m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 550, originalPrice: 630, discount: 12, quantity: 175, unit: 'piece', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: 'Fe-500 grade TMT rods.', rating: 4.4, reviews: 158, seller: { phone: '9841001002' } },
  { _id: 'j2m4', name: 'Red Bricks', category: 'Bricks', price: 8, originalPrice: 10, discount: 8, quantity: 6500, unit: 'piece', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: 'Standard red clay bricks.', rating: 4.1, reviews: 128, seller: { phone: '9841001002' } },
  { _id: 'j2m5', name: '20mm Aggregates', category: 'Aggregates', price: 46, originalPrice: 58, discount: 8, quantity: 2000, unit: 'cubic ft', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: 'Crushed stone aggregates.', rating: 4.2, reviews: 65, seller: { phone: '9841001002' } },
  { _id: 'j2m6', name: 'Plaster of Paris', category: 'Materials', price: 158, originalPrice: 210, discount: 15, quantity: 270, unit: 'bag', availability: true, shopName: 'Pink City Construction', sellerName: 'Mohan Agarwal', location: 'Jaipur', city: 'Jaipur', description: '25kg POP bag.', rating: 4.3, reviews: 92, seller: { phone: '9841001002' } },

  // INDORE
  { _id: 'i1m1', name: 'UltraTech Cement', category: 'Cement', price: 310, originalPrice: 375, discount: 15, quantity: 530, unit: 'bag', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: '50kg OPC 53 grade cement.', rating: 4.4, reviews: 108, seller: { phone: '9851001001' } },
  { _id: 'i1m2', name: 'River Sand', category: 'Sand', price: 36, originalPrice: 48, discount: 10, quantity: 1400, unit: 'cubic ft', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: 'Clean river sand.', rating: 4.2, reviews: 78, seller: { phone: '9851001001' } },
  { _id: 'i1m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 540, originalPrice: 615, discount: 12, quantity: 240, unit: 'piece', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: 'Fe-500 grade TMT rods.', rating: 4.6, reviews: 195, seller: { phone: '9851001001' } },
  { _id: 'i1m4', name: 'Red Bricks', category: 'Bricks', price: 6, originalPrice: 9, discount: 10, quantity: 10000, unit: 'piece', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: 'Standard red clay bricks.', rating: 4.3, reviews: 162, seller: { phone: '9851001001' } },
  { _id: 'i1m5', name: '20mm Aggregates', category: 'Aggregates', price: 36, originalPrice: 52, discount: 8, quantity: 2600, unit: 'cubic ft', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: 'Crushed stone aggregates.', rating: 4.3, reviews: 72, seller: { phone: '9851001001' } },
  { _id: 'i1m6', name: 'Plaster of Paris', category: 'Materials', price: 150, originalPrice: 195, discount: 18, quantity: 360, unit: 'bag', availability: true, shopName: 'Indore Build Store', sellerName: 'Kiran Patel', location: 'Indore', city: 'Indore', description: '25kg POP bag.', rating: 4.5, reviews: 96, seller: { phone: '9851001001' } },

  { _id: 'i2m1', name: 'UltraTech Cement', category: 'Cement', price: 318, originalPrice: 375, discount: 15, quantity: 470, unit: 'bag', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: '50kg OPC 53 grade cement.', rating: 4.2, reviews: 94, seller: { phone: '9851001002' } },
  { _id: 'i2m2', name: 'River Sand', category: 'Sand', price: 38, originalPrice: 48, discount: 10, quantity: 1200, unit: 'cubic ft', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: 'Clean river sand.', rating: 4.0, reviews: 65, seller: { phone: '9851001002' } },
  { _id: 'i2m3', name: 'TMT Steel Rods 12mm', category: 'Steel', price: 548, originalPrice: 615, discount: 12, quantity: 195, unit: 'piece', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: 'Fe-500 grade TMT rods.', rating: 4.5, reviews: 170, seller: { phone: '9851001002' } },
  { _id: 'i2m4', name: 'Red Bricks', category: 'Bricks', price: 7, originalPrice: 9, discount: 8, quantity: 8000, unit: 'piece', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: 'Standard red clay bricks.', rating: 4.1, reviews: 138, seller: { phone: '9851001002' } },
  { _id: 'i2m5', name: '20mm Aggregates', category: 'Aggregates', price: 40, originalPrice: 52, discount: 8, quantity: 2200, unit: 'cubic ft', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: 'Crushed stone aggregates.', rating: 4.2, reviews: 62, seller: { phone: '9851001002' } },
  { _id: 'i2m6', name: 'Plaster of Paris', category: 'Materials', price: 155, originalPrice: 195, discount: 15, quantity: 290, unit: 'bag', availability: true, shopName: 'MP Construction Hub', sellerName: 'Girish Jain', location: 'Indore', city: 'Indore', description: '25kg POP bag.', rating: 4.3, reviews: 86, seller: { phone: '9851001002' } },
];

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState({ message: '', show: false, type: 'success' });
  const [cartItems, setCartItems] = useState({});
  const [removeConfirmId, setRemoveConfirmId] = useState(null);
  const [removingMaterial, setRemovingMaterial] = useState(null);
  const { selectedCity, selectedCategory } = useContext(LocationContext);
  const { addToCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  const city = searchParams.get('city') || selectedCity;
  const category = searchParams.get('category') || selectedCategory;

  const fetchMaterials = useCallback(async () => {
    if (!city || !category) {
      setMaterials([]);
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.get('/materials', {
        params: { city, category, sortBy }
      });
      if (response.data && response.data.length > 0) {
        setMaterials(response.data);
      } else {
        throw new Error('No data from API');
      }
    } catch (error) {
      // Use mock data as fallback
      const filtered = MOCK_MATERIALS.filter(
        m => m.city === city && m.category === category
      );
      setMaterials(filtered);
    }
    setLoading(false);
  }, [city, category, sortBy]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const toggleMaterialSelection = (materialId) => {
    setSelectedMaterials(prev => {
      if (prev.includes(materialId)) {
        return prev.filter(id => id !== materialId);
      } else if (prev.length < 3) {
        return [...prev, materialId];
      }
      return prev;
    });
  };

  const getSelectedMaterials = () => {
    return materials.filter(m => selectedMaterials.includes(m._id));
  };

  const handleCallSeller = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, show: true, type });
    setTimeout(() => setToast({ message: '', show: false, type: 'success' }), 2000);
  };

  const handleAddToCart = (material, quantity = 1) => {
    const result = addToCart(material, quantity);
    if (result.success) {
      setCartItems(prev => ({ ...prev, [material._id]: true }));
      showToast('✅ Added to cart!', 'success');
      setTimeout(() => {
        setCartItems(prev => ({ ...prev, [material._id]: false }));
      }, 2000);
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleRemoveMaterial = async (materialId) => {
    setRemovingMaterial(materialId);
    try {
      await apiClient.delete(`/materials/${materialId}`);
      setMaterials(materials.filter(m => m._id !== materialId));
      setRemoveConfirmId(null);
      showToast('✅ Material removed successfully!', 'success');
    } catch (error) {
      showToast('❌ Error removing material', 'error');
    } finally {
      setRemovingMaterial(null);
    }
  };

  const isSellerOfMaterial = (sellerId) => {
    return userRole === 'seller' && sellerId === userId;
  };

  return (
    <div className="materials-container">
      {!selectedCity && userRole === 'buyer' && (
        <div className="location-banner">
          <div className="container">
            <div className="location-banner-content">
              <span className="location-icon">📍</span>
              <div className="location-banner-text">
                <h3>Select Your Location</h3>
                <p>Choose your city to see available materials and sellers near you</p>
              </div>
              <button onClick={() => window.location.href = '/select-location'} className="btn btn-primary btn-small">
                Select Location
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>{toast.message}</div>
      )}

      {removeConfirmId && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h3>🗑️ Remove Listing?</h3>
            <p>Are you sure you want to remove this material listing?</p>
            <div className="confirm-modal-actions">
              <button className="confirm-btn-no" onClick={() => setRemoveConfirmId(null)}>Cancel</button>
              <button className="confirm-btn-yes" onClick={() => handleRemoveMaterial(removeConfirmId)} disabled={removingMaterial === removeConfirmId}>
                {removingMaterial === removeConfirmId ? '⏳ Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="materials-header">
        <h2>
          {category} Sellers in {city}
          <span className="result-count">({materials.length})</span>
        </h2>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          {selectedMaterials.length > 0 && (
            <span className="compare-badge">Comparing {selectedMaterials.length}</span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading materials...</div>
      ) : materials.length === 0 ? (
        <div className="no-results">
          <p>No sellers found for {category} in {city}</p>
          <p className="hint">Try selecting different location or category</p>
        </div>
      ) : (
        <>
          <div className="materials-grid">
            {materials.map(material => (
              <ItemCard
                key={material._id}
                item={material}
                onAddToCart={handleAddToCart}
                onCallSeller={handleCallSeller}
                onRemove={() => setRemoveConfirmId(material._id)}
                onToggleSelect={toggleMaterialSelection}
                isSelected={selectedMaterials.includes(material._id)}
                isSellerOwned={isSellerOfMaterial(material.seller?._id)}
                isInCart={cartItems[material._id]}
                userRole={userRole}
                token={token}
              />
            ))}
          </div>

          {selectedMaterials.length > 0 && (
            <div className="comparison-section">
              <h3>Comparison: {getSelectedMaterials().length} Sellers</h3>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Shop Name</th>
                      <th>Price/Unit</th>
                      <th>Min Qty</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSelectedMaterials().map(material => (
                      <tr key={material._id}>
                        <td>{material.shopName}</td>
                        <td className="price">₹{material.price}/{material.unit}</td>
                        <td>{material.quantity} {material.unit}</td>
                        <td><a href={`tel:${material.seller?.phone}`}>{material.seller?.phone}</a></td>
                        <td>
                          <span className={`status-badge ${material.availability ? 'available' : 'unavailable'}`}>
                            {material.availability ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialsList;