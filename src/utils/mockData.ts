/**
 * Local mock data service.
 *
 * This module replaces any remote/backend data layer with an in-memory store
 * that is seeded from plain TypeScript arrays. Every read and write function is
 * asynchronous and mimics network latency using a `Promise` delay, so the
 * frontend loading states behave exactly as they would against a real API.
 */
import {
  researchProjects as seedResearchProjects,
  publications as seedPublications,
  newsItems as seedNewsItems,
  labMembers as seedLabMembers,
} from "@/data/labData";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ResearchProject {
  title: string;
  slug: string;
  status: "Active" | "Completed" | "In Planning";
  duration: string;
  team: string[];
  funding: string;
  description: string;
  longDescription: string;
  pubs: string;
  image: string;
}

export interface Publication {
  year: number;
  title: string;
  slug: string;
  authors: string;
  journal: string;
  doi: string;
  citations: number;
  featured: boolean;
  abstract: string;
  relatedProject: string;
}

export interface NewsItem {
  date: string;
  slug: string;
  category: string;
  title: string;
  text: string;
  fullText: string;
}

export interface TeamMember {
  name: string;
  role: string;
  education: string;
  research: string;
  bio?: string;
  email?: string;
  category: string;
  image: string;
}

export interface Alumnus {
  name: string;
  position: string;
  year: string;
}

// ---------------------------------------------------------------------------
// Seed data (standard TypeScript arrays)
// ---------------------------------------------------------------------------

const principalInvestigator: TeamMember = {
  name: "Dr. Elena Martinez",
  role: "Associate Professor, Dept. of Chemistry & Biochemistry",
  education: "PhD Computational Chemistry (Stanford, 2015), BS Chemistry (MIT, 2009)",
  research: "Machine learning for drug discovery, protein dynamics, molecular simulation methods",
  bio: "Dr. Martinez leads the Molecular Dynamics Lab with a focus on computational approaches to understand and predict protein-drug interactions. Her work has been recognized with the NSF CAREER Award and the ACS Division of Computers in Chemistry Young Investigator Award.",
  email: "e.martinez@university.edu",
  category: "PI",
  image: "https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=600",
};

const seedTeamMembers: TeamMember[] = [
  { name: "Dr. James Chen", role: "Postdoctoral Researcher", education: "PhD UC Berkeley 2022", research: "Machine Learning & Drug Discovery", category: "Postdocs", image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Dr. Sarah Williams", role: "Postdoctoral Researcher", education: "PhD Cambridge 2023", research: "Molecular Simulation Methods", category: "Postdocs", image: "https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Alex Rivera", role: "PhD Student (4th year)", education: "", research: "Protein folding mechanisms in neurodegenerative diseases", category: "PhD Students", image: "https://images.pexels.com/photos/8942090/pexels-photo-8942090.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Maya Patel", role: "PhD Student (3rd year)", education: "", research: "Drug binding kinetics and optimization", category: "PhD Students", image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Jordan Kim", role: "PhD Student (2nd year)", education: "", research: "Enzyme catalysis mechanisms", category: "PhD Students", image: "https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Priya Sharma", role: "PhD Student (1st year)", education: "", research: "Antibody-antigen interactions", category: "PhD Students", image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Sam Taylor", role: "Undergraduate (Senior, Chemistry)", education: "", research: "Machine learning model development", category: "Undergraduates", image: "https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Chris Anderson", role: "Undergraduate (Junior, CS)", education: "", research: "Building data pipeline infrastructure", category: "Undergraduates", image: "https://images.pexels.com/photos/5905529/pexels-photo-5905529.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const seedAlumni: Alumnus[] = [
  { name: "Dr. Michael Zhang", position: "Assistant Professor, University of Washington", year: "2024" },
  { name: "Dr. Lisa Johnson", position: "Senior Scientist, Pfizer", year: "2023" },
  { name: "Dr. Ahmed Hassan", position: "Postdoc, Max Planck Institute", year: "2022" },
];

// ---------------------------------------------------------------------------
// In-memory mutable store (seeded with deep clones so writes never mutate seeds)
// ---------------------------------------------------------------------------

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const store = {
  researchProjects: clone(seedResearchProjects) as ResearchProject[],
  publications: clone(seedPublications) as Publication[],
  newsItems: clone(seedNewsItems) as NewsItem[],
  labMembers: clone(seedLabMembers) as string[],
  principalInvestigator: clone(principalInvestigator) as TeamMember,
  teamMembers: clone(seedTeamMembers) as TeamMember[],
  alumni: clone(seedAlumni) as Alumnus[],
};

// ---------------------------------------------------------------------------
// Network latency simulation
// ---------------------------------------------------------------------------

const MIN_LATENCY_MS = 200;
const MAX_LATENCY_MS = 600;

function randomLatency(): number {
  return Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS + 1)) + MIN_LATENCY_MS;
}

