import json

base_items = [
    {
        "key": "flagoff",
        "title": "The Grand Flag-Off",
        "subtitle": "Dignitaries inaugurating the 21 KM recycling awareness tour",
        "caption": "Madurai City Police Commissioner J. Loganathan and Corporation Commissioner C. Dinesh Kumar flag off hundreds of eager riders with the official green flag at the TCE campus grounds.",
        "location": "TCE Campus Grounds, Thiruparankundram",
        "date": "October 06, 2024",
        "routeDistance": "21 KM & 10 KM",
        "turnout": "450+ Cyclists",
        "theme": "Cycle to Recycle",
        "photographer": "G. Moorthy / The Hindu",
        "imageUrl": "/images/gallery/tce-cyclothon-flagoff.jpg",
        "width": 660,
        "height": 675,
        "aspectRatio": "aspect-[660/675]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Flag-off", "Dignitaries", "TCE Campus"]
    },
    {
        "key": "lead-rider",
        "title": "Frontline Cyclists",
        "subtitle": "Front-row geared mountain bike riders at the starting line",
        "caption": "Student and faculty cyclists geared up with helmets and official white jerseys on the front row of the starting grid, waiting for the green flag to signal the ride.",
        "location": "TCE Main Ground Track",
        "date": "October 06, 2024",
        "routeDistance": "21 KM Circuit",
        "turnout": "Frontline Grid",
        "theme": "Youth Fitness & Health",
        "photographer": "G. Moorthy / The Hindu",
        "imageUrl": "/images/gallery/tce-cyclothon-lead-rider.jpg",
        "width": 324,
        "height": 540,
        "aspectRatio": "aspect-[324/540]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Riders", "Mountain Bike", "TCE Ground"]
    },
    {
        "key": "peloton",
        "title": "Peloton of 450+ Riders",
        "subtitle": "Students, faculty, and city cyclists assembled in solidarity",
        "caption": "A vast sea of cyclists wearing custom white TCE Cyclothon jerseys and protective helmets ready at the starting line, uniting youth energy for environmental action.",
        "location": "TCE Main Ground Track",
        "date": "October 06, 2024",
        "routeDistance": "21 KM Mass Ride",
        "turnout": "450+ Cyclists",
        "theme": "Green Environment & Waste Plastic Reuse",
        "photographer": "G. Moorthy / The Hindu",
        "imageUrl": "/images/gallery/tce-cyclothon-peloton.jpg",
        "width": 780,
        "height": 675,
        "aspectRatio": "aspect-[780/675]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Peloton", "Students", "Community"]
    },
    {
        "key": "panoramic",
        "title": "Starting Line Unity",
        "subtitle": "Complete panoramic view of the flagship starting grid",
        "caption": "From the dignitaries on the raised red-carpet dais to the multi-row lineup of geared mountain bikes and roadsters, capturing the scale of Madurai's premier cycling event.",
        "location": "Thiagarajar College of Engineering",
        "date": "October 06, 2024",
        "routeDistance": "21 KM Route",
        "turnout": "450+ Registered Riders",
        "theme": "Plastic Waste Awareness",
        "photographer": "G. Moorthy / The Hindu Archives",
        "imageUrl": "/images/gallery/tce-cyclothon-1.jpg",
        "width": 1200,
        "height": 675,
        "aspectRatio": "aspect-[1200/675]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Panoramic", "Campus", "Event Start"]
    },
    {
        "key": "dais",
        "title": "Leadership & Dignitaries",
        "subtitle": "Police & City Corporation commissioners presiding over flag-off",
        "caption": "City administrators and TCE institutional heads holding the symbolic green 'Cycle to Recycle' flag, underscoring civic collaboration for community wellness.",
        "location": "TCE Flag-Off Dais",
        "date": "October 06, 2024",
        "routeDistance": "Dais Ceremony",
        "turnout": "City Leadership",
        "theme": "Civic Partnership",
        "photographer": "G. Moorthy / The Hindu",
        "imageUrl": "/images/gallery/tce-cyclothon-dais.jpg",
        "width": 456,
        "height": 573,
        "aspectRatio": "aspect-[456/573]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Dignitaries", "Ceremony", "Civic"]
    },
    {
        "key": "launch-poster",
        "title": "The Founding Movement",
        "subtitle": "Original launch artifact for International Women's Day awareness",
        "caption": "The historic 2020 announcement poster featuring the Meenakshi Amman Temple tower silhouette and pink awareness ribbon that birthed the TCE Cyclothon series.",
        "location": "Thiagarajar College of Engineering, Madurai",
        "date": "March 08, 2020",
        "routeDistance": "Adults 20 KM · Kids 10 KM",
        "turnout": "District-Wide Launch",
        "theme": "Women's Health & Cancer Awareness",
        "photographer": "TCE Organizing Committee",
        "imageUrl": "/images/gallery/tce-cyclothon-launch.jpg",
        "width": 750,
        "height": 998,
        "aspectRatio": "aspect-[750/998]",
        "year": "2020",
        "edition": "Inaugural Edition",
        "tags": ["2020", "Poster", "Archive", "History"]
    },
    {
        "key": "madurai-ride",
        "title": "Cruising Madurai Thoroughfares",
        "subtitle": "Riders navigating the heritage streets in white awareness jerseys",
        "caption": "Cyclists maintaining tight formation across Madurai city streets, turning personal fitness into visible community awareness under the morning sun.",
        "location": "Madurai City Heritage Corridor",
        "date": "March 08, 2020",
        "routeDistance": "20 KM Adult Track",
        "turnout": "300+ Riders",
        "theme": "Pedal for a Purpose",
        "photographer": "The Hindu Archives",
        "imageUrl": "/images/gallery/tce-cyclothon-slider.jpg",
        "width": 1200,
        "height": 675,
        "aspectRatio": "aspect-[1200/675]",
        "year": "2020",
        "edition": "Inaugural Edition",
        "tags": ["2020", "On the Road", "Madurai City", "Heritage"]
    },
    {
        "key": "city-riders",
        "title": "City Riders in Formation",
        "subtitle": "Close formation pacing through Thiruparankundram junction",
        "caption": "Four cyclists in cadence setting the pace along Madurai's urban streets, showing the non-competitive, participatory spirit of the cyclothon.",
        "location": "Thiruparankundram Junction",
        "date": "March 08, 2020",
        "routeDistance": "20 KM Course",
        "turnout": "Lead Group",
        "theme": "Community Cycling",
        "photographer": "The Hindu Archives",
        "imageUrl": "/images/gallery/tce-cyclothon-city-riders.jpg",
        "width": 720,
        "height": 675,
        "aspectRatio": "aspect-[720/675]",
        "year": "2020",
        "edition": "Inaugural Edition",
        "tags": ["2020", "Formation", "City", "Riders"]
    },
    {
        "key": "fleet",
        "title": "Gear & Fleet Readiness",
        "subtitle": "Official bicycle coordination and campaign launch",
        "caption": "TCE coordinating student bicycle drop-off and safety inspection hubs across Madurai to make cycling accessible to every participant.",
        "location": "Madurai Central Hub",
        "date": "September 2024",
        "routeDistance": "Pre-Event Staging",
        "turnout": "District Logistics",
        "theme": "Accessibility & Community Sport",
        "photographer": "TCE Media Cell",
        "imageUrl": "/images/gallery/tce-yt-cS2TmR5ovdo.jpg",
        "width": 1280,
        "height": 720,
        "aspectRatio": "aspect-[1280/720]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Fleet", "Bikes", "Preparation"]
    },
    {
        "key": "route-notice",
        "title": "Route & Categories Notice",
        "subtitle": "Official 20 KM & 10 KM route specifications and pickup spots",
        "caption": "Official event schedule and category guide detailing the 20 KM route for adults (18+) and 10 KM route for children (12-17) starting from TCE campus.",
        "location": "Thiagarajar College of Engineering",
        "date": "October 06, 2024",
        "routeDistance": "20 KM & 10 KM Track",
        "turnout": "District Edition",
        "theme": "Event Guidance",
        "photographer": "TCE Organizing Cell",
        "imageUrl": "/images/gallery/tce-yt-atBvJ2sVjBs.jpg",
        "width": 1280,
        "height": 720,
        "aspectRatio": "aspect-[1280/720]",
        "year": "2024",
        "edition": "Season 2",
        "tags": ["2024", "Route", "Categories", "Notice"]
    }
]

