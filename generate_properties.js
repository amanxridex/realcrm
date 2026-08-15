const fs = require('fs');

const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Anand"];
const types = ["Villa", "Apartment", "House", "Bungalow", "Penthouse", "Duplex"];
const statuses = ["Active", "Active", "Active", "Pending", "Sold"]; // More weight to Active
const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];
const agents = ["Aman Patel", "Priya Shah", "Rahul Desai", "Sneha Joshi", "Vikram Mehta"];

const properties = [];
for (let i = 1; i <= 56; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const image = images[Math.floor(Math.random() * images.length)];
  const agent = agents[Math.floor(Math.random() * agents.length)];
  
  const priceBase = Math.floor(Math.random() * 500) + 50; // 50 to 550 Lakhs
  const priceStr = priceBase > 100 ? `₹${(priceBase / 100).toFixed(2)} Cr` : `₹${priceBase} Lacs`;
  
  const beds = Math.floor(Math.random() * 4) + 2;
  const baths = Math.floor(Math.random() * 3) + 2;
  const sqft = Math.floor(Math.random() * 3000) + 1000;
  
  properties.push({
    id: i,
    title: `Premium ${type} in ${city}`,
    location: `${city}, Gujarat`,
    price: priceStr,
    beds,
    baths,
    sqft,
    type,
    status,
    description: `A beautiful ${type.toLowerCase()} located in the prime area of ${city}, Gujarat. Features modern amenities, spacious rooms, and excellent connectivity to major landmarks.`,
    image: image,
    agent: agent,
    agentPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`
  });
}

const content = `export const PROPERTIES = ${JSON.stringify(properties, null, 2)};\n`;

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/properties.ts', content);
console.log("Generated properties.ts");
