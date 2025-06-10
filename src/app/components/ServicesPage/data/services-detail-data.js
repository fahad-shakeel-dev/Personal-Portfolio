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
      "Our expert developers create custom websites that are not only visually stunning but also functionally powerful. We focus on responsive design, fast loading times, and intuitive user experiences that convert visitors into customers.",
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
      "WordPress, Shopify",
      "MongoDB, PostgreSQL",
      "AWS, Vercel, Netlify",
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
        title: "E-commerce Redesign",
        description: "Increased sales by 45% through improved UX and mobile optimization",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Corporate Website Overhaul",
        description: "Reduced bounce rate by 30% and increased lead generation by 25%",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "John Smith",
        position: "CEO, TechStart Inc.",
        content:
          "The website they developed for us exceeded our expectations. It's not only visually stunning but also performs exceptionally well. Our conversion rate has increased by 35% since launch.",
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
      { value: "250+", label: "Websites Launched" },
      { value: "3s", label: "Avg. Load Time" },
    ],
    faq: [
      {
        question: "How long does it take to develop a website?",
        answer:
          "The timeline for website development varies depending on the complexity of the project. A simple website can be completed in 2-4 weeks, while more complex projects may take 2-3 months or more. We'll provide you with a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes, we offer ongoing website maintenance services to ensure your website remains secure, up-to-date, and performing optimally. Our maintenance packages include regular updates, security monitoring, performance optimization, and technical support.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "We specialize in website redesigns that improve both aesthetics and functionality. We'll analyze your current website, identify areas for improvement, and create a modern, user-friendly design that aligns with your brand and business goals.",
      },
      {
        question: "Do you build e-commerce websites?",
        answer:
          "Yes, we have extensive experience building e-commerce websites on platforms like Shopify, WooCommerce, and custom solutions. We can help you create a seamless shopping experience with secure payment processing, inventory management, and more.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    icon: <Search className="w-8 h-8" />,
    description:
      "Boost your search rankings and drive organic traffic with our data-driven SEO strategies and proven techniques.",
    longDescription:
      "Our comprehensive SEO services are designed to improve your website's visibility in search engine results pages. We use data-driven strategies, advanced analytics, and proven techniques to help your business rank higher and attract more qualified leads that convert into customers.",
    features: [
      "Comprehensive SEO audits",
      "Keyword research and analysis",
      "On-page optimization",
      "Technical SEO improvements",
      "Link building strategies",
      "Local SEO optimization",
    ],
    technologies: [
      "Google Analytics & Search Console",
      "SEMrush, Ahrefs, Moz",
      "Screaming Frog SEO Spider",
      "Google Tag Manager",
      "Schema Markup Tools",
      "PageSpeed Insights",
    ],
    benefits: [
      "Higher search engine rankings",
      "Increased organic traffic",
      "Better quality leads",
      "Improved user experience",
      "Enhanced brand visibility",
      "Long-term sustainable results",
    ],
    process: [
      {
        title: "SEO Audit & Analysis",
        description:
          "We conduct a comprehensive audit of your website and analyze your competitors to identify opportunities.",
        icon: <Search className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Strategy Development",
        description: "Based on our findings, we create a customized SEO strategy tailored to your business goals.",
        icon: <BarChart className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Implementation",
        description:
          "We implement on-page and off-page optimizations to improve your website's search engine visibility.",
        icon: <Code className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Monitoring & Optimization",
        description: "We continuously monitor your performance and refine our strategy to ensure optimal results.",
        icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
      {
        title: "Local Business SEO Success",
        description:
          "Achieved first page rankings for 15 target keywords in 3 months, increasing local visibility by 200%",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "E-commerce SEO Campaign",
        description: "Increased organic traffic by 85% and conversions by 40% in 6 months for online retailer",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "Michael Brown",
        position: "Owner, Local Plumbing Co.",
        content:
          "Their SEO services transformed our business. We're now ranking for all our target keywords and getting consistent leads through our website. The ROI has been incredible - we've seen a 300% increase in online inquiries.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "Sarah Williams",
        position: "E-commerce Manager, Fashion Boutique",
        content:
          "The SEO team delivered exceptional results for our online store. Our organic traffic has doubled, and we're seeing a significant increase in sales from search engine visitors. Their monthly reports are detailed and easy to understand.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "85%", label: "Avg. Traffic Increase" },
      { value: "65%", label: "First Page Rankings" },
      { value: "150+", label: "SEO Projects" },
      { value: "40%", label: "Avg. Conversion Growth" },
    ],
    faq: [
      {
        question: "How long does it take to see results from SEO?",
        answer:
          "SEO is a long-term strategy, and results typically take time to materialize. You may start seeing initial improvements in 3-6 months, but significant results often take 6-12 months. The timeline depends on factors like your industry competition, website history, and the scope of optimization needed.",
      },
      {
        question: "What's the difference between on-page and off-page SEO?",
        answer:
          "On-page SEO involves optimizing elements on your website, such as content, meta tags, headings, and site structure. Off-page SEO focuses on external factors like backlinks, social signals, and online mentions that improve your site's authority and reputation in the eyes of search engines.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "We don't guarantee specific rankings because search algorithms are constantly changing and influenced by many factors outside our control. However, we do guarantee that we'll use industry best practices and proven strategies to improve your rankings and organic traffic over time.",
      },
      {
        question: "How do you measure SEO success?",
        answer:
          "We track multiple metrics to measure SEO success, including organic traffic growth, keyword rankings, conversion rates, bounce rates, and return on investment. We provide regular reports that show your progress and the impact of our SEO efforts on your business goals.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "video-editing",
    title: "Video Production",
    icon: <Video className="w-8 h-8" />,
    description:
      "Transform your ideas into compelling visual stories with professional video editing and motion graphics.",
    longDescription:
      "Our video production services help you create professional, engaging videos that capture your audience's attention and drive action. From concept to final delivery, we handle every aspect of video creation including filming, editing, motion graphics, and optimization for various platforms.",
    features: [
      "Professional video editing",
      "Motion graphics and animations",
      "Color grading and correction",
      "Sound design and audio mixing",
      "Video optimization for platforms",
      "Custom intros and outros",
    ],
    technologies: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Final Cut Pro",
      "Cinema 4D",
      "Adobe Audition",
    ],
    benefits: [
      "Increased engagement rates",
      "Professional brand image",
      "Higher conversion rates",
      "Better social media performance",
      "Improved message delivery",
      "Memorable brand experiences",
    ],
    process: [
      {
        title: "Concept & Planning",
        description: "We discuss your vision, goals, and target audience to develop a clear concept for your video.",
        icon: <Target className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Production & Filming",
        description:
          "We handle all aspects of video production, from scripting to filming with professional equipment.",
        icon: <Camera className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Editing & Enhancement",
        description:
          "Our editors create compelling narratives, adding graphics, music, and effects to enhance your message.",
        icon: <Edit className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Finalization & Delivery",
        description:
          "After your feedback and revisions, we finalize the video and deliver it in your preferred formats.",
        icon: <Play className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
      {
        title: "Product Launch Campaign",
        description: "Generated 250,000 views and 15,000 website visits in the first week with viral product video",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Corporate Training Series",
        description:
          "Reduced training costs by 35% while improving information retention through engaging video content",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "Robert Chen",
        position: "Marketing Director, Tech Innovations",
        content:
          "The video production team transformed our raw footage into a compelling story that resonated with our audience. The quality and creativity exceeded our expectations, and the final video helped us secure major partnerships.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "Amanda Garcia",
        position: "Social Media Manager, Lifestyle Brand",
        content:
          "Their video editing services have been instrumental in our social media success. The videos they produce consistently outperform our other content in terms of engagement and conversions. Our follower growth has increased by 150%.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "500+", label: "Videos Produced" },
      { value: "95%", label: "Client Satisfaction" },
      { value: "40%", label: "Avg. Engagement Increase" },
      { value: "12M+", label: "Total Views Generated" },
    ],
    faq: [
      {
        question: "What types of videos do you produce?",
        answer:
          "We produce a wide range of videos, including promotional videos, social media content, product demonstrations, corporate videos, event coverage, training videos, testimonials, explainer videos, and animated content. Our team has experience with various styles and formats to suit your specific needs.",
      },
      {
        question: "How long does video production take?",
        answer:
          "The timeline for video production depends on the complexity and length of the project. Simple edits can be completed in a few days, while more complex projects with animations and special effects may take 1-2 weeks or more. We'll provide you with a specific timeline based on your project requirements.",
      },
      {
        question: "Do you provide filming services?",
        answer:
          "Yes, we offer professional videography services to capture high-quality footage for your projects. Our team can handle everything from planning and storyboarding to filming and post-production editing, ensuring a seamless process from start to finish.",
      },
      {
        question: "Can you optimize videos for different platforms?",
        answer:
          "We optimize videos for various platforms, including YouTube, Instagram, Facebook, TikTok, LinkedIn, and websites. This includes adjusting aspect ratios, durations, formats, and compression settings to ensure optimal performance and engagement on each platform.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <BarChart2 className="w-8 h-8" />,
    description:
      "Grow your business with comprehensive digital marketing strategies that deliver measurable results and ROI.",
    longDescription:
      "Our digital marketing services help you reach your target audience, build brand awareness, and drive conversions across all digital channels. We create data-driven, customized strategies that align with your business goals and deliver measurable results that grow your bottom line.",
    features: [
      "Social media marketing",
      "Email marketing campaigns",
      "Content marketing strategy",
      "PPC and display advertising",
      "Marketing automation",
      "Analytics and reporting",
    ],
    technologies: [
      "Google Ads & Analytics",
      "Facebook Ads Manager",
      "HubSpot, Mailchimp",
      "Hootsuite, Buffer",
      "SEMrush, Ahrefs",
      "Hotjar, Optimizely",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher conversion rates",
      "Better ROI on marketing spend",
      "Targeted audience reach",
      "Data-driven decision making",
      "Scalable marketing campaigns",
    ],
    process: [
      {
        title: "Research & Analysis",
        description:
          "We analyze your business, competitors, and target audience to identify opportunities and challenges.",
        icon: <Search className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Strategy Development",
        description: "We create a comprehensive marketing strategy with clear goals, tactics, and success metrics.",
        icon: <Target className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Campaign Execution",
        description: "We implement and manage your marketing campaigns across relevant channels and platforms.",
        icon: <Rocket className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Optimization & Scaling",
        description: "We continuously monitor, optimize, and scale successful campaigns for maximum ROI and growth.",
        icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
      {
        title: "Multi-channel Campaign Success",
        description: "Achieved 320% ROI with integrated social, email, and PPC strategy for B2B software company",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Lead Generation Campaign",
        description: "Generated 150 qualified leads per month at 40% lower cost per acquisition for consulting firm",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "Jennifer Lee",
        position: "CEO, E-commerce Brand",
        content:
          "Their digital marketing expertise has been transformative for our business. They developed a strategy that significantly increased our online visibility and sales while reducing our overall marketing costs. Our revenue has grown by 180% in just one year.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "David Wilson",
        position: "Director of Sales, B2B Software",
        content:
          "The lead generation campaigns they created for us have consistently delivered high-quality leads that convert. Their data-driven approach and continuous optimization have made a real difference to our bottom line. We've shortened our sales cycle by 30%.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "320%", label: "Avg. ROI" },
      { value: "200+", label: "Active Campaigns" },
      { value: "45%", label: "Avg. Conversion Increase" },
      { value: "65%", label: "Cost Reduction" },
    ],
    faq: [
      {
        question: "What digital marketing services do you offer?",
        answer:
          "We offer a comprehensive range of digital marketing services, including social media marketing, email marketing, content marketing, search engine marketing (SEM), pay-per-click (PPC) advertising, display advertising, influencer marketing, marketing automation, and conversion rate optimization (CRO).",
      },
      {
        question: "How do you measure the success of digital marketing campaigns?",
        answer:
          "We track key performance indicators (KPIs) aligned with your business goals, such as website traffic, conversion rates, lead generation, sales, return on ad spend (ROAS), cost per acquisition (CPA), and customer lifetime value (CLV). We provide regular reports with insights and recommendations for improvement.",
      },
      {
        question: "Do you offer customized marketing strategies?",
        answer:
          "Yes, we create fully customized marketing strategies based on your specific business goals, target audience, industry, budget, and competitive landscape. We don't believe in one-size-fits-all approaches and tailor our services to maximize your results and ROI.",
      },
      {
        question: "How often will I receive reports on my campaigns?",
        answer:
          "We provide detailed monthly reports on your campaign performance, along with insights and recommendations for optimization. For active campaigns, we also conduct weekly check-ins to discuss performance and make real-time adjustments as needed. You'll also have access to a dashboard for real-time monitoring.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "graphics-designing",
    title: "Brand Design",
    icon: <PenTool className="w-8 h-8" />,
    description:
      "Create a memorable brand identity with stunning graphics and visual designs that resonate with your audience.",
    longDescription:
      "Our graphic design services help you create a cohesive visual identity that resonates with your target audience and sets you apart from competitors. From logos to complete brand systems, we deliver designs that communicate your values, build trust, and drive business growth.",
    features: [
      "Logo design and branding",
      "Brand identity systems",
      "Print and digital design",
      "UI/UX design",
      "Packaging design",
      "Marketing materials",
    ],
    technologies: [
      "Adobe Creative Suite",
      "Figma, Sketch",
      "Procreate",
      "Affinity Designer",
      "Canva Pro",
      "InVision, Marvel",
    ],
    benefits: [
      "Consistent brand identity",
      "Improved brand recognition",
      "Enhanced user experience",
      "Better communication of ideas",
      "Professional brand image",
      "Increased customer trust",
    ],
    process: [
      {
        title: "Discovery & Research",
        description: "We learn about your brand, audience, and goals to inform our design approach and strategy.",
        icon: <Search className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Concept Development",
        description: "We create initial design concepts and mood boards based on our research and your requirements.",
        icon: <Palette className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Design & Refinement",
        description: "We develop and refine the designs based on your feedback until they perfectly match your vision.",
        icon: <PenTool className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Finalization & Guidelines",
        description:
          "We finalize the designs and create brand guidelines to ensure consistent application across all materials.",
        icon: <ImageIcon className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
      {
        title: "Complete Brand Identity Redesign",
        description: "Increased brand recognition by 60% and customer trust by 45% for established retail company",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Product Packaging Design",
        description: "Boosted retail sales by 35% through eye-catching packaging design for consumer goods brand",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "Emily Rodriguez",
        position: "Founder, Artisan Crafts",
        content:
          "Their graphic design work completely transformed our brand identity. Our customers love our new look, and we've seen a significant increase in brand recognition and customer loyalty. Sales have increased by 50% since the rebrand.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "Thomas Wright",
        position: "Marketing Manager, Retail Chain",
        content:
          "The packaging designs they created for our product line have made a huge difference in our retail sales. The attention to detail and creativity in their work is exceptional. Our products now stand out on the shelves and customers frequently compliment the design.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "1000+", label: "Design Projects" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "60%", label: "Avg. Brand Recognition Increase" },
      { value: "35%", label: "Avg. Sales Increase" },
    ],
    faq: [
      {
        question: "What graphic design services do you offer?",
        answer:
          "We offer a comprehensive range of graphic design services, including logo design, brand identity development, marketing materials, social media graphics, website and app UI/UX design, packaging design, print materials, illustrations, infographics, business cards, brochures, and complete brand guidelines.",
      },
      {
        question: "How does your design process work?",
        answer:
          "Our design process begins with understanding your brand, goals, and target audience through detailed discovery sessions. We then create concept designs and mood boards, refine them based on your feedback, and deliver the final designs along with comprehensive brand guidelines for consistent application.",
      },
      {
        question: "Do you provide brand guidelines?",
        answer:
          "Yes, we create comprehensive brand guidelines that include logo usage rules, color palettes, typography specifications, imagery style, tone of voice, and application examples. These guidelines ensure consistency across all your marketing materials and help maintain your brand identity as your business grows.",
      },
      {
        question: "What file formats will I receive for my designs?",
        answer:
          "We provide designs in all the formats you need for both digital and print applications. This typically includes vector files (AI, EPS, SVG), raster files (JPG, PNG), and PDF files. We also provide source files that you can edit or modify in the future, along with web-optimized versions for online use.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "content-writing",
    title: "Content Creation",
    icon: <FileText className="w-8 h-8" />,
    description:
      "Engage your audience with compelling, SEO-optimized content that drives traffic and converts visitors into customers.",
    longDescription:
      "Our content writing services help you create compelling, SEO-friendly content that engages your audience, builds authority, and drives action. From blog posts to website copy, we deliver content that not only ranks well in search engines but also converts visitors into loyal customers.",
    features: [
      "Website copy and landing pages",
      "Blog posts and articles",
      "Email newsletters",
      "Social media content",
      "Product descriptions",
      "Technical documentation",
    ],
    technologies: [
      "SEO tools (SEMrush, Ahrefs)",
      "Grammarly, Hemingway Editor",
      "WordPress, Ghost",
      "Google Docs, Notion",
      "Canva, Adobe Creative Suite",
      "Analytics and tracking tools",
    ],
    benefits: [
      "Improved search engine rankings",
      "Increased website traffic",
      "Higher engagement rates",
      "Better conversion rates",
      "Established thought leadership",
      "Consistent brand voice",
    ],
    process: [
      {
        title: "Research & Planning",
        description:
          "We research your industry, audience, and competitors to develop a comprehensive content strategy.",
        icon: <Search className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Content Creation",
        description: "Our expert writers create engaging, SEO-friendly content tailored to your brand voice and goals.",
        icon: <Feather className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Review & Optimization",
        description: "We review and optimize the content based on your feedback and SEO best practices.",
        icon: <Edit className="w-6 h-6 text-teal-600" />,
      },
      {
        title: "Publication & Analysis",
        description: "We help publish the content and analyze its performance to inform future content creation.",
        icon: <BarChart className="w-6 h-6 text-teal-600" />,
      },
    ],
    caseStudies: [
      {
        title: "Blog Content Strategy Success",
        description: "Increased organic traffic by 120% and lead generation by 45% in 6 months for SaaS company",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Website Copy Transformation",
        description: "Improved conversion rate by 25% and reduced bounce rate by 30% through strategic copywriting",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    testimonials: [
      {
        name: "Mark Johnson",
        position: "Content Manager, SaaS Company",
        content:
          "Their content writing team has been instrumental in establishing our blog as a thought leadership platform in our industry. The quality, consistency, and SEO performance of their content is outstanding. Our organic traffic has tripled in just 8 months.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
      {
        name: "Laura Thompson",
        position: "E-commerce Director, Retail Brand",
        content:
          "The product descriptions they've written for our online store have significantly improved our conversion rates. They have a talent for highlighting benefits and creating compelling copy that drives sales. Our average order value has increased by 20%.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
      },
    ],
    stats: [
      { value: "2M+", label: "Words Written" },
      { value: "120%", label: "Avg. Traffic Increase" },
      { value: "45%", label: "Avg. Conversion Growth" },
      { value: "500+", label: "Content Projects" },
    ],
    faq: [
      {
        question: "What types of content do you write?",
        answer:
          "We create a wide variety of content, including website copy, landing pages, blog posts, articles, email newsletters, social media content, product descriptions, case studies, whitepapers, ebooks, press releases, technical documentation, and marketing materials. All content is tailored to your brand voice and target audience.",
      },
      {
        question: "How do you ensure content is SEO-friendly?",
        answer:
          "We conduct thorough keyword research to identify relevant terms for your industry and target audience. We then strategically incorporate these keywords into the content while maintaining readability and engagement. We also optimize meta descriptions, headings, internal linking, and other on-page elements for maximum SEO impact.",
      },
      {
        question: "Do you offer content strategy services?",
        answer:
          "Yes, we provide comprehensive content strategy services that include audience analysis, competitor research, content audits, editorial calendar development, content gap analysis, and performance tracking. Our strategies are designed to align with your business goals and drive measurable results.",
      },
      {
        question: "How do you maintain consistency in brand voice?",
        answer:
          "We create detailed brand voice guidelines based on your company's personality, values, and target audience. These guidelines cover tone, style, messaging, and communication preferences. We ensure that all content, regardless of the writer or channel, maintains a consistent voice that reflects your brand identity and resonates with your audience.",
      },
    ],
    image: "/placeholder.svg?height=600&width=800",
  },
]
