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

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  category: string;
  quote: string;
}

export interface Sponsor {
  name: string;
  logoUrl: string;
  tier: "organizing" | "title" | "partner";
}

export interface FaqItem {
  question: string;
  answer: string;
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
  testimonials: Testimonial[];
  sponsors: {
    organizingInstitution: Sponsor;
    titleSponsors: Sponsor[];
    eventPartners: Sponsor[];
  };
  faqs: FaqItem[];
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
    tagline: "Pedal to No Drug",
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
      estimatedTime: "1h 15min – 1h 45min",
      terrain: "Urban + rural + mild elevation",
      elevation: "Moderate (~80m gain)",  // TODO: UPDATE WITH OFFICIAL TCE DATA
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
        "Official anti-drug awareness cycling jersey in Kelly Green, featuring UN SDG 3 branding and 'Pedal to No Drug' messaging.",
      imageUrl: "/images/kit/jersey.png",   // TODO: UPDATE WITH OFFICIAL TCE DATA
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "bib",
      name: "Race Bib Number",
      description:
        "Personalized bib with rider number, name, and blood group. Scan QR for real-time tracking.",
      imageUrl: "/images/kit/bib.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "medal",
      name: "Finisher Medal",
      description:
        "Custom die-cast medal with anti-drug emblem. Category-specific ribbon colors.",
      imageUrl: "/images/kit/medal.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
    {
      id: "hydration",
      name: "Hydration Pack",
      description:
        "Water bottle + energy bar to keep you fuelled through the route.",
      imageUrl: "/images/kit/hydration.png",
      includedInCategories: ["15 KM", "25 KM"],
    },
    {
      id: "ecert",
      name: "E-Certificate",
      description:
        "Digital participation/completion certificate with QR verification. Share instantly.",
      imageUrl: "/images/kit/ecert.png",
      includedInCategories: ["5 KM", "15 KM", "25 KM"],
    },
  ],

  testimonials: [
    // TODO: UPDATE WITH OFFICIAL TCE DATA — replace with real participant quotes
    {
      id: "t1",
      name: "Priya Krishnan",
      avatarUrl: "/images/avatars/placeholder-1.jpg",
      role: "Student, ECE Dept",
      category: "15 KM Challenger",
      quote:
        "Cycling for a drug-free future gave the ride a deeper purpose. The route through Madurai's heritage sites was breathtaking.",
    },
    {
      id: "t2",
      name: "Arun Selvam",
      avatarUrl: "/images/avatars/placeholder-2.jpg",
      role: "Faculty, Mechanical Dept",
      category: "25 KM Champion",
      quote:
        "Seeing 500+ students pedal together against drug abuse was incredibly moving. This event brings TCE together like nothing else.",
    },
    {
      id: "t3",
      name: "Meenakshi R.",
      avatarUrl: "/images/avatars/placeholder-3.jpg",
      role: "Student, CSE Dept",
      category: "5 KM Fun Ride",
      quote:
        "My first ever cyclothon! The 5 KM route was perfect for beginners. The energy at the finish line was absolutely electric.",
    },
    {
      id: "t4",
      name: "Dr. Senthil Kumar",
      avatarUrl: "/images/avatars/placeholder-4.jpg",
      role: "NSS Coordinator",
      category: "Event Organizer",
      quote:
        "TCE Cyclothon aligns perfectly with our NSS mandate. Cycling + anti-drug awareness is a winning combination for youth empowerment.",
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
      { name: "Title Sponsor 1", logoUrl: "/images/sponsors/placeholder-title-1.png", tier: "title" },
      { name: "Title Sponsor 2", logoUrl: "/images/sponsors/placeholder-title-2.png", tier: "title" },
    ],
    eventPartners: [
      // TODO: UPDATE WITH OFFICIAL TCE DATA
      { name: "Event Partner 1", logoUrl: "/images/sponsors/placeholder-partner-1.png", tier: "partner" },
      { name: "Event Partner 2", logoUrl: "/images/sponsors/placeholder-partner-2.png", tier: "partner" },
      { name: "Event Partner 3", logoUrl: "/images/sponsors/placeholder-partner-3.png", tier: "partner" },
      { name: "Event Partner 4", logoUrl: "/images/sponsors/placeholder-partner-4.png", tier: "partner" },
    ],
  },

  faqs: [
    {
      question: "Is wearing a helmet mandatory?",
      answer:
        "Yes, helmets are mandatory for all categories. Riders without helmets will not be allowed to start. If you don't own one, limited helmets will be available at the registration desk on a first-come, first-served basis.",
    },
    {
      question: "Do I need to bring my own bicycle?",
      answer:
        "Yes, riders must bring their own bicycles. TCE is coordinating with local rental shops for limited rental options — details will be shared closer to the event date.",
    },
    {
      question: "What is the age eligibility?",
      answer:
        "5 KM Fun Ride: 12+ years (under-16 requires parent consent). 15 KM Challenger: 15+ years. 25 KM Champion: 16+ years. Valid ID proof required at registration.",
    },
    {
      question: "What time should I report on event day?",
      answer:
        "Gates open at 5:00 AM. Reporting time is 5:30 AM for bib collection and warm-up. Flag-off is scheduled for 6:00 AM. Late arrivals may not be accommodated.",
    },
    {
      question: "Is medical support available on the route?",
      answer:
        "Yes, medical volunteers and first-aid stations will be positioned at every checkpoint. An ambulance will shadow the peloton. Emergency contact numbers will be printed on your bib.",
    },
    {
      question: "Can I switch categories after registration?",
      answer:
        "Category changes are allowed up to 48 hours before the event, subject to availability. Contact the organizing committee via the event website.",
    },
  ],

  socialLinks: {
    instagram: "#",   // TODO: UPDATE WITH OFFICIAL TCE DATA
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
};
