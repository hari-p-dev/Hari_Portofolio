// Centralized type definitions for the portfolio content model.

export interface Personal {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  portrait: string;
  resume: string;
}

export interface Positioning {
  headlineLines: string[];
  statement: string;
  introduction: string;
  /** Short first-person narrative bio (rendered under the About statement). */
  bio: string;
}

export interface SkillGroup {
  key: string;
  label: string;
  description: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  year: string;
  summary: string;
  points: string[];
  tech: string[];
}

export interface ProjectArchitectureNode {
  layer: string;
  tech: string;
}

export interface Project {
  index: string;
  name: string;
  kind: string;
  challenge: string;
  approach: string;
  role: string;
  features: string[];
  result?: string;
  tech: string[];
  architecture: ProjectArchitectureNode[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  image: string;
  date?: string;
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
  /** Optional external link (e.g. a published paper). */
  url?: string;
}

export interface StackLayer {
  id: string;
  label: string;
  caption: string;
  tech: string[];
}

export interface Links {
  github: string;
  linkedin: string;
  email: string;
}

export interface PortfolioData {
  personal: Personal;
  positioning: Positioning;
  skills: SkillGroup[];
  stackFlow: StackLayer[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  certificates: Certificate[];
  achievements: Achievement[];
  links: Links;
}