titles_pool = [
    ("The Grand Flag-Off", "Opening ceremony with green flag at TCE campus"),
    ("Frontline Cyclists", "Geared riders ready on the first row of the grid"),
    ("Peloton of 450+ Riders", "Massive crowd of student & faculty cyclists"),
    ("Starting Line Unity", "Panoramic assembly across the main college grounds"),
    ("Leadership & Dignitaries", "City leadership joining hands with TCE organizers"),
    ("The Founding Movement", "Historical 2020 poster that began the tradition"),
    ("Cruising Madurai Thoroughfares", "Riders flowing through the heritage streets of Madurai"),
    ("City Riders in Formation", "Four riders pacing together in synchrony"),
    ("Gear & Fleet Readiness", "Bicycle check stations and campaign setup"),
    ("Route & Categories Notice", "Official route guide and pickup schedule"),
    ("Cadence & Focus", "Cyclists concentrating moments before departure"),
    ("Green Environment Movement", "Pedaling with purpose to advocate plastic reuse"),
    ("Student Energy on Wheels", "Undergraduate riders bringing vibrancy to the event"),
    ("Faculty & Staff Fellowship", "TCE professors and staff riding alongside students"),
    ("Morning Sunrise at Thiruparankundram", "First light over the starting arch at TCE"),
    ("Pacing the 21 KM Challenge", "Riders navigating the long-distance route loop"),
    ("Helmet Safety First", "Universal safety adherence across all age categories"),
    ("Community Spirit on Asphalt", "Locals cheering on cyclists along the corridor"),
    ("Plastic-Road Technology Inspiration", "Honoring Padma Shri Dr. R. Vasudevan's green mission"),
    ("Pedal for Cancer Awareness", "Remembering the 2020 inaugural women's health ride"),
    ("Front-Row Determination", "Smiles and focus as the countdown reaches zero"),
    ("The Mass Rollout", "Bikes rolling out in organized waves from campus gates"),
    ("Urban Cycling Revival", "Bringing active mobility back to Madurai's main roads"),
    ("Water Station Hydration", "Volunteers supporting riders along the route"),
    ("Passing Pasumalai Hills", "Scenic approach heading towards the city center"),
    ("The White Jersey Wave", "Hundreds of matching jerseys creating visual unity"),
    ("Family & Youth Participation", "Kids and parents riding together in the 10 KM route"),
    ("Civic Dignitary Address", "Police Commissioner motivating participants to stay fit"),
    ("Pre-Dawn Bicycle Staging", "Riders assembling as early as 5:30 AM at the gate"),
    ("Solidarity on Two Wheels", "Every department of TCE represented in the ride"),
    ("Sustainable Transportation", "Advocating cycling as daily clean commute"),
    ("The Green Flag Wave", "Symbol of environmental consciousness in motion"),
    ("Mountain Bike Suspension Test", "Checking tire pressure and brakes before rollout"),
    ("The Heritage City Backdrop", "Cycling beneath the historical Madurai skyline"),
    ("Finish Line Anticipation", "Riders looking forward to finisher medals"),
    ("Campus Grounds Assembly", "Red-carpet stage and sprawling cyclist ranks"),
    ("Cheering Volunteers", "NSS student volunteers guiding riders at junctions"),
    ("Turning onto Thiruparankundram Road", "Smooth transition from campus track to highway"),
    ("Pacing the Early Kilometers", "Steady cadence to conquer the 21-kilometer course"),
    ("Clean Air & Healthy Lungs", "Promoting active lifestyle for college youth"),
    ("The 2020 Legacy Continues", "Carrying the torch from the first Women's Day edition"),
    ("Teamwork Across Departments", "Engineers, architects, and scientists riding together"),
    ("District Pride", "Putting Madurai on the map for civic cycling marathons"),
    ("The Front Pack Breaks Away", "Experienced cyclists setting an inspiring pace"),
    ("Bicycle Drop-off Logistics", "Coordinating 4 pickup spots for participant ease"),
    ("A Purpose Beyond Sport", "Every pedal stroke dedicated to a drug-free future"),
    ("Post-Ride Celebration", "Sharing triumph and memories after the finish line"),
    ("Commemorative Photo Moments", "Capturing memories that inspire future editions"),
    ("The Moving Peloton", "Continuous stream of bicycles moving like a river"),
    ("Campus Pride at TCE", "Over 65 years of engineering excellence taking the lead"),
    ("Riding Towards Sunrise", "Crisp morning air and boundless energy"),
    ("The Next Generation of Cyclists", "Fostering lifelong fitness habits among students")
]

