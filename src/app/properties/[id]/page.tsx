import Link from "next/link";
import styles from "./page.module.css";
import homeStyles from "../../page.module.css";

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
    description: "Experience unparalleled luxury in this stunning modern villa located in the heart of Beverly Hills. Featuring sweeping city views, an infinity pool, state-of-the-art chef's kitchen, and a private home theater. The master suite offers a private balcony and a spa-like en-suite bathroom.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Sarah Jenkins",
    agentPhone: "(310) 555-0198"
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
    description: "A spectacular penthouse offering panoramic views of the Manhattan skyline. This newly renovated apartment features floor-to-ceiling windows, wide-plank hardwood floors, and a massive private terrace perfect for entertaining.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Michael Chen",
    agentPhone: "(212) 555-0123"
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
    description: "Beautifully maintained family home in a highly sought-after Austin neighborhood. Enjoy an open-concept living area, a newly updated kitchen with quartz countertops, and a large fenced backyard with a covered patio.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Emily Davis",
    agentPhone: "(512) 555-0987"
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
    description: "Wake up to the sound of the ocean in this gorgeous beachfront condo. Fully furnished with coastal-chic decor, featuring a wrap-around balcony, resort-style building amenities, and direct beach access.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Carlos Rodriguez",
    agentPhone: "(305) 555-0456"
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
    description: "Your perfect winter getaway or year-round sanctuary. This stunning log and stone home offers ski-in/ski-out access, a grand fireplace, exposed timber beams, and a heated outdoor spa.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Jessica Miller",
    agentPhone: "(970) 555-0765"
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
    description: "Charming A-frame cabin perched right on the shores of Lake Tahoe. Comes with a private dock, expansive deck, and cozy interior wood finishes. Perfect for boating in the summer and skiing in the winter.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    agent: "Robert Wilson",
    agentPhone: "(775) 555-0321"
  }
];

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
