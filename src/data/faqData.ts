export const FAQ_CATEGORIES = [
  { id: "getting-started", label: "Getting Started" },
  { id: "registration", label: "Registration" },
  { id: "event-day", label: "Event Day" },
  { id: "routes-safety", label: "Routes & Safety" },
  { id: "awards", label: "Awards" },
  { id: "all", label: "All Questions" },
] as const;

export type FaqCategoryId = Exclude<
  (typeof FAQ_CATEGORIES)[number]["id"],
  "all"
>;

export type FaqFilterId = (typeof FAQ_CATEGORIES)[number]["id"];

export interface FaqItem {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
}

const pendingDetails =
  "This information has not been officially confirmed by the event organizers yet. We will update this answer when details are published.";

export const FAQS: FaqItem[] = [
  {
    id: "what-is-tce-cyclothon",
    category: "getting-started",
    question: "What is TCE Cyclothon?",
    answer:
      'TCE Cyclothon is a cycling initiative by Thiagarajar College of Engineering. The current campaign, "Pedal No to Drug," promotes drug awareness in line with UN SDG 3, Target 3.5. Event arrangements will be updated when officially confirmed.',
  },
  {
    id: "who-can-participate",
    category: "getting-started",
    question: "Who can participate?",
    answer: `Age limits, eligibility, and consent requirements have not been confirmed. ${pendingDetails}`,
  },
  {
    id: "cycling-experience",
    category: "getting-started",
    question: "Is prior cycling experience required?",
    answer: `The organizers have not confirmed experience requirements for each ride. ${pendingDetails}`,
  },
  {
    id: "how-to-register",
    category: "registration",
    question: "How do I register?",
    answer:
      "The official registration link is not available yet. We will add it here once the organizers publish it.",
  },
  {
    id: "registration-fee",
    category: "registration",
    question: "Is there a registration fee?",
    answer: `The fee, including whether registration is free, has not been announced. ${pendingDetails}`,
  },
  {
    id: "modify-registration",
    category: "registration",
    question: "Can I modify my registration details?",
    answer: `The process and deadline for changing registration details have not been announced. ${pendingDetails}`,
  },
  {
    id: "group-registration",
    category: "registration",
    question: "Can I register as a group?",
    answer: `Group registration options have not been confirmed. ${pendingDetails}`,
  },
  {
    id: "reporting-time",
    category: "event-day",
    question: "What is the reporting time?",
    answer: `The official reporting and flag-off schedule has not been confirmed. ${pendingDetails}`,
  },
  {
    id: "starting-point",
    category: "event-day",
    question: "Where is the starting point?",
    answer:
      "The current event listing names Thiagarajar College of Engineering in Thiruparankundram as the venue. The exact start and finish points still need official confirmation.",
  },
  {
    id: "what-to-bring",
    category: "event-day",
    question: "What should participants bring?",
    answer:
      "Plan to bring a road-ready bicycle and a properly fitted helmet. The organizers have not published the final participant checklist yet.",
  },
  {
    id: "refreshments",
    category: "event-day",
    question: "Will refreshments be provided?",
    answer: `Refreshment stations and what they will provide have not been confirmed. ${pendingDetails}`,
  },
  {
    id: "ride-distances",
    category: "routes-safety",
    question: "What are the available cycling distances?",
    answer:
      "The current site lists 5 KM, 15 KM, and 25 KM rides. Organizers have not yet confirmed the final route details.",
  },
  {
    id: "helmet-policy",
    category: "routes-safety",
    question: "Are helmets mandatory?",
    answer:
      "The official helmet policy has not been announced. We recommend wearing a properly fitted helmet; the event's final safety rules will be shared here when confirmed.",
  },
  {
    id: "safety-precautions",
    category: "routes-safety",
    question: "What safety precautions should participants follow?",
    answer:
      "Wear a properly fitted helmet, follow traffic laws and marshal instructions, and ride within your ability. The organizers' full safety plan has not yet been published.",
  },
  {
    id: "rain-policy",
    category: "routes-safety",
    question: "What happens if it rains?",
    answer: `The weather, postponement, and cancellation policy has not been announced. ${pendingDetails}`,
  },
  {
    id: "prizes",
    category: "awards",
    question: "Are there prizes or awards?",
    answer: `Prize categories and award details have not been confirmed. ${pendingDetails}`,
  },
  {
    id: "certificates",
    category: "awards",
    question: "Will participants receive certificates?",
    answer: `Certificate availability and eligibility have not been confirmed. ${pendingDetails}`,
  },
  {
    id: "winner-selection",
    category: "awards",
    question: "How will winners be selected?",
    answer: `The award categories and winner-selection criteria have not been published. ${pendingDetails}`,
  },
];
