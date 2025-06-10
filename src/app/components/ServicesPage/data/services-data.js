import {
  Globe,
  Search,
  Video,
  BarChart2,
  PenTool,
  FileText,
  Lightbulb,
  ClipboardList,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  LineChart,
  MessageSquare,
} from "lucide-react"

export const services = [
  {
    id: "website-development",
    title: "Website Development",
    icon: <Globe className="w-6 h-6" />,
    description:
      "Create stunning, responsive websites that drive engagement and conversions with modern design and robust functionality.",
    longDescription:
      "Our expert developers create custom websites that are not only visually stunning but also functionally powerful. We focus on responsive design, fast loading times, and intuitive user experiences.",
    features: [
      "Custom design and development",
      "Responsive for all devices",
      "SEO-friendly architecture",
      "Content management systems",
      "E-commerce solutions",
      "Website maintenance and support",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    icon: <Search className="w-6 h-6" />,
    description:
      "Boost your search rankings and drive organic traffic with our data-driven SEO strategies and proven techniques.",
    longDescription:
      "Our comprehensive SEO services are designed to improve your website's visibility in search engine results pages. We use data-driven strategies to help your business rank higher and attract more qualified leads.",
    features: [
      "Keyword research and analysis",
      "On-page and off-page optimization",
      "Technical SEO audits",
      "Content strategy for SEO",
      "Local SEO for businesses",
      "Regular performance reporting",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "video-editing",
    title: "Video Production",
    icon: <Video className="w-6 h-6" />,
    description:
      "Transform your ideas into compelling visual stories with professional video editing and motion graphics.",
    longDescription:
      "Our video editing services help you create professional, engaging videos that capture your audience's attention. From promotional videos to social media content, we deliver high-quality results.",
    features: [
      "Professional video editing",
      "Motion graphics and animations",
      "Color grading and correction",
      "Sound design and audio mixing",
      "Video optimization for different platforms",
      "Custom intros and outros",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <BarChart2 className="w-6 h-6" />,
    description:
      "Grow your business with comprehensive digital marketing strategies that deliver measurable results and ROI.",
    longDescription:
      "Our digital marketing services help you reach your target audience, build brand awareness, and drive conversions. We create customized strategies that align with your business goals and deliver measurable results.",
    features: [
      "Social media marketing",
      "Email marketing campaigns",
      "Content marketing strategy",
      "PPC and display advertising",
      "Analytics and performance tracking",
      "Conversion rate optimization",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "graphics-designing",
    title: "Brand Design",
    icon: <PenTool className="w-6 h-6" />,
    description:
      "Create a memorable brand identity with stunning graphics and visual designs that resonate with your audience.",
    longDescription:
      "Our graphic design services help you create a visual identity that resonates with your audience. From logos to marketing materials, we deliver designs that make your brand stand out.",
    features: [
      "Logo design and branding",
      "Print and digital media design",
      "UI/UX design for websites and apps",
      "Social media graphics",
      "Packaging design",
      "Illustration and infographics",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "content-writing",
    title: "Content Creation",
    icon: <FileText className="w-6 h-6" />,
    description:
      "Engage your audience with compelling, SEO-optimized content that drives traffic and converts visitors into customers.",
    longDescription:
      "Our content writing services help you create compelling, SEO-friendly content that engages your audience and drives action. From blog posts to website copy, we deliver content that converts.",
    features: [
      "Website copy and landing pages",
      "Blog posts and articles",
      "Email newsletters",
      "Product descriptions",
      "SEO content creation",
      "Social media content",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export const processSteps = [
  {
    number: 1,
    title: "Discovery",
    icon: <Lightbulb className="w-5 h-5" />,
    description: [
      "Initial consultation and requirements gathering",
      "Understanding your business goals",
      "Defining project scope and objectives",
    ],
  },
  {
    number: 2,
    title: "Strategy",
    icon: <ClipboardList className="w-5 h-5" />,
    description: [
      "Comprehensive strategy development",
      "Timeline and milestone planning",
      "Resource allocation and budgeting",
    ],
  },
  {
    number: 3,
    title: "Design",
    icon: <Palette className="w-5 h-5" />,
    description: ["Creative concept development", "Detailed design and prototyping", "Client feedback and refinement"],
  },
  {
    number: 4,
    title: "Development",
    icon: <Code className="w-5 h-5" />,
    description: ["Implementation and development", "Quality assurance testing", "Performance optimization"],
  },
  {
    number: 5,
    title: "Testing",
    icon: <CheckCircle className="w-5 h-5" />,
    description: ["Comprehensive quality testing", "Cross-platform compatibility", "User acceptance testing"],
  },
  {
    number: 6,
    title: "Launch",
    icon: <Rocket className="w-5 h-5" />,
    description: ["Deployment and go-live", "Training and documentation", "Initial performance monitoring"],
  },
  {
    number: 7,
    title: "Monitor",
    icon: <LineChart className="w-5 h-5" />,
    description: ["Ongoing performance monitoring", "Analytics and reporting", "Continuous optimization"],
  },
  {
    number: 8,
    title: "Support",
    icon: <MessageSquare className="w-5 h-5" />,
    description: ["Ongoing support and maintenance", "Regular updates and improvements", "Long-term partnership"],
  },
]

export const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    content:
      "Working with this team has been transformative for our business. Their website development and SEO services helped us increase our online visibility by 200% in just 3 months.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Michael Chen",
    position: "Marketing Director, GrowthHub",
    content:
      "The digital marketing strategy they developed for us exceeded all expectations. We've seen a 45% increase in conversions and our social media engagement has never been higher.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    position: "Founder, Artisan Crafts",
    content:
      "Their graphic design work completely transformed our brand identity. Our customers love our new look, and we've seen a significant increase in brand recognition and customer loyalty.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "David Thompson",
    position: "Content Manager, EduLearn",
    content:
      "The content writing team delivered exceptional work for our educational platform. The content is engaging, informative, and has helped us establish ourselves as thought leaders in our industry.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
  },
]

export const stats = [
  { value: "250+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "40+", label: "Industry Awards" },
]
