import type { IconName } from "@/components/Icon";

export type Faq = { question: string; answer: string };

export type CategorySlug =
  | "building-civil-construction"
  | "welding-steel-fabrication"
  | "industrial-pipe-fitting-mechanical"
  | "fuel-storage-energy-infrastructure"
  | "carpentry-woodwork"
  | "property-maintenance-handyman"
  | "renovations-property-improvements";

export type ServiceCategory = {
  slug: CategorySlug;
  name: string;
  /** Short label for filters, menus and form options. */
  shortName: string;
  icon: IconName;
  /** One line for cards. */
  summary: string;
  /** Landing page intro paragraphs. */
  intro: string[];
  seoTitle: string;
  seoDescription: string;
  /** Portfolio photo slug used for the category card / hero, or null when no genuine photo exists yet. */
  image: string | null;
  audiences: string[];
  services: string[];
  faqs: Faq[];
};

export type ServicePage = {
  slug: string;
  category: CategorySlug;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  includes: string[];
  idealFor: string[];
  /** What affects the price — answers "cost / prices" search intent honestly without inventing figures. */
  pricingFactors: string[];
  /** Must match an entry in the parent category's `services` list (used to prefill the quote form). */
  prefillService: string;
  image: string | null;
  /** Icon for the illustration placeholder when `image` is null (defaults to the category icon). */
  icon?: IconName;
  faqs: Faq[];
};

