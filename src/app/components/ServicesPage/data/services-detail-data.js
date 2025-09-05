import {
  Globe,
  Target,
  Layers,
  Code,
  Rocket,
  Search,
  BarChart,
  TrendingUp,
  Video,
  Play,
  Edit,
  Camera,
  BarChart2,
  PenTool,
  Palette,
  ImageIcon,
  FileText,
  Feather,
} from "lucide-react"

export const servicesData = [
  {
    id: "website-development",
    title: "Website Development",
    icon: <Globe className="w-8 h-8" />,
    description:
      "Create stunning, responsive websites that drive engagement and conversions with modern design and robust functionality.",
    longDescription:
      "We create custom websites that are not only visually stunning but also functionally powerful. We focus on responsive design, fast loading times, and intuitive user experiences that convert visitors into customers.",
    features: [
      "Custom design and development",
      "Responsive for all devices",
      "SEO-friendly architecture",
      "Content management systems",
      "E-commerce solutions",
      "Website maintenance and support",
    ],
    technologies: [
      "HTML5, CSS3, JavaScript",
      "React, Next.js, Vue.js",
      "Node.js, Express",
      "WordPress",
      "MongoDB, SQL",
    ],
    benefits: [
      "Increased online visibility",
      "Better user experience",
      "Higher conversion rates",
      "Improved brand credibility",
      "Mobile-friendly experience",
      "24/7 online presence",
    ],
    process: [
      {
        title: "Discovery & Planning",
        description:
          "We start by understanding your business goals, target audience, and requirements to create a detailed project plan.",
        icon: <Target className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Design & Prototyping",
        description:
          "Our designers create wireframes and visual designs for your approval before moving to development.",
        icon: <Layers className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Development & Testing",
        description:
          "We build your website using modern technologies and thoroughly test it across devices and browsers.",
        icon: <Code className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Launch & Support",
        description: "After final approval, we launch your website and provide ongoing support and maintenance.",
        icon: <Rocket className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
    {
  title: "AI SEO Optimization Tool",
  description: "Developed an AI-powered SEO optimization tool using Python Flask and PostgreSQL to analyze content, suggest improvements, and enhance search engine rankings.",
  image: "/websitecase2.png",
},
{
  title: "Food Ordering App",
  description: "Built a full-stack food ordering application with the MERN stack, enabling real-time order management, secure authentication, and a smooth user experience.",
  image: "/websitecase.png",
},

    ],
    testimonials: [
      {
        name: "John Smith",
        position: "CEO, TechStart Inc.",
        content:
          "The website they developed for us exceeded our expectations. It&apos;s not only visually stunning but also performs exceptionally well. Our conversion rate has increased by 35% since launch.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "Lisa Johnson",
        position: "Marketing Director, GrowthHub",
        content:
          "Working with this team was a pleasure from start to finish. They understood our vision and translated it into a website that perfectly represents our brand. Highly recommended!",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "98%", label: "Client Satisfaction" },
      { value: "45%", label: "Avg. Conversion Increase" },
      { value: "20+", label: "Websites Launched" },
      { value: "3s", label: "Avg. Load Time" },
    ],
    faq: [
      {
        question: "How long does it take to develop a website?",
        answer:
          "The timeline for website development varies depending on the complexity of the project. A simple website can be completed in 2-4 weeks, while more complex projects may take 2-3 months or more. We&apos;ll provide you with a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes, we offer ongoing website maintenance services to ensure your website remains secure, up-to-date, and performing optimally. Our maintenance packages include regular updates, security monitoring, performance optimization, and technical support.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "We specialize in website redesigns that improve both aesthetics and functionality. We&apos;ll analyze your current website, identify areas for improvement, and create a modern, user-friendly design that aligns with your brand and business goals.",
      },
      {
        question: "Do you build e-commerce websites?",
        answer:
          "Yes, we have extensive experience building e-commerce websites on platforms like Shopify, WooCommerce, and custom solutions. We can help you create a seamless shopping experience with secure payment processing, inventory management, and more.",
      },
    ],
    image: "/website.jpg",
  },
{
  id: "website-handling",
  title: "Website Handling & Product Management",
  icon: <Search className="w-8 h-8" />,
  description:
    "Experienced in managing websites and handling products, including uploads, updates, and organization across e-commerce and WordPress platforms.",
  longDescription:
    "I have hands-on experience managing websites, including handling product catalogs, uploading and updating items, and ensuring smooth operations. Recently, I worked on a pharmacy WordPress website where I managed product listings, descriptions, and updates. Before that, I managed my own e-commerce store with over 1,000 products, which gave me strong experience in organizing, optimizing, and maintaining product data effectively.",
  features: [
    "Product uploads and updates",
    "Content and catalog management",
    "Inventory organization",
    "Basic SEO-friendly product descriptions",
    "Image and media handling",
    "Website performance monitoring",
  ],
  technologies: [
    "WordPress (WooCommerce)",
    "Custom E-commerce CMS",
    "Shopify (basic knowledge)",
    "Google Analytics",
    "Excel/CSV product management",
  ],
  benefits: [
    "Smooth website operations",
    "Accurate and updated product listings",
    "Better user experience for customers",
    "Time-saving bulk product handling",
    "Experience with both small and large catalogs",
    "Ability to manage multiple platforms",
  ],
  process: [
    {
      title: "Understanding Requirements",
      description:
        "Review the type of products and structure of the website to plan an organized catalog.",
      icon: <Search className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Product Uploads & Updates",
      description:
        "Add new products, update existing ones, and ensure proper categorization and details.",
      icon: <BarChart className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Website Management",
      description:
        "Keep the website updated with content, images, and smooth product navigation.",
      icon: <Code className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Monitoring & Maintenance",
      description:
        "Regularly check product accuracy, fix errors, and update stock or information as needed.",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
    },
  ],
  caseStudies: [
    {
      title: "Pharmacy WordPress Website",
      description:
        "Managed product uploads and updates for a pharmacy store, ensuring accurate and well-organized product listings.",
      image: "/webmang.png",
    },
    {
      title: "Personal E-commerce Store",
      description:
        "Handled 1,000+ products, including descriptions, pricing, and images, gaining strong experience in catalog management.",
      image: "/webmanag.webp",
    },
  ],
  testimonials: [
    {
      name: "Self Project",
      position: "E-commerce Practice",
      content:
        "Managing my own e-commerce store helped me build confidence in handling large product catalogs and improving efficiency.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Peer Feedback",
      position: "Website Owner",
      content:
        "Worked on a pharmacy website where I managed product updates. The website owner appreciated the organized handling and accuracy of listings.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ],
  stats: [
    { value: "1000+", label: "Products Managed" },
    { value: "8+", label: "Websites Handled" },
    { value: "95%", label: "Accuracy in Product Data" },
    { value: "100%", label: "Timely Updates" },
  ],
  faq: [
    {
      question: "What type of websites have you handled?",
      answer:
        "I have managed WordPress (WooCommerce) websites and a personal e-commerce store, focusing on product uploads and updates.",
    },
    {
      question: "Can you handle large product catalogs?",
      answer:
        "Yes, I have experience handling over 1,000 products, including bulk uploads, categorization, and updates.",
    },
    {
      question: "Do you only handle WordPress websites?",
      answer:
        "No, I have also worked on custom e-commerce websites and have basic knowledge of Shopify product management.",
    },
    {
      question: "What tasks can you manage on a website?",
      answer:
        "I can upload products, update information, organize categories, handle images, and ensure smooth product navigation for users.",
    },
  ],
  image: "/WebsiteManagement.jpg",
}
,
{
  id: "video-editing",
  title: "Video Editing",
  icon: <Video className="w-8 h-8" />,
  description:
    "Edit your raw footage into engaging, professional videos using Adobe Premiere Pro and CapCut.",
  longDescription:
    "Our video editing services specialize in turning raw clips into polished, platform-ready content. Whether you need cinematic storytelling, viral short-form edits, or professional promotional videos, we leverage Premiere Pro and CapCut to deliver high-quality results tailored to your audience.",
  features: [
    "Professional editing with Premiere Pro",
    "Quick, trendy edits using CapCut",
    "Motion graphics and smooth transitions",
    "Color correction and cinematic grading",
    "Sound design, music, and audio mixing",
    "Platform-optimized exports (YouTube, TikTok, Instagram, etc.)",
  ],
  technologies: [
    "Adobe Premiere Pro",
    "CapCut",
    "After Effects (for advanced motion graphics)",
    "DaVinci Resolve (for grading)",
    "Adobe Audition",
  ],
  benefits: [
    "High-quality and professional look",
    "Content tailored for social media platforms",
    "Increased engagement and viewer retention",
    "Faster editing turnaround with CapCut",
    "Better brand presentation and storytelling",
    "Videos optimized for conversions and growth",
  ],
  process: [
    {
      title: "Content Planning",
      description:
        "We discuss your goals, audience, and content style (long-form or short-form) to create a clear editing plan.",
      icon: <Target className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Footage Review",
      description:
        "We organize and review your raw clips to ensure the best moments are selected for editing.",
      icon: <Camera className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Editing & Enhancements",
      description:
        "Using Premiere Pro and CapCut, we craft your video with smooth cuts, transitions, graphics, and audio design.",
      icon: <Edit className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Export & Delivery",
      description:
        "After revisions, we deliver optimized versions for YouTube, TikTok, Instagram, and other platforms.",
      icon: <Play className="w-6 h-6 text-teal-600" />,
    },
  ],
  caseStudies: [
    {
      title: "TikTok Viral Campaign",
      description:
        "Edited a short-form series that gained over 1M views and boosted follower count by 200% in just 3 weeks.",
      image: "/tiktok.jpeg",
    },
    {
      title: "YouTube Channel Growth",
      description:
        "Helped a content creator achieve 50K subscribers with professional, consistent video editing and optimization.",
      image: "/video-editing-software.avif",
    },
  ],
  testimonials: [
    {
      name: "Robert Chen",
      position: "Marketing Director, Tech Innovations",
      content:
        "Their editing skills transformed our raw footage into a polished brand video. The final cut exceeded expectations and boosted our campaign performance.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Amanda Garcia",
      position: "Social Media Manager, Lifestyle Brand",
      content:
        "Our TikTok growth skyrocketed thanks to their CapCut edits. Videos consistently outperform our other content and engagement doubled within a month.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ],
  stats: [
    { value: "300+", label: "Videos Edited" },
    { value: "97%", label: "Client Satisfaction" },
    { value: "45%", label: "Avg. Engagement Increase" },
    { value: "10M+", label: "Total Views Generated" },
  ],
  faq: [
    {
      question: "What types of videos do you edit?",
      answer:
        "We edit YouTube vlogs, TikToks, Instagram Reels, promotional videos, corporate content, training videos, testimonials, and more—customized to your needs.",
    },
    {
      question: "How long does editing take?",
      answer:
        "Simple edits can be delivered in 1–3 days, while longer or more complex edits with effects may take 1–2 weeks. We provide clear timelines upfront.",
    },
    {
      question: "Do you work with both short and long-form content?",
      answer:
        "Yes! We edit everything from 15-second viral clips to 30-minute YouTube episodes, ensuring each format is optimized for its platform.",
    },
    {
      question: "Can you optimize videos for social platforms?",
      answer:
        "Absolutely. We export videos in multiple aspect ratios (16:9, 9:16, 1:1) and optimize length, resolution, and compression for TikTok, Instagram, YouTube, and more.",
    },
  ],
  image: "/videoEditing.jpg",
}]
