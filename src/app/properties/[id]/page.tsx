import Link from "next/link";
import styles from "./page.module.css";
import { PROPERTIES } from "@/data/properties";
export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);
  const property = PROPERTIES.find(p => p.id === propertyId);

  if (!property) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1>Property Not Found</h1>
        <Link href="/properties" className={homeStyles.searchButton} style={{ marginTop: "2rem", display: "inline-block", textDecoration: "none" }}>Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroImageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={property.image} alt={property.title} className={styles.heroImage} />
        <Link href="/properties" className={styles.backButton}>
          ← Back to Properties
        </Link>
      </div>

      <div className="container">
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <h1 className={styles.title}>{property.title}</h1>
              <div className={styles.price}>{property.price}</div>
            </div>
            
            <div className={styles.location}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {property.location}
            </div>

            <div className={styles.featuresRow}>
              <div className={styles.featureBox}>
                <span className={styles.featureValue}>{property.beds}</span>
                <span className={styles.featureLabel}>Beds</span>
              </div>
              <div className={styles.featureBox}>
                <span className={styles.featureValue}>{property.baths}</span>
                <span className={styles.featureLabel}>Baths</span>
              </div>
              <div className={styles.featureBox}>
                <span className={styles.featureValue}>{property.sqft}</span>
                <span className={styles.featureLabel}>Sq Ft</span>
              </div>
              <div className={styles.featureBox}>
                <span className={styles.featureValue}>{property.type}</span>
                <span className={styles.featureLabel}>Property Type</span>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>About this home</h2>
              <p className={styles.description}>{property.description}</p>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Interested in this property?</h3>
              <p className={styles.agentName}>Listed by <strong>{property.agent}</strong></p>
              <div className={styles.agentPhone}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                {property.agentPhone}
              </div>
              <button className={styles.contactButton}>Contact Agent</button>
              <button className={styles.tourButton}>Schedule a Tour</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