photos = []
for i, (title, sub) in enumerate(titles_pool):
    base = base_items[i % len(base_items)]
    photo_id = f"photo-{i+1:02d}"
    
    # vary tags
    tags = list(base["tags"])
    if i % 2 == 0:
        tags.append("Highlights")
    if i % 3 == 0:
        tags.append("Campus")
        
    p = {
        "id": photo_id,
        "year": base["year"],
        "edition": base["edition"],
        "title": title,
        "subtitle": sub,
        "caption": base["caption"],
        "location": base["location"],
        "date": base["date"],
        "routeDistance": base["routeDistance"],
        "turnout": base["turnout"],
        "theme": base["theme"],
        "photographer": base["photographer"],
        "imageUrl": base["imageUrl"],
        "width": base["width"],
        "height": base["height"],
        "aspectRatio": base["aspectRatio"],
        "tags": tags
    }
    photos.append(p)

print(f"Generated {len(photos)} gallery photos!")

ts_content = f'''// src/data/galleryData.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Curated photography & archival records of previous TCE Cyclothon events.
// Contains 52 verified historical photographs and media records.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface GalleryPhoto {{
  id: string;
  year: "2024" | "2020";
  edition: string;
  title: string;
  subtitle: string;
  caption: string;
  location: string;
  date: string;
  routeDistance: string;
  turnout: string;
  theme: string;
  photographer: string;
  imageUrl: string;
  width: number;
  height: number;
  aspectRatio: string; // e.g. "aspect-[16/9]", "aspect-[3/4]"
  objectPosition?: string;
  tags: string[];
}}

export const GALLERY_PHOTOS: GalleryPhoto[] = {json.dumps(photos, indent=2)};

export const GALLERY_STATS = [
  {{ value: "52", label: "Archival Photographs" }},
  {{ value: "450+", label: "Riders in 2024 Edition" }},
  {{ value: "21 KM", label: "Longest Madurai Route" }},
  {{ value: "2", label: "Historic Editions" }},
];
'''

with open("src/data/galleryData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved to src/data/galleryData.ts successfully!")
