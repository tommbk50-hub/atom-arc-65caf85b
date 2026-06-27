import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem, CardHover } from "@/components/MotionWrappers";
import { Sparkles, Brain, Target, Wrench, ArrowRight } from "lucide-react";
import { researchProjects } from "@/data/labData";

const themes = [
  { icon: Sparkles, label: "Computational Drug Discovery", desc: "AI and simulation for therapeutics" },
  { icon: Brain, label: "Protein Dynamics & Folding", desc: "Mechanisms of misfolding diseases" },
  { icon: Wrench, label: "Molecular Simulation Methods", desc: "Novel computational techniques" },
  { icon: Target, label: "Machine Learning Applications", desc: "Deep learning for biology" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-muted text-muted-foreground",
  "In Planning": "bg-amber-100 text-amber-700",
};

export default function ResearchPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="bg-research py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground tracking-tighter">Our Research</h1>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl">Pushing the boundaries of computational chemistry to solve real-world health challenges.</p>
        </div>
      </section>

      {/* Themes */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeUp><h2 className="text-2xl font-bold text-foreground mb-8">Research Themes</h2></FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map(t => (
              <StaggerItem key={t.label}>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <t.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground text-sm">{t.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeUp><h2 className="text-2xl font-bold text-foreground mb-10">Current Projects</h2></FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchProjects.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.1}>
                <Link to={`/research/${p.slug}`} className="block group">
                  <CardHover className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[p.status]}`}>{p.status}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-mono-data">
                        <span>{p.duration}</span>
                        <span>•</span>
                        <span>{p.funding}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                      <div className="mt-6">
                        <div className="flex flex-wrap gap-2">
                          {p.team.map(member => (
                            <span key={member} className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">{member}</span>
                          ))}
                        </div>
                        {p.pubs && <p className="text-xs text-muted-foreground mt-3 font-mono-data">{p.pubs}</p>}
                      </div>
                      <span className="inline-flex items-center text-primary text-sm font-medium mt-4 group-hover:underline underline-offset-4">
                        View details <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardHover>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