/**
 * Resolves after a delay to imitate a network round-trip. Pass an explicit
 * duration in milliseconds to override the default randomized latency.
 */
export function delay(ms: number = randomLatency()): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Read operations
// ---------------------------------------------------------------------------

export async function getResearchProjects(): Promise<ResearchProject[]> {
  await delay();
  return clone(store.researchProjects);
}

export async function getResearchProjectBySlug(slug: string): Promise<ResearchProject | undefined> {
  await delay();
  const project = store.researchProjects.find((p) => p.slug === slug);
  return project ? clone(project) : undefined;
}

export async function getPublications(): Promise<Publication[]> {
  await delay();
  return clone(store.publications);
}

export async function getPublicationBySlug(slug: string): Promise<Publication | undefined> {
  await delay();
  const publication = store.publications.find((p) => p.slug === slug);
  return publication ? clone(publication) : undefined;
}

export async function getNewsItems(): Promise<NewsItem[]> {
  await delay();
  return clone(store.newsItems);
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | undefined> {
  await delay();
  const item = store.newsItems.find((n) => n.slug === slug);
  return item ? clone(item) : undefined;
}

export async function getLabMembers(): Promise<string[]> {
  await delay();
  return clone(store.labMembers);
}

export async function getPrincipalInvestigator(): Promise<TeamMember> {
  await delay();
  return clone(store.principalInvestigator);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay();
  return clone(store.teamMembers);
}

export async function getAlumni(): Promise<Alumnus[]> {
  await delay();
  return clone(store.alumni);
}

// ---------------------------------------------------------------------------
// Write operations
// ---------------------------------------------------------------------------

export async function createResearchProject(project: ResearchProject): Promise<ResearchProject> {
  await delay();
  store.researchProjects.push(clone(project));
  return clone(project);
}

export async function updateResearchProject(
  slug: string,
  updates: Partial<ResearchProject>,
): Promise<ResearchProject | undefined> {
  await delay();
  const index = store.researchProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  store.researchProjects[index] = { ...store.researchProjects[index], ...clone(updates) };
  return clone(store.researchProjects[index]);
}

export async function deleteResearchProject(slug: string): Promise<boolean> {
  await delay();
  const index = store.researchProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return false;
  store.researchProjects.splice(index, 1);
  return true;
}

export async function createPublication(publication: Publication): Promise<Publication> {
  await delay();
  store.publications.push(clone(publication));
  return clone(publication);
}

export async function updatePublication(
  slug: string,
  updates: Partial<Publication>,
): Promise<Publication | undefined> {
  await delay();
  const index = store.publications.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  store.publications[index] = { ...store.publications[index], ...clone(updates) };
  return clone(store.publications[index]);
}

export async function deletePublication(slug: string): Promise<boolean> {
  await delay();
  const index = store.publications.findIndex((p) => p.slug === slug);
  if (index === -1) return false;
  store.publications.splice(index, 1);
  return true;
}

export async function createNewsItem(item: NewsItem): Promise<NewsItem> {
  await delay();
  store.newsItems.push(clone(item));
  return clone(item);
}

export async function updateNewsItem(
  slug: string,
  updates: Partial<NewsItem>,
): Promise<NewsItem | undefined> {
  await delay();
  const index = store.newsItems.findIndex((n) => n.slug === slug);
  if (index === -1) return undefined;
  store.newsItems[index] = { ...store.newsItems[index], ...clone(updates) };
  return clone(store.newsItems[index]);
}

export async function deleteNewsItem(slug: string): Promise<boolean> {
  await delay();
  const index = store.newsItems.findIndex((n) => n.slug === slug);
  if (index === -1) return false;
  store.newsItems.splice(index, 1);
  return true;
}