export const categories: ServiceCategory[] = [
  {
    slug: "building-civil-construction",
    name: "Building & Civil Construction",
    shortName: "Building & Civil",
    icon: "hard-hat",
    summary:
      "Foundations, concrete slabs, brick and blockwork, paving, retaining walls, extensions and site works.",
    intro: [
      "From setting out and excavation to the final screed, we handle the structural groundwork that every good build depends on. Our team prepares sites, fixes reinforcement, pours and finishes concrete, and builds the walls, paving and drainage around it.",
      "We work on homes, commercial premises and larger construction sites — either as your main contractor for smaller builds or as a reliable subcontractor alongside your own team.",
    ],
    seoTitle: "Building & Concrete Contractors in South Africa",
    seoDescription:
      "Building and civil construction across South Africa: concrete foundations and slabs, bricklaying, paving, retaining walls, extensions and site preparation. Request a quote.",
    image: "concrete-slab-pour-screeding",
    audiences: ["Homeowners", "Property developers", "Building contractors", "Commercial businesses"],
    services: [
      "General building construction",
      "Concrete foundations",
      "Concrete slabs",
      "Concrete casting and pouring",
      "Concrete repairs",
      "Bricklaying",
      "Blockwork",
      "Plastering",
      "Paving installation",
      "Driveway paving",
      "Kerbing",
      "Retaining walls",
      "Boundary walls",
      "Site preparation",
      "Building extensions",
      "General civil construction",
      "Drainage and stormwater solutions",
    ],
    faqs: [
      {
        question: "Do you work as a subcontractor on larger construction sites?",
        answer:
          "Yes. We regularly work alongside main contractors on concrete, reinforcement, paving and site works, and we can also take on smaller builds as the main contractor.",
      },
      {
        question: "Can you help with drainage and stormwater problems?",
        answer:
          "Yes. We assess where water collects or enters, then propose practical solutions such as channel drains, regrading, kerbing or retaining structures.",
      },
      {
        question: "Do I need plans approved before building an extension or boundary wall?",
        answer:
          "Many structural works require approved plans from the municipality. We will tell you what we know applies to your project and work from your approved drawings where they are required.",
      },
    ],
  },
  {
    slug: "welding-steel-fabrication",
    name: "Welding & Steel Fabrication",
    shortName: "Welding & Fabrication",
    icon: "tools",
    summary:
      "On-site and workshop welding, structural steel, gates, burglar bars, carports, staircases and custom fabrication.",
    intro: [
      "We fabricate and repair steelwork in the workshop and on site — from security gates and burglar bars to steel frames, platforms, enclosures and structural members.",
      "Whether you need a one-off custom piece, a batch of identical frames or an urgent on-site weld repair, we measure carefully, fabricate to fit and finish the job properly.",
    ],
    seoTitle: "Welding & Steel Fabrication in South Africa",
    seoDescription:
      "Welding and steel fabrication across South Africa: on-site welding, structural steel, steel gates, burglar bars, carports, staircases, handrails and repairs. Get a quote.",
    image: "on-site-welding-steel-mesh-enclosure",
    audiences: ["Homeowners", "Commercial businesses", "Industrial companies", "Building contractors"],
    services: [
      "General welding",
      "MIG welding",
      "TIG welding",
      "Arc welding",
      "Structural steel fabrication",
      "Steel gates",
      "Burglar bars",
      "Security doors",
      "Carports",
      "Steel structures",
      "Steel platforms",
      "Staircases",
      "Handrails",
      "Custom metal fabrication",
      "Boiler making",
      "Metal repairs",
      "On-site welding",
      "Welding repairs",
    ],
    faqs: [
      {
        question: "Do you weld on site or only in the workshop?",
        answer:
          "Both. Larger items are usually fabricated in the workshop and installed on site, while repairs and fitting work can be welded on site.",
      },
      {
        question: "Can you do coded or certified welding?",
        answer:
          "If your project specifies coded welding or particular certifications, please mention it in your enquiry. We will confirm upfront exactly what we can provide for your job before quoting.",
      },
      {
        question: "Can you match or repair an existing gate or steel structure?",
        answer:
          "Yes. Send us photos with your enquiry and we will advise whether a repair, modification or replacement makes the most sense.",
      },
    ],
  },
  {
    slug: "industrial-pipe-fitting-mechanical",
    name: "Industrial Pipe Fitting & Mechanical Services",
    shortName: "Pipe Fitting & Mechanical",
    icon: "nut-screw",
    summary:
      "Industrial pipework, flanges, pipe fabrication and repairs, mechanical installations, machinery maintenance and shutdown support.",
    intro: [
      "We install, fabricate and repair steel and stainless steel pipework, fit flanges and supports, and install mechanical equipment for industrial and commercial sites.",
      "Our experience includes fuel storage tanks and dispensers, above- and below-ground pipe runs, and maintenance work where minimal downtime matters.",
    ],
    seoTitle: "Industrial Pipe Fitting & Mechanical Services",
    seoDescription:
      "Industrial pipe fitting across South Africa: steel and stainless pipework, flanges, pipe fabrication and repairs, mechanical installation, maintenance and shutdown support.",
    image: "flanged-pipe-fitting",
    audiences: ["Industrial companies", "Maintenance departments", "Construction companies", "Commercial businesses"],
    services: [
      "Industrial pipe fitting",
      "Pipe installation",
      "Pipe fabrication",
      "Pipe repairs",
      "Steel pipework",
      "Stainless steel pipework",
      "Pipe supports",
      "Pipe cutting and threading",
      "Flange installation",
      "Mechanical installation",
      "Machinery maintenance",
      "Mechanical repairs",
      "Industrial maintenance",
      "Shutdown support",
    ],
    faqs: [
      {
        question: "Can you support a planned shutdown?",
        answer:
          "Yes. Share the scope and timeline with us early so we can plan manpower, materials and sequencing to fit your shutdown window.",
      },
      {
        question: "Do you work with stainless steel pipework?",
        answer:
          "Yes, we install and repair both carbon steel and stainless steel pipework, including flanges and supports.",
      },
      {
        question: "Can you work to our drawings and site safety requirements?",
        answer:
          "Yes. Send your drawings, specifications and site requirements with your enquiry and we will price and plan the work accordingly.",
      },
    ],
  },
  {
    slug: "fuel-storage-energy-infrastructure",
    name: "Fuel Storage & Energy Infrastructure",
    shortName: "Fuel & Energy",
    icon: "fuel-tank",
    summary:
      "Above-ground bulk fuel tank fabrication, fuel storage and dispensing installation, maintenance, safe decommissioning and renewable energy mechanical installations.",
    intro: [
      "We fabricate above-ground tanks for bulk fuel storage, and install, maintain and safely decommission the tanks, pipework, sumps and dispensers that make up a fuel storage and dispensing system.",
      "These projects bring civil works, steel fabrication, pipe fitting and mechanical installation together on one site. Our teams run those trades side by side — excavation and concrete crews alongside fitters and fabricators — under hands-on managers who read the engineering drawings and keep every trade working to the same programme.",
      "We also handle the mechanical side of renewable energy installations, such as mounting structures and support steelwork, working with qualified electricians who carry out and certify all electrical work.",
    ],
    seoTitle: "Fuel Tank Fabrication & Installation | South Africa",
    seoDescription:
      "Above-ground bulk fuel tank fabrication, fuel storage and dispensing installation, maintenance and safe decommissioning, plus renewable energy mechanical installations.",
    image: "underground-fuel-tanks-installation",
    audiences: [
      "Fuel retailers and service stations",
      "Farms, fleets and logistics depots",
      "Mines, plants and industrial sites",
      "Main contractors and developers",
    ],
    services: [
      "Above-ground tank fabrication",
      "Bulk fuel storage tanks",
      "Fuel storage installation",
      "Underground tank installation",
      "Fuel dispenser installation",
      "Fuel pipework, sumps and valves",
      "Fuel system maintenance",
      "Forecourt upgrades",
      "Tank and dispenser decommissioning",
      "Renewable energy mechanical installations",
      "Solar mounting structures",
    ],
    faqs: [
      {
        question: "Can you handle the civil, steel and pipework on a fuel site together?",
        answer:
          "Yes. Excavation, concrete bases, tank installation, fabrication and pipe fitting are all in-house, and we run those teams simultaneously under one manager so the site moves forward on every front.",
      },
      {
        question: "Can we hire you for just one part of the project?",
        answer:
          "Yes. You can appoint us for a single specialised service, such as tank fabrication or dispenser maintenance, or bundle several services into one package with one point of contact.",
      },
      {
        question: "Do you work to our engineering drawings and site permits?",
        answer:
          "Yes. Our managers interpret engineering blueprints and specifications accurately. Send your drawings, specifications and site requirements with your enquiry so we can plan and price against them.",
      },
    ],
  },
  {
    slug: "carpentry-woodwork",
    name: "Carpentry & Woodwork",
    shortName: "Carpentry & Woodwork",
    icon: "hammer",
    summary:
      "Wooden decking, pergolas, custom cupboards, built-in wardrobes, doors, shelving and timber structures.",
    intro: [
      "We build practical, good-looking timber work for homes and businesses — decks around pools and trees, garden steps, pergolas, timber-clad doors and screens, cupboards and shelving.",
      "Every piece is measured and built for its space, using suitable timber and fixings for indoor or outdoor conditions.",
    ],
    seoTitle: "Carpentry & Wooden Decking in South Africa",
    seoDescription:
      "Carpentry services across South Africa: wooden decking installation, pergolas, kitchen cupboards, built-in wardrobes, wooden doors, shelving and repairs. Request a quote.",
    image: "timber-deck-plunge-pool",
    audiences: ["Homeowners", "Landlords", "Commercial businesses", "Property developers"],
    services: [
      "Custom cupboards",
      "Kitchen cupboards",
      "Built-in wardrobes",
      "Wooden decking",
      "Pergolas",
      "Wooden doors",
      "Shelving",
      "Timber structures",
      "Wooden partitions",
      "Custom woodwork",
      "Carpentry repairs",
      "General carpentry",
    ],
    faqs: [
      {
        question: "Which timber do you use for outdoor decks?",
        answer:
          "It depends on your budget and the look you want. We will discuss suitable treated softwood and hardwood options when we quote.",
      },
      {
        question: "Can you repair an existing deck instead of replacing it?",
        answer:
          "Often, yes. If the substructure is sound we can replace damaged boards and refinish the deck. Photos in your enquiry help us advise quickly.",
      },
    ],
  },
  {
    slug: "property-maintenance-handyman",
    name: "Property Maintenance & Handyman Services",
    shortName: "Maintenance & Handyman",
    icon: "wrench",
    summary:
      "Repairs and maintenance for homes, rentals and commercial properties — doors, gates, roofs, painting, tiling and waterproofing.",
    intro: [
      "Keep your property in good working order with one reliable contractor. We handle the repairs and maintenance tasks that tend to pile up — from sticking doors and broken gates to roof repairs, painting, tiling and waterproofing.",
      "We work with homeowners, landlords and property managers, and can take on single jobs or a list of repairs in one visit.",
    ],
    seoTitle: "Property Maintenance & Handyman in South Africa",
    seoDescription:
      "Handyman and property maintenance services across South Africa for homes, rentals and businesses: door, window and gate repairs, roof repairs, painting, tiling and waterproofing.",
    image: "roof-tile-pressure-cleaning",
    audiences: ["Homeowners", "Landlords", "Property management companies", "Commercial businesses"],
    services: [
      "Residential maintenance",
      "Commercial maintenance",
      "General handyman services",
      "Home repairs",
      "Door repairs",
      "Window repairs",
      "Gate repairs",
      "Roof repairs",
      "Painting",
      "Tiling",
      "Ceiling repairs",
      "Waterproofing",
      "Fixture installations",
      "General property improvements",
    ],
    faqs: [
      {
        question: "Can you handle a list of small jobs in one visit?",
        answer:
          "Yes — send us the full list with photos and we will quote for the lot, which is usually more cost-effective than separate call-outs.",
      },
      {
        question: "Do you work with landlords and property managers?",
        answer:
          "Yes. We can coordinate access with tenants and report back with photos once the work is complete.",
      },
    ],
  },
  {
    slug: "renovations-property-improvements",
    name: "Renovations & Property Improvements",
    shortName: "Renovations",
    icon: "blueprint",
    summary:
      "Bathroom, kitchen, home, office and commercial renovations, extensions, flooring, ceilings and upgrades.",
    intro: [
      "Renovations bring several trades together — building, carpentry, tiling, ceilings and finishing. Because we cover these trades ourselves, we can manage your renovation from strip-out to final clean with fewer hand-overs.",
      "We renovate bathrooms, kitchens, homes, offices and commercial spaces, and carry out interior and exterior upgrades that add value and usability to a property.",
    ],
    seoTitle: "Home & Commercial Renovation Contractors",
    seoDescription:
      "Renovation contractors across South Africa: bathroom and kitchen renovations, home and office renovations, room extensions, flooring, ceilings and property upgrades.",
    image: null,
    audiences: ["Homeowners", "Landlords", "Commercial businesses", "Property developers"],
    services: [
      "Bathroom renovations",
      "Kitchen renovations",
      "Home renovations",
      "Office renovations",
      "Commercial renovations",
      "Room extensions",
      "Interior improvements",
      "Exterior improvements",
      "Flooring",
      "Ceiling installations",
      "General property upgrades",
    ],
    faqs: [
      {
        question: "Can you manage the whole renovation?",
        answer:
          "Yes. We cover building, carpentry, tiling, ceilings and finishing ourselves, so one team is responsible for the project from start to finish.",
      },
      {
        question: "Will you help me plan the renovation?",
        answer:
          "Yes. We will visit, discuss what you want to achieve and your budget, and suggest practical options before giving you a detailed quote.",
      },
    ],
  },
];

