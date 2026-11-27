// src/data/eventConfig.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Central event configuration — all provisional data lives here.
// When official TCE data is confirmed, flip isOfficialDetailsConfirmed
// to true and update each // TODO: UPDATE WITH OFFICIAL TCE DATA field.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface Checkpoint {
  name: string;
  kmMarker: number;
  landmark: string;
  hasWaterStation: boolean;
  imageUrl: string;
}

export interface Route {
  id: string;
  category: "5 KM" | "15 KM" | "25 KM";
  label: string;
  distanceKm: number;
  estimatedTime: string;
  terrain: string;
  elevation: string;
  checkpoints: Checkpoint[];
}

export interface KitItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  includedInCategories: string[];
}

export interface Sponsor {
  name: string;
  logoUrl: string;
  tier: "organizing" | "title" | "partner";
}

export interface EventConfig {
  isOfficialDetailsConfirmed: boolean;
  event: {
    name: string;
    tagline: string;
    edition: string;
    sdgTarget: string;
    date: string | null;
    flagOffTime: string | null;
    registrationUrl: string;
    venue: string;
    city: string;
    state: string;
  };
  institution: {
    name: string;
    shortName: string;
    logoUrl: string;
    color: string;
  };
  routes: Route[];
  riderKit: KitItem[];
  sponsors: {
    organizingInstitution: Sponsor;
    titleSponsors: Sponsor[];
    eventPartners: Sponsor[];
  };
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export const eventConfig: EventConfig = {
  isOfficialDetailsConfirmed: false,

  event: {
    name: "TCE Cyclothon",
    tagline: "Pedal No to Drug",
    edition: "Madurai District Edition",
    sdgTarget: "UN SDG 3 · Target 3.5",
    date: null,                       // TODO: UPDATE WITH OFFICIAL TCE DATA
    flagOffTime: "06:00 AM",          // TODO: UPDATE WITH OFFICIAL TCE DATA
    registrationUrl: "#register",     // TODO: UPDATE WITH OFFICIAL TCE DATA
    venue: "Thiagarajar College of Engineering, Thiruparankundram",
    city: "Madurai",
    state: "Tamil Nadu",
  },

  institution: {
    name: "Thiagarajar College of Engineering",
    shortName: "TCE",
    logoUrl: "/images/tce-logo.png",  // TODO: UPDATE WITH OFFICIAL TCE DATA
    color: "#6E1A27",
  },

  routes: [
    {
      id: "fun-ride",
      category: "5 KM",
      label: "Fun Ride",
      distanceKm: 5,
      estimatedTime: "20–30 min",
      terrain: "Flat urban roads",
      elevation: "Minimal",
      checkpoints: [
        {
          name: "TCE Main Gate",
          kmMarker: 0,
          landmark: "Start Point",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/start.jpg", // TODO: UPDATE WITH OFFICIAL TCE DATA
        },
        {
          name: "Thiruparankundram Junction",
          kmMarker: 2.5,
          landmark: "Murugan Temple View",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/midpoint-5k.jpg",
        },
        {
          name: "TCE Main Gate",
          kmMarker: 5,
          landmark: "Finish Line",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/finish.jpg",
        },
      ],
    },
    {
      id: "challenger",
      category: "15 KM",
      label: "Challenger",
      distanceKm: 15,
      estimatedTime: "45–60 min",
      terrain: "Mixed urban & semi-rural",
      elevation: "Moderate (~50m gain)",  // TODO: UPDATE WITH OFFICIAL TCE DATA
      checkpoints: [
        {
          name: "TCE Main Gate",
          kmMarker: 0,
          landmark: "Start Point",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/start.jpg",
        },
        {
          name: "Pasumalai Hills View",
          kmMarker: 5,
          landmark: "Scenic overlook",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/pasumalai.jpg",
        },
        {
          name: "Vandiyur Mariamman Teppakulam",
          kmMarker: 10,
          landmark: "Historic tank",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/vandiyur.jpg",
        },
        {
          name: "TCE Main Gate",
          kmMarker: 15,
          landmark: "Finish Line",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/finish.jpg",
        },
      ],
    },
    {
      id: "champion",
      category: "25 KM",
      label: "Champion",
      distanceKm: 25,
      estimatedTime: "1 hr 15 min to 1 hr 45 min",
      terrain: "Urban and rural roads, mild climbs",
      elevation: "Moderate, about 80 m gain",  // TODO: UPDATE WITH OFFICIAL TCE DATA
      checkpoints: [
        {
          name: "TCE Main Gate",
          kmMarker: 0,
          landmark: "Start Point",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/start.jpg",
        },
        {
          name: "Thiruparankundram Hill Road",
          kmMarker: 5,
          landmark: "Temple approach",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/thiruparankundram.jpg",
        },
        {
          name: "Alagar Kovil Road Junction",
          kmMarker: 12,
          landmark: "Highway intersection",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/alagar.jpg",
        },
        {
          name: "Vaigai River Bridge",
          kmMarker: 18,
          landmark: "River crossing",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/vaigai.jpg",
        },
        {
          name: "TCE Main Gate",
          kmMarker: 25,
          landmark: "Finish Line",
          hasWaterStation: true,
          imageUrl: "/images/checkpoints/finish.jpg",
        },
      ],
    },
  ],

  riderKit: [
    {
      id: "jersey",
      name: "SDG 3 Green Jersey",
      description:
        "Kelly Green cycling jersey with UN SDG 3 branding and the Pedal No to Drug message.",
      imageUrl: "/images/kit/jersey.png",   // TODO: UPDATE WITH OFFICIAL TCE DATA
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "bib",
      name: "Race Bib Number",
      description:
        "Personalized with your rider number, name, and blood group. Scan the QR code for live tracking.",
      imageUrl: "/images/kit/bib.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "medal",
      name: "Finisher Medal",
      description:
        "Custom die-cast medal with an anti-drug emblem and a category-color ribbon.",
      imageUrl: "/images/kit/medal.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "hydration",
      name: "Hydration Pack",
      description:
        "Water bottle and energy bar for the 15 KM and 25 KM rides.",
      imageUrl: "/images/kit/hydration.png",
      includedInCategories: ["15 KM", "25 KM"],
    },
    {
      id: "ecert",
      name: "E-Certificate",
      description:
        "Digital participation or completion certificate with QR verification, ready to share.",
      imageUrl: "/images/kit/ecert.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
  ],

  sponsors: {
    organizingInstitution: {
      name: "Thiagarajar College of Engineering",
      logoUrl: "/images/sponsors/tce-logo.png",  // TODO: UPDATE WITH OFFICIAL TCE DATA
      tier: "organizing",
    },
    titleSponsors: [
      // TODO: UPDATE WITH OFFICIAL TCE DATA
      { name: "Title sponsor", logoUrl: "/images/sponsors/placeholder-title-1.png", tier: "title" },
      { name: "Title sponsor", logoUrl: "/images/sponsors/placeholder-title-2.png", tier: "title" },
    ],
    eventPartners: [
      // TODO: UPDATE WITH OFFICIAL TCE DATA
      { name: "Event partner", logoUrl: "/images/sponsors/placeholder-partner-1.png", tier: "partner" },
      { name: "Event partner", logoUrl: "/images/sponsors/placeholder-partner-2.png", tier: "partner" },
      { name: "Event partner", logoUrl: "/images/sponsors/placeholder-partner-3.png", tier: "partner" },
      { name: "Event partner", logoUrl: "/images/sponsors/placeholder-partner-4.png", tier: "partner" },
    ],
  },

  socialLinks: {
    instagram: "#",   // TODO: UPDATE WITH OFFICIAL TCE DATA
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
};
