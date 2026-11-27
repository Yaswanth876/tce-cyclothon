export const FAQ_CATEGORIES = [
  { id: "getting-started", label: "Ride Basics" },
  { id: "registration", label: "Registration" },
  { id: "event-day", label: "Event Day" },
  { id: "routes-safety", label: "Routes & Safety" },
  { id: "awards", label: "Awards" },
  { id: "all", label: "All FAQs" },
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

export const FAQS: FaqItem[] = [
  {
    id: "what-is-tce-cyclothon",
    category: "getting-started",
    question: "What is TCE Cyclothon?",
    answer:
      'TCE Cyclothon is a cycling event by Thiagarajar College of Engineering. The 2027 theme, "Pedal No to Drug," promotes drug awareness under United Nations Sustainable Development Goal 3, Target 3.5. Final arrangements are pending.',
  },
  {
    id: "who-can-participate",
    category: "getting-started",
    question: "Who can ride?",
    answer: "Age, eligibility, and consent rules are not confirmed yet.",
  },
  {
    id: "cycling-experience",
    category: "getting-started",
    question: "Do I need cycling experience?",
    answer: "Experience requirements for each ride are pending confirmation.",
  },
  {
    id: "how-to-register",
    category: "registration",
    question: "How do I register?",
    answer:
      "Registration details are pending. The official link will appear here when available.",
  },
  {
    id: "registration-fee",
    category: "registration",
    question: "Is registration free?",
    answer: "The fee, including whether the rides are free, is not confirmed.",
  },
  {
    id: "modify-registration",
    category: "registration",
    question: "Can I change my registration?",
    answer: "Change options and deadlines are not confirmed.",
  },
  {
    id: "group-registration",
    category: "registration",
    question: "Can I register with a group?",
    answer: "Group registration details are pending confirmation.",
  },
  {
    id: "reporting-time",
    category: "event-day",
    question: "When should I arrive?",
    answer: "Report by 5:30 AM IST. The flag-off is at 6:00 AM IST.",
  },
  {
    id: "starting-point",
    category: "event-day",
    question: "Where does the ride start?",
    answer:
      "The ride starts at TCE Gate, Thiagarajar College of Engineering, Thiruparankundram. Organizers will confirm the finish arrangements.",
  },
  {
    id: "what-to-bring",
    category: "event-day",
    question: "What should participants bring?",
    answer:
      "Bring a road-ready bicycle and a properly fitted helmet. The final rider checklist is pending.",
  },
  {
    id: "refreshments",
    category: "event-day",
    question: "Will refreshments be provided?",
    answer: "Refreshment stops and what they will provide are not confirmed yet.",
  },
  {
    id: "ride-distances",
    category: "routes-safety",
    question: "Which distances can I ride?",
    answer:
      "Choose 5 KM, 15 KM, or 25 KM. Final route maps are pending confirmation.",
  },
  {
    id: "helmet-policy",
    category: "routes-safety",
    question: "Do I need a helmet?",
    answer:
      "Wear a properly fitted helmet. Organizers have not confirmed whether helmets are mandatory.",
  },
  {
    id: "safety-precautions",
    category: "routes-safety",
    question: "What safety precautions should participants follow?",
    answer:
      "Wear a fitted helmet, follow traffic laws and marshal instructions, and ride within your ability. The full safety plan is pending.",
  },
  {
    id: "rain-policy",
    category: "routes-safety",
    question: "What happens if it rains?",
    answer: "The weather, postponement, and cancellation policy is not confirmed.",
  },
  {
    id: "prizes",
    category: "awards",
    question: "Are there prizes or awards?",
    answer: "Prize categories and award details are pending confirmation.",
  },
  {
    id: "certificates",
    category: "awards",
    question: "Will participants receive certificates?",
    answer: "Certificate availability and eligibility are not confirmed.",
  },
  {
    id: "winner-selection",
    category: "awards",
    question: "How will winners be selected?",
    answer: "Award categories and selection criteria are pending publication.",
  },
];