export const servicePages: ServicePage[] = [
  // ---------------- Building & Civil ----------------
  {
    slug: "concrete-slabs-foundations",
    category: "building-civil-construction",
    name: "Concrete Slabs & Foundations",
    h1: "Concrete Contractors for Slabs & Foundations",
    seoTitle: "Concrete Contractors South Africa – Slabs & Foundations",
    seoDescription:
      "Concrete foundations, slabs, casting, pouring and repairs across South Africa. Reinforcement, shuttering and finishing for homes, commercial and construction sites.",
    intro: [
      "A slab or foundation is only as good as the preparation underneath it. We set out, excavate, compact, fix reinforcement and shuttering, then pour, level and finish the concrete so it cures properly.",
      "Our project photos below show some of this work — reinforcement mesh with bar spacers, slab preparation and commercial slabs being poured and screeded.",
    ],
    includes: [
      "Strip and raft foundations",
      "Floor slabs and surface beds",
      "Reinforcement mesh, rebar and spacers",
      "Shuttering and formwork",
      "Concrete pouring, screeding and finishing",
      "Concrete repairs and patching",
    ],
    idealFor: ["New homes and extensions", "Commercial and industrial floors", "Equipment and tank bases", "Contractors needing a concrete crew"],
    pricingFactors: [
      "Slab or foundation area and thickness",
      "Reinforcement specification",
      "Site access for the concrete truck or pump",
      "Excavation and ground preparation required",
      "Finish required (power-floated, broom, screeded)",
    ],
    prefillService: "Concrete slabs",
    image: "commercial-concrete-slab-levelling",
    faqs: [
      {
        question: "How much does a concrete slab cost?",
        answer:
          "It depends mainly on the size, thickness, reinforcement and site access. Send us the dimensions and a few photos of the site and we will give you a clear, itemised quotation.",
      },
      {
        question: "Can you pour concrete where a truck can't reach?",
        answer:
          "Yes, we plan for this — options include a concrete pump or mixing on site. Access affects the price, so please mention it in your enquiry.",
      },
    ],
  },
  {
    slug: "paving-driveways",
    category: "building-civil-construction",
    name: "Paving & Driveways",
    h1: "Paving Contractors for Driveways, Yards & Forecourts",
    seoTitle: "Paving Contractors South Africa – Driveway Paving",
    seoDescription:
      "Paving installation across South Africa: driveway paving, interlocking pavers, kerbing and forecourt paving with proper base preparation and drainage falls.",
    intro: [
      "Good paving starts below the surface. We excavate, compact a proper base, set levels and falls for drainage, then lay and edge the paving so it stays flat and firm.",
      "We pave residential driveways and walkways as well as larger commercial areas, including forecourt paving at service-station sites.",
    ],
    includes: [
      "Driveway and walkway paving",
      "Interlocking and clay pavers",
      "Kerbing and edge restraints",
      "Base preparation and compaction",
      "Levels and stormwater falls",
      "Lifting and relaying sunken paving",
    ],
    idealFor: ["Homeowners upgrading a driveway", "Commercial yards and parking", "Complexes and estates", "Contractors needing paving teams"],
    pricingFactors: [
      "Area to be paved",
      "Type of paver selected",
      "Excavation, base and existing surface removal",
      "Kerbing and drainage requirements",
    ],
    prefillService: "Driveway paving",
    image: "interlocking-paving-completed",
    faqs: [
      {
        question: "Why does paving sink, and can you fix it?",
        answer:
          "Sinking is usually caused by a poorly compacted base or water getting underneath. We lift the affected area, correct the base and drainage, and relay the pavers.",
      },
      {
        question: "What does driveway paving cost?",
        answer:
          "The price depends on the area, paver choice and how much preparation the ground needs. Share the measurements and photos and we will quote accordingly.",
      },
    ],
  },
  {
    slug: "retaining-boundary-walls",
    category: "building-civil-construction",
    name: "Retaining & Boundary Walls",
    h1: "Retaining Walls & Boundary Walls",
    seoTitle: "Retaining Walls & Boundary Walls in South Africa",
    seoDescription:
      "Retaining walls and boundary walls built across South Africa: brick and block walls, foundations, drainage behind retaining walls, plastering and finishing.",
    intro: [
      "Boundary walls give you security and privacy; retaining walls hold back soil and protect your property from erosion. Both need solid foundations and, for retaining walls, proper drainage behind them.",
      "We build brick and block walls, plaster and finish them, and can integrate steel gates and palisade sections from our fabrication workshop.",
    ],
    includes: [
      "Brick and block boundary walls",
      "Retaining walls with drainage",
      "Wall foundations",
      "Plastering and finishing",
      "Gate and pillar construction",
      "Repairs to cracked or leaning walls",
    ],
    idealFor: ["Homeowners and estates", "Sloping properties", "Commercial and industrial boundaries"],
    pricingFactors: ["Wall length and height", "Wall type and finish", "Foundation and soil conditions", "Drainage requirements"],
    prefillService: "Retaining walls",
    image: null,
    faqs: [
      {
        question: "Can you add a steel gate to a new wall?",
        answer:
          "Yes — because we do both building and steel fabrication, we can build the wall and fabricate and fit the gate as one project.",
      },
    ],
  },
  {
    slug: "building-extensions",
    category: "building-civil-construction",
    name: "Building & Extensions",
    h1: "General Building & Building Extensions",
    seoTitle: "Building Contractors South Africa – Extensions",
    seoDescription:
      "General building contractors across South Africa: building extensions, bricklaying, blockwork, plastering and site preparation for homes and commercial properties.",
    intro: [
      "Need more space? We build extensions and new structures from foundations through brickwork and plaster, coordinating with carpentry, roofing and finishing so the new space blends with the old.",
      "We also take on general building work such as new walls, outbuildings and structural alterations.",
    ],
    includes: [
      "Room and building extensions",
      "Bricklaying and blockwork",
      "Plastering",
      "Site preparation and setting out",
      "Outbuildings and garages",
      "Structural alterations",
    ],
    idealFor: ["Homeowners adding space", "Landlords adding units", "Businesses expanding premises"],
    pricingFactors: ["Size and complexity of the extension", "Approved plans and specifications", "Finishes selected", "Site access"],
    prefillService: "Building extensions",
    image: "excavation-site-works-team",
    faqs: [
      {
        question: "Do you work from architect's plans?",
        answer:
          "Yes. Send us your approved plans and specifications and we will price the work accurately against them.",
      },
    ],
  },

  // ---------------- Welding & Fabrication ----------------
  {
    slug: "welding-services",
    category: "welding-steel-fabrication",
    name: "Welding Services & Repairs",
    h1: "Welding Services: On-Site Welding & Repairs",
    seoTitle: "Welding Services South Africa – On-Site Welding",
    seoDescription:
      "Welding services across South Africa: on-site welding, MIG, TIG and arc welding, welding repairs and metal repairs for homes, businesses and industrial sites.",
    intro: [
      "Broken bracket, cracked frame or a structure that needs modifying where it stands? We bring the equipment to you for on-site welding, or fabricate and repair in the workshop.",
      "We use MIG, TIG and arc welding processes depending on the material, thickness and location of the work.",
    ],
    includes: [
      "On-site welding",
      "MIG, TIG and arc welding",
      "Welding repairs and modifications",
      "Metal repairs and reinforcing",
      "Steel and stainless steel work",
      "Workshop welding",
    ],
    idealFor: ["Urgent repairs", "Commercial and industrial sites", "Homeowners with damaged gates or frames", "Contractors needing a welder"],
    pricingFactors: ["Type and thickness of material", "On-site or workshop work", "Access and height", "Extent of repair or modification"],
    prefillService: "On-site welding",
    image: "on-site-welding-steel-mesh-enclosure",
    faqs: [
      {
        question: "Do you do coded welding?",
        answer:
          "Please tell us in your enquiry if your job requires coded welding or specific certifications. We will confirm what we can provide before quoting.",
      },
      {
        question: "Can you weld aluminium or stainless steel?",
        answer:
          "We regularly work with steel and stainless steel. For other metals, tell us the material and application so we can confirm.",
      },
    ],
  },
  {
    slug: "steel-gates-burglar-bars",
    category: "welding-steel-fabrication",
    name: "Steel Gates, Burglar Bars & Security Doors",
    h1: "Steel Gates, Burglar Bars & Security Doors",
    seoTitle: "Steel Gates & Burglar Bars in South Africa",
    seoDescription:
      "Custom steel gates, burglar bars, security doors and steel mesh enclosures fabricated and installed across South Africa. Gate repairs and modifications too.",
    intro: [
      "We fabricate security steelwork to suit your openings and your property — driveway and pedestrian gates, burglar bars, security doors and lockable steel mesh enclosures.",
      "Everything is measured on site, fabricated to fit and installed securely. We also repair and modify existing gates and bars.",
    ],
    includes: [
      "Swing and sliding steel gates",
      "Burglar bars for windows",
      "Security doors and gates",
      "Steel mesh cages and enclosures",
      "Gate repairs and modifications",
      "Priming and painting",
    ],
    idealFor: ["Homeowners", "Landlords", "Businesses securing stock or equipment", "Fuel and utility sites"],
    pricingFactors: ["Size and number of openings", "Design and material", "Finish (primer, paint, galvanising)", "Installation conditions"],
    prefillService: "Steel gates",
    image: "fabricated-steel-mesh-security-cages",
    faqs: [
      {
        question: "Can you automate a gate?",
        answer:
          "We fabricate and install the gate itself and can prepare it for a motor. Let us know if you need automation so we can plan for it.",
      },
    ],
  },
  {
    slug: "carports-steel-structures",
    category: "welding-steel-fabrication",
    name: "Carports, Staircases & Steel Structures",
    h1: "Carports, Staircases, Platforms & Steel Structures",
    seoTitle: "Steel Fabrication South Africa – Carports & Structures",
    seoDescription:
      "Structural steel fabrication across South Africa: carports, steel structures, platforms, staircases, handrails, frames and stands fabricated and installed.",
    intro: [
      "We fabricate structural and support steelwork — carports, platforms, staircases, handrails, frames and stands — in single pieces or in batches.",
      "Our workshop work includes batches of steel A-frame stands and tank fabrication, so we are comfortable with both repeat production and custom one-offs.",
    ],
    includes: [
      "Carports and shade structures",
      "Steel platforms and walkways",
      "Staircases and handrails",
      "Frames, stands and supports",
      "Structural steel fabrication",
      "Boilermaking and tank fabrication",
    ],
    idealFor: ["Homeowners", "Workshops and warehouses", "Industrial sites", "Building contractors"],
    pricingFactors: ["Size and design of the structure", "Steel sections and quantities", "Cladding or roofing", "Installation and access"],
    prefillService: "Structural steel fabrication",
    image: "batch-fabricated-steel-frames",
    faqs: [
      {
        question: "Can you fabricate a batch of identical items?",
        answer: "Yes. Send us a drawing or sample and the quantity required and we will quote for batch fabrication.",
      },
    ],
  },

  // ---------------- Pipe Fitting & Mechanical ----------------
  {
    slug: "industrial-pipe-fitting",
    category: "industrial-pipe-fitting-mechanical",
    name: "Industrial Pipe Fitting",
    h1: "Industrial Pipe Fitting & Pipe Installation",
    seoTitle: "Industrial Pipe Fitting Services | South Africa",
    seoDescription:
      "Industrial pipe fitting: steel and stainless steel pipe installation, flange installation, pipe supports and underground pipework for industrial and commercial sites.",
    intro: [
      "We install industrial pipework above and below ground — aligning, supporting and bolting up flanged connections correctly so systems run safely and without leaks.",
      "Our work includes pipework for fuel storage tanks and dispensers, flanged pipe runs and trenched underground pipelines.",
    ],
    includes: [
      "Steel pipework installation",
      "Stainless steel pipework",
      "Flange installation and bolting",
      "Pipe supports and brackets",
      "Underground pipework in trenches",
      "Fuel tank and dispenser pipework",
    ],
    idealFor: ["Industrial plants", "Fuel and service-station sites", "Maintenance departments", "Construction companies"],
    pricingFactors: ["Pipe material, size and length", "Number of fittings and flanges", "Above- or below-ground installation", "Site access and safety requirements"],
    prefillService: "Industrial pipe fitting",
    image: "flanged-pipework-installation",
    faqs: [
      {
        question: "Do you supply materials or install client-supplied pipe?",
        answer: "Either. We can supply materials to your specification or install pipe and fittings that you provide.",
      },
    ],
  },
  {
    slug: "pipe-fabrication-repairs",
    category: "industrial-pipe-fitting-mechanical",
    name: "Pipe Fabrication & Repairs",
    h1: "Pipe Fabrication, Cutting, Threading & Repairs",
    seoTitle: "Pipe Fabrication & Pipe Repair Services",
    seoDescription:
      "Pipe fabrication services: pipe spools, cutting and threading, pipe repairs, replacement sections and pipe supports for industrial and commercial clients.",
    intro: [
      "We fabricate pipe spools and sections, cut and thread pipe, and repair or replace damaged runs — in the workshop or on site.",
      "Combining pipe fitting with our welding and fabrication capability means supports, brackets and modifications can be handled by the same team.",
    ],
    includes: ["Pipe spool fabrication", "Pipe cutting and threading", "Leak and damage repairs", "Replacement sections", "Pipe supports", "Modifications to existing pipework"],
    idealFor: ["Industrial and process plants", "Maintenance departments", "Commercial buildings"],
    pricingFactors: ["Pipe material and diameter", "Complexity of the spool or repair", "Workshop or on-site work", "Urgency"],
    prefillService: "Pipe fabrication",
    image: "underground-pipework-trench",
    faqs: [
      {
        question: "Can you help with an urgent pipe repair?",
        answer:
          "Contact us on WhatsApp or by phone with photos and the location — that is the fastest way for us to assess what is needed.",
      },
    ],
  },
  {
    slug: "industrial-maintenance-shutdowns",
    category: "industrial-pipe-fitting-mechanical",
    name: "Industrial Maintenance & Shutdown Support",
    h1: "Mechanical Installation, Machinery Maintenance & Shutdown Support",
    seoTitle: "Industrial Maintenance & Shutdown Support",
    seoDescription:
      "Mechanical installation, machinery maintenance, mechanical repairs and shutdown support for industrial companies and maintenance departments.",
    intro: [
      "When equipment needs installing, maintaining or repairing, we provide skilled hands that understand mechanical systems — and the pipework and steelwork around them.",
      "We support maintenance departments with planned work and shutdowns, as well as installations such as fuel storage tanks and dispensing equipment.",
    ],
    includes: ["Mechanical equipment installation", "Machinery maintenance", "Mechanical repairs", "Tank and dispenser installation", "Shutdown support", "Fabricated modifications"],
    idealFor: ["Industrial companies", "Maintenance departments", "Fuel and logistics sites", "Plant managers"],
    pricingFactors: ["Scope and duration of work", "Team size required", "Shutdown timing (after-hours/weekends)", "Materials and equipment"],
    prefillService: "Shutdown support",
    image: "diesel-tank-dispenser-installation",
    faqs: [
      {
        question: "Can you work after hours or over weekends?",
        answer: "For shutdowns and critical work, after-hours scheduling can be arranged. Please include your preferred timing in the enquiry.",
      },
    ],
  },

  // ---------------- Fuel Storage & Energy ----------------
  {
    slug: "above-ground-fuel-tank-fabrication",
    category: "fuel-storage-energy-infrastructure",
    name: "Above-Ground Bulk Fuel Tank Fabrication",
    h1: "Above-Ground Tank Fabrication for Bulk Fuel Storage",
    seoTitle: "Above-Ground Fuel Tank Fabrication | South Africa",
    seoDescription:
      "Above-ground steel tanks fabricated for bulk fuel storage: shells, end plates, manways, nozzles, stands and bunding, built to your drawings and installed on site.",
    intro: [
      "We fabricate above-ground steel tanks for bulk diesel and fuel storage in our workshop — rolling shells, fitting end plates, manways and nozzles, and welding the stands and saddles they sit on.",
      "Our qualified boilermakers and welders build to your engineering drawings and specification. Because we also do the concrete bases, pipework and dispenser installation, the tank can be delivered as a single item or as part of a complete, installed fuel system.",
    ],
    includes: [
      "Steel tank shells and end plates",
      "Manways, nozzles, vents and fill points",
      "Tank stands, saddles and frames",
      "Bunding and containment steelwork",
      "Concrete bases and plinths",
      "Delivery, placement and connection on site",
    ],
    idealFor: ["Farms and agricultural operations", "Fleet, transport and logistics depots", "Mines, plants and construction sites", "Back-up generator fuel storage"],
    pricingFactors: [
      "Tank capacity and dimensions",
      "Plate thickness and specification",
      "Fittings, manways and accessories",
      "Stand, bunding and base requirements",
      "Coatings and finishing",
      "Transport and installation",
    ],
    prefillService: "Above-ground tank fabrication",
    image: "steel-tank-fabrication-workshop",
    faqs: [
      {
        question: "Can you build a tank to our own design?",
        answer:
          "Yes. Send us the drawings and specification and we will fabricate to them. If you only have a required capacity, tell us how and where the tank will be used and we will discuss options with you.",
      },
      {
        question: "Can you supply the tank with a dispenser and pipework?",
        answer:
          "Yes. We can fabricate the tank only, or deliver a complete package: base, tank, pipework, filtration and dispenser, installed and commissioned.",
      },
    ],
  },
  {
    slug: "fuel-storage-dispensing-installation",
    category: "fuel-storage-energy-infrastructure",
    name: "Fuel Storage & Dispensing Installation and Maintenance",
    h1: "Fuel Storage & Dispensing Infrastructure: Installation and Maintenance",
    seoTitle: "Fuel Tank & Dispenser Installation and Maintenance",
    seoDescription:
      "Fuel storage and dispensing infrastructure installed and maintained: underground and above-ground tanks, sumps, fuel lines, valves, dispensers and forecourt works.",
    intro: [
      "We install complete fuel storage and dispensing systems: excavating and preparing for underground tanks, placing and anchoring the tanks, fitting tank and dispenser sumps, running fuel lines, installing valves and pumps, and setting the dispensers.",
      "Once a site is running, we maintain it — servicing dispensers, attending to sump and pipework faults, and upgrading forecourts. Civil, mechanical and pipe-fitting crews work at the same time under one manager, which keeps disruption and downtime to a minimum.",
    ],
    includes: [
      "Underground and above-ground tank installation",
      "Excavation, backfill and concrete works",
      "Tank and dispenser sumps",
      "Fuel lines, valves and submersible pumps",
      "Dispenser installation and servicing",
      "Forecourt upgrades and island rebuilds",
    ],
    idealFor: ["Service stations and fuel retailers", "Fleet and logistics depots", "Industrial and mining sites", "Main contractors building new forecourts"],
    pricingFactors: [
      "New installation, upgrade or maintenance work",
      "Number and size of tanks and dispensers",
      "Excavation and ground conditions",
      "Pipework lengths and equipment specified",
      "Whether the site stays operational during the work",
    ],
    prefillService: "Fuel storage installation",
    image: "underground-tanks-excavation-commercial",
    faqs: [
      {
        question: "Can you work while our site stays open?",
        answer:
          "Often, yes. We phase the work and plan barricading and access so that part of the site can keep trading. Tell us your operating requirements when you enquire.",
      },
      {
        question: "Do you service existing dispensers and pipework?",
        answer:
          "Yes. We maintain and repair dispensers, sumps, valves and fuel lines on existing sites, as well as installing new systems.",
      },
    ],
  },
  {
    slug: "fuel-infrastructure-decommissioning",
    category: "fuel-storage-energy-infrastructure",
    name: "Safe Decommissioning of Fuel Infrastructure",
    h1: "Safe Decommissioning of Fuel Tanks and Dispensing Equipment",
    seoTitle: "Fuel Tank & Dispenser Decommissioning",
    seoDescription:
      "Safe decommissioning of fuel storage tanks, pipework and dispensers: isolation, product removal, making safe, removal and site reinstatement, carefully planned.",
    intro: [
      "When a tank, dispenser or whole fuel site reaches the end of its life, it has to be taken out of service safely. We plan the work step by step: isolating the system, removing remaining product, making tanks and lines safe, then dismantling, lifting out and removing the equipment.",
      "We then reinstate the area — backfilling, concrete and paving — or prepare it for a new installation. Where specialist services or permits are required, we coordinate them as part of the programme.",
    ],
    includes: [
      "Site assessment and method planning",
      "Isolation of tanks, lines and dispensers",
      "Product removal and making safe",
      "Dismantling and removal of tanks and dispensers",
      "Removal of redundant pipework and sumps",
      "Backfilling, concrete and site reinstatement",
    ],
    idealFor: ["Sites closing or relocating fuel storage", "Forecourt upgrades replacing old equipment", "Property redevelopment", "Industrial sites removing redundant tanks"],
    pricingFactors: [
      "Number, size and type of tanks",
      "Above-ground or underground installation",
      "Condition of the equipment and site",
      "Reinstatement or re-use of the area",
      "Specialist services and permits required",
    ],
    prefillService: "Tank and dispenser decommissioning",
    image: null,
    faqs: [
      {
        question: "Can you decommission and install new equipment in one project?",
        answer:
          "Yes. We can remove the old tanks and dispensers and install the replacements as one planned project, which shortens the time the site is out of action.",
      },
      {
        question: "What do you need from us to quote?",
        answer:
          "The number and size of tanks, whether they are above or below ground, any drawings or site records, and photos of the equipment. We will advise if a site visit is needed.",
      },
    ],
  },
  {
    slug: "renewable-energy-mechanical-installations",
    category: "fuel-storage-energy-infrastructure",
    name: "Renewable Energy Mechanical Installations",
    h1: "Renewable Energy Mechanical Installations",
    seoTitle: "Solar Mounting & Renewable Energy Installations",
    seoDescription:
      "Mechanical installation for renewable energy projects: solar panel mounting structures, ground and roof mounts, support steelwork and equipment bases, with qualified electricians.",
    intro: [
      "Renewable energy systems need solid mechanical work underneath them. We install solar mounting structures on roofs and on the ground, fabricate support steelwork and frames, cast equipment bases and fit cable support systems.",
      "All electrical work, from wiring and connections to compliance certification, is carried out by qualified electricians we consult and coordinate with. You get one contractor managing the job, with each part done by the right qualified person.",
    ],
    includes: [
      "Roof-mounted solar panel structures",
      "Ground-mounted solar frames and footings",
      "Fabricated support steelwork and frames",
      "Concrete bases for equipment",
      "Cable trays and support systems",
      "Coordination with qualified electricians",
    ],
    idealFor: ["Homeowners adding solar", "Commercial and industrial rooftops", "Farms and remote sites", "Contractors needing a mechanical installation team"],
    pricingFactors: [
      "Number of panels and system layout",
      "Roof type or ground conditions",
      "Mounting system and steelwork required",
      "Access and working at height",
      "Scope of electrical work by the electrician",
    ],
    prefillService: "Renewable energy mechanical installations",
    image: null,
    icon: "solar-panel",
    faqs: [
      {
        question: "Do you do the electrical work as well?",
        answer:
          "Electrical work is done by qualified electricians we consult and coordinate with, including the required electrical certification. We handle the mechanical installation and manage the project as a whole.",
      },
      {
        question: "Can you fabricate custom mounting frames?",
        answer:
          "Yes. With our welding and steel fabrication workshop we can make custom frames and support steelwork where a standard mounting system doesn't suit the site.",
      },
    ],
  },

  // ---------------- Carpentry ----------------
  {
    slug: "wooden-decking",
    category: "carpentry-woodwork",
    name: "Wooden Decking & Pergolas",
    h1: "Wooden Decking Installation & Pergolas",
    seoTitle: "Wooden Decking Installation in South Africa",
    seoDescription:
      "Wooden decking installation across South Africa: pool decks, garden decks, tree decks, timber steps and pergolas built to last. Deck repairs and refinishing too.",
    intro: [
      "A well-built deck extends your living space outdoors. We build pool decks, raised garden decks, decks around trees and timber steps — with solid substructures and properly spaced, fixed boards.",
      "We also build pergolas and timber structures, and repair or refinish existing decks.",
    ],
    includes: ["Pool decks", "Garden and patio decks", "Tree decks and seating", "Timber garden steps", "Pergolas", "Deck repairs and refinishing"],
    idealFor: ["Homeowners", "Guest houses and hospitality", "Complexes and estates"],
    pricingFactors: ["Deck area and height", "Timber type", "Substructure and footings", "Steps, balustrades and extras"],
    prefillService: "Wooden decking",
    image: "hardwood-pool-deck",
    faqs: [
      {
        question: "How much does a wooden deck cost?",
        answer:
          "Cost depends on the size, height, timber type and any steps or balustrades. Send us the rough dimensions and photos of the area for a quotation.",
      },
    ],
  },
  {
    slug: "kitchen-cupboards-wardrobes",
    category: "carpentry-woodwork",
    name: "Kitchen Cupboards & Built-in Wardrobes",
    h1: "Custom Kitchen Cupboards & Built-in Wardrobes",
    seoTitle: "Kitchen Cupboards & Built-in Wardrobes",
    seoDescription:
      "Custom kitchen cupboards, built-in wardrobes, shelving and storage made to measure across South Africa. Installation, repairs and cupboard upgrades.",
    intro: [
      "Made-to-measure cupboards make the most of your space. We design, build and install kitchen units, built-in wardrobes, shelving and custom storage to suit your room and budget.",
      "We can also repair or upgrade existing cupboards — new doors, hinges, shelves and worktops.",
    ],
    includes: ["Kitchen cupboards", "Built-in wardrobes", "Shelving and storage", "Office and commercial cabinetry", "Cupboard repairs", "Wooden doors"],
    idealFor: ["Homeowners renovating", "Landlords upgrading rentals", "Offices and shops"],
    pricingFactors: ["Size and layout", "Board and finish selection", "Hardware (hinges, runners, handles)", "Worktops"],
    prefillService: "Kitchen cupboards",
    image: null,
    faqs: [
      {
        question: "Can you replace just the doors on my cupboards?",
        answer: "Yes, if the carcasses are in good condition, replacing doors and hardware is a cost-effective upgrade.",
      },
    ],
  },

  // ---------------- Maintenance ----------------
  {
    slug: "handyman-services",
    category: "property-maintenance-handyman",
    name: "Handyman Services",
    h1: "Handyman Services for Homes, Rentals & Businesses",
    seoTitle: "Handyman Services South Africa – Home Repairs",
    seoDescription:
      "Reliable handyman services across South Africa: home repairs, door, window and gate repairs, painting, tiling, fixture installations and general property maintenance.",
    intro: [
      "One call for the repairs that keep piling up. We fix doors, windows and gates, patch and paint, replace tiles, install fixtures and handle general maintenance tasks around homes and businesses.",
      "Because our team also covers building, welding and carpentry, small jobs that turn out bigger than expected don't need a second contractor.",
    ],
    includes: ["Door and window repairs", "Gate repairs", "Painting and touch-ups", "Tiling and grouting", "Fixture installations", "Ceiling repairs"],
    idealFor: ["Homeowners", "Landlords between tenants", "Property managers", "Offices and shops"],
    pricingFactors: ["Number and type of tasks", "Materials required", "Access and location"],
    prefillService: "General handyman services",
    image: "timber-clad-steel-framed-door",
    faqs: [
      {
        question: "Do you charge a call-out fee?",
        answer: "Please ask when you contact us — it depends on the job and location. Sending photos first often lets us quote without a site visit.",
      },
    ],
  },
  {
    slug: "roof-repairs-waterproofing",
    category: "property-maintenance-handyman",
    name: "Roof Repairs & Waterproofing",
    h1: "Roof Repairs, Roof Cleaning & Waterproofing",
    seoTitle: "Roof Repairs & Waterproofing in South Africa",
    seoDescription:
      "Roof repairs, roof tile cleaning, waterproofing and leak repairs across South Africa for homes and commercial buildings. Request a quotation.",
    intro: [
      "Leaks, cracked tiles and dirty roofs shorten the life of a building. We repair roofs, pressure-clean tiled roofs, and apply waterproofing to stop water getting in.",
      "We assess where water is actually entering before recommending a repair, so you don't pay for work you don't need.",
    ],
    includes: ["Roof leak repairs", "Tile replacement", "Roof pressure cleaning", "Waterproofing", "Flashings and sealing", "Ceiling repairs after leaks"],
    idealFor: ["Homeowners", "Landlords and complexes", "Commercial buildings"],
    pricingFactors: ["Roof size and pitch", "Type of roof covering", "Extent of damage", "Access and safety equipment"],
    prefillService: "Roof repairs",
    image: "roof-tile-cleaning-maintenance",
    faqs: [
      {
        question: "Can you find where my roof is leaking?",
        answer:
          "Yes. We inspect the roof and ceiling to trace the source, then recommend the repair or waterproofing needed.",
      },
    ],
  },

  // ---------------- Renovations ----------------
  {
    slug: "bathroom-renovations",
    category: "renovations-property-improvements",
    name: "Bathroom Renovations",
    h1: "Bathroom Renovations",
    seoTitle: "Bathroom Renovations in South Africa",
    seoDescription:
      "Bathroom renovations across South Africa: strip-out, waterproofing, tiling, fixtures, cabinetry and finishing managed by one multi-trade team.",
    intro: [
      "A bathroom renovation involves building, waterproofing, tiling, carpentry and finishing. We handle these trades ourselves, keeping the project coordinated and on track.",
      "Whether you want a full remodel or a refresh of tiles and fittings, we will help you plan the work and choose practical finishes.",
    ],
    includes: ["Strip-out and rubble removal", "Waterproofing", "Floor and wall tiling", "Vanities and cabinetry", "Fixture installation", "Ceilings and painting"],
    idealFor: ["Homeowners", "Landlords upgrading rentals", "Guest houses"],
    pricingFactors: ["Bathroom size", "Extent of the remodel", "Tiles, sanitaryware and fittings selected", "Plumbing changes"],
    prefillService: "Bathroom renovations",
    image: null,
    faqs: [
      {
        question: "How long does a bathroom renovation take?",
        answer: "It depends on the scope and finishes. We will give you an estimated timeline with your quotation.",
      },
    ],
  },
  {
    slug: "kitchen-renovations",
    category: "renovations-property-improvements",
    name: "Kitchen Renovations",
    h1: "Kitchen Renovations",
    seoTitle: "Kitchen Renovations in South Africa",
    seoDescription:
      "Kitchen renovations across South Africa: custom cupboards, worktops, tiling, flooring, ceilings and finishing — planned and built by one contractor.",
    intro: [
      "We renovate kitchens end to end — removing old units, making building alterations, then installing custom cupboards, worktops, tiling, flooring and ceilings.",
      "With carpentry and building under one roof, your new kitchen is built to fit the space properly.",
    ],
    includes: ["Strip-out", "Building alterations", "Custom kitchen cupboards", "Worktops", "Tiling and flooring", "Ceilings and finishing"],
    idealFor: ["Homeowners", "Landlords", "Offices and staff kitchens"],
    pricingFactors: ["Kitchen size and layout", "Cupboard materials and hardware", "Worktop selection", "Building or electrical changes"],
    prefillService: "Kitchen renovations",
    image: null,
    faqs: [
      {
        question: "Can I keep using my kitchen during the renovation?",
        answer: "Usually not fully, but we plan the sequence of work to keep the disruption period as short as possible.",
      },
    ],
  },
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getServicePage(category: string, slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.category === category && p.slug === slug);
}

export function servicePagesFor(category: CategorySlug): ServicePage[] {
  return servicePages.filter((p) => p.category === category);
}

export function categoryHref(slug: CategorySlug) {
  return `/services/${slug}`;
}

export function servicePageHref(page: Pick<ServicePage, "category" | "slug">) {
  return `/services/${page.category}/${page.slug}`;
}

export function quoteHref(category?: CategorySlug, service?: string) {
  const params = new URLSearchParams();
  if (category) params.set("service", category);
  if (service) params.set("item", service);
  const qs = params.toString();
  return `/contact${qs ? `?${qs}` : ""}#quote`;
}
