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
  id: "website-handling",
  title: "Website Handling & Management",
  icon: <Search className="w-6 h-6" />,
  description:
    "Experienced in managing websites, uploading and updating products, and keeping content organized across different platforms.",
  longDescription:
    "I have worked on website management tasks such as uploading products, updating descriptions, and keeping catalogs organized. Recently, I handled product updates for a pharmacy WordPress website, and before that, I managed my own e-commerce site with 1,000+ products. These projects gave me hands-on experience in keeping websites accurate, user-friendly, and up to date.",
  features: [
    "Product uploads and updates",
    "Organizing categories and catalogs",
    "Basic SEO-friendly descriptions",
    "Image and media handling",
    "Inventory and stock updates",
    "Website content maintenance",
  ],
  image: "/placeholder.svg?height=400&width=600",
}
,
 {
  id: "video-editing",
  title: "Video Editing",
  icon: <Video className="w-6 h-6" />,
  description:
    "Edit your raw footage into polished, engaging videos using industry-standard tools like Premiere Pro and CapCut.",
  longDescription:
    "We specialize in professional video editing with Adobe Premiere Pro and CapCut, delivering content that’s optimized for YouTube, TikTok, Instagram, and other platforms. From cinematic edits to short-form viral content, we craft videos that connect with your audience.",
  features: [
    "Professional editing with Premiere Pro",
    "Quick edits and trendy cuts using CapCut",
    "Motion graphics and smooth transitions",
    "Color correction and cinematic grading",
    "Background music, sound effects, and audio mixing",
    "Platform-optimized exports (YouTube, TikTok, Instagram, etc.)",
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
