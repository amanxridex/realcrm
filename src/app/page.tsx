import Image from "next/image";
import styles from "./page.module.css";

const PROPERTIES = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$5,400,000",
    beds: 5,
    baths: 6,
    sqft: 4500,
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
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Find Your Dream Home</h1>
        <p className={styles.heroSubtitle}>
          Discover the perfect property that fits your lifestyle. Browse through thousands of curated listings.
        </p>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Search by city, neighborhood, or zip code..."
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </section>

      <div className="container">
        <h2 className={styles.sectionTitle}>Featured Properties</h2>
        <div className={styles.propertiesGrid}>
          {PROPERTIES.map((property) => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyImageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={property.image} 
                  alt={property.title}
                  className={styles.propertyImage}
                />
                <div className={styles.priceTag}>{property.price}</div>
              </div>
              <div className={styles.propertyContent}>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <div className={styles.propertyLocation}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {property.location}
                </div>
                <div className={styles.propertyFeatures}>
                  <span className={styles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    {property.beds} Beds
                  </span>
                  <span className={styles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path><path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path></svg>
                    {property.baths} Baths
                  </span>
                  <span className={styles.feature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
