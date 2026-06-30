import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, FlaskConical, DollarSign, Sparkles, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem, CardHover } from "@/components/MotionWrappers";
import heroImage from "@/assets/hero-molecular.jpg";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono-data">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { icon: Users, label: "Active Researchers", value: 12, suffix: "" },
  { icon: BookOpen, label: "References", value: 47, suffix: "" },
  { icon: FlaskConical, label: "Research Projects", value: 5, suffix: "" },
];

const featuredResearch = [
  {
    icon: Sparkles,
    title: "AI-Driven Drug Discovery Platform",
    slug: "ai-driven-drug-discovery-platform",
    description: "Using machine learning models to predict druggable pockets and drug-target binding affinities.",
    image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Brain,
    title: "Protein Misfolding Mechanisms",
    slug: "protein-misfolding-neurodegenerative-diseases",
    description: "Uncovering molecular pathways in Alzheimer's and Parkinson's diseases.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Target,
    title: "Cancer Therapeutic Targets",
    slug: "novel-therapeutic-targets-cancer",
    description: "Identifying novel protein-ligand interactions for precision oncology.",
    image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const recentNews = [
  { date: "May 2, 2026", slug: "nsf-career-award-2025", category: "New Project: SARS-CoV-2 Helicase", text: "Coronavirus antivirals: Targeting the SARS-CoV-2 Helicase" },
  { date: "June 3, 2026", slug: "nature-communications-ai-drug-discovery", category: "New Project: Bromodomain-Containing Protein 4 (BRD4) ", text: "BRD4 is an epigenetic \"reader\" protein that binds to acetylated histones to regulate gene transcription, including the transcription of core oncogenes like c-Myc. BRD4 features a deep, highly druggable acetyl-lysine binding pocket that is exceptionally well-suited for FBDD." },
  { date: "June 18, 2026", slug: "best-poster-biophysical-society-2024", category: "New Project: Cyclin-Dependent Kinase-2 (CDK2)", text: "CDKs are the core drivers of the cell cycle. Their dysregulation leads directly to unchecked cellular proliferation" },
];

const categoryColors: Record<string, string> = {
  Awards: "bg-emerald-100 text-emerald-700",
  Publications: "bg-teal-100 text-teal-700",
  Presentations: "bg-blue-100 text-blue-500",
  Events: "bg-purple-500/10 text-purple-500",
  Announcements: "bg-amber-100 text-amber-700",
};

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="relative bg-hero min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground leading-tight tracking-tighter"
            >
              Advancing Drug Discovery Through Computational Innovation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              The Open Drug Designs project combines machine learning, molecular simulations, and structural biology to accelerate the development of life-saving therapeutics.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/research">Explore Research <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/team">Meet Our Team</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl lg:text-4xl font-bold text-foreground">
                    {stat.suffix === "M" ? (
                      <span className="font-mono-data">${stat.value}M</span>
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeUp>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-4">Featured Research</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Our lab focuses on computational approaches at the frontier of drug discovery and molecular biology.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResearch.map((project) => (
              <StaggerItem key={project.title}>
                <Link to={`/research/${project.slug}`} className="block group h-full">
                  <CardHover className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <project.icon className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.description}</p>
                      <span className="inline-flex items-center text-primary text-sm font-medium mt-4 group-hover:underline underline-offset-4">
                        Learn more <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardHover>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-foreground">Recent News</h2>
              <Button variant="outline" asChild>
                <Link to="/news">View All</Link>
              </Button>
            </div>
          </FadeUp>
          <StaggerContainer className="space-y-4">
            {recentNews.map((news) => (
              <StaggerItem key={news.text}>
                <Link to={`/news/${news.slug}`} className="block group">
                  <CardHover className="bg-card rounded-lg p-5 shadow-card hover:shadow-card-hover transition-shadow flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[news.category]}`}>
                          {news.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono-data">{news.date}</span>
                      </div>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">{news.text}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
                  </CardHover>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="bg-cta rounded-2xl p-10 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Explore Our Research</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Discover how we're advancing computational drug discovery through cutting-edge simulations and AI.
              </p>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/research">View Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </motion.div>
  );
}
