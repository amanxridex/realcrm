import Link from "next/link";
import styles from "./page.module.css";
import homeStyles from "../page.module.css";

const PROPERTIES = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$5,400,000",
    beds: 5,
    baths: 6,
    sqft: 4500,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "New York, NY",
    price: "$2,850,000",
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: "$850,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Beachfront Condo",
    location: "Miami, FL",
    price: "$1,200,000",
    beds: 2,
    baths: 2,
    sqft: 1500,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: "$3,100,000",
    beds: 4,
    baths: 4,
    sqft: 3500,
    type: "House",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Lakefront Cabin",
    location: "Lake Tahoe, NV",
    price: "$1,750,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Cabin",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export default function PropertiesListing() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Explore Properties</h1>
        <div className={styles.filters}>
          <select className={styles.filterSelect}>
            <option>All Types</option>
            <option>House</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select>
          <select className={styles.filterSelect}>
            <option>Any Price</option>
            <option>Under $1M</option>
            <option>$1M - $3M</option>
            <option>Over $3M</option>
          </select>
          <button className={homeStyles.searchButton}>Apply Filters</button>
        </div>
      </div>

      <div className={homeStyles.propertiesGrid}>
        {PROPERTIES.map((property) => (
          <Link href={`/properties/${property.id}`} key={property.id}>
            <div className={homeStyles.propertyCard}>
              <div className={homeStyles.propertyImageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={property.image} 
                  alt={property.title}
                  className={homeStyles.propertyImage}
                />
                <div className={homeStyles.priceTag}>{property.price}</div>
              </div>
              <div className={homeStyles.propertyContent}>
                <h3 className={homeStyles.propertyTitle}>{property.title}</h3>
                <div className={homeStyles.propertyLocation}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {property.location}
                </div>
                <div className={homeStyles.propertyFeatures}>
                  <span className={homeStyles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    {property.beds} Beds
                  </span>
                  <span className={homeStyles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path><path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path></svg>
                    {property.baths} Baths
                  </span>
                  <span className={homeStyles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
