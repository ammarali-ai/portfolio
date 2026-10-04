import type { NavItem, Profile } from "./schema";

export const profile: Profile = {
  name: "Muhammad Ammar Ali",
  roles: [
    "AI Engineer",
    "AI Automation Engineer",
    "ML Engineer",
    "NLP Engineer",
    "Full-Stack AI Engineer",
  ],
  location: "Lahore, Pakistan",
  email: "muhammadammaralibhutta@gmail.com",
  links: {
    github: "https://github.com/ammarali-ai",
    linkedin: "https://www.linkedin.com/in/ammar-ali-ai",
  },
  summary:
    "AI and machine-learning engineer with a BS in Artificial Intelligence and 2+ years across ML, AI automation and software. I build LLM-powered automation with n8n and the Claude API, and train NLP and computer-vision models, from data cleaning to deployment.",
  // TODO: confirm availability wording (or set to null to hide the badge).
  availability: "Open to AI engineering roles",
  photo: {
    src: "/img/me.png",
    alt: "Muhammad Ammar Ali in a yellow polo shirt, standing outdoors in front of green trees",
  },
  // Public copy of the resume with the phone number removed (see README → "Resume PDF").
  resumeUrl: "/Muhammad-Ammar-Ali-Resume.pdf",
};

export const siteNav: readonly NavItem[] = [
  { label: "Domains", href: "/#domains" },
  { label: "Projects", href: "/#projects" },
  { label: "Automation", href: "/#automation" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/#contact" },
];
