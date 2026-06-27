import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, DollarSign, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResearchProjectBySlug, getPublications } from "@/utils/mockData";
import { FadeUp } from "@/components/MotionWrappers";
import LoadingState from "@/components/LoadingState";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-muted text-muted-foreground",
  "In Planning": "bg-amber-100 text-amber-700",
};

export default function ResearchDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useQuery({
    queryKey: ["researchProject", slug],
    queryFn: () => getResearchProjectBySlug(slug ?? ""),
    enabled: !!slug,
  });
  const { data: allPublications = [] } = useQuery({
    queryKey: ["publications"],
    queryFn: getPublications,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingState label="Loading project…" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button asChild><Link to="/research"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Research</Link></Button>
        </div>
      </div>
    );
  }

  const relatedPubs = allPublications.filter(p => p.relatedProject === project.slug);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[3/1] lg:aspect-[4/1] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20">
          <div className="container mx-auto px-4">
            <Link to="/research" className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Research
            </Link>
            <div className="flex items-start gap-4">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-primary-foreground tracking-tighter flex-1">{project.title}</h1>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${statusStyles[project.status]}`}>{project.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <FadeUp>
                <div className="prose prose-sm max-w-none">
                  {project.longDescription.split("\n\n").map((paragraph, i) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      return <h3 key={i} className="text-lg font-bold text-foreground mt-8 mb-3">{paragraph.replace(/\*\*/g, "")}</h3>;
                    }
                    if (paragraph.startsWith("**")) {
                      const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1];
                      const rest = paragraph.replace(/\*\*.*?\*\*/, "").trim();
                      return (
                        <div key={i} className="mt-6">
                          <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{rest}</p>
                        </div>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={i} className="space-y-2 my-4">
                          {paragraph.split("\n").map((line, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {line.replace(/^- /, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i} className="text-muted-foreground leading-relaxed mt-4">{paragraph}</p>;
                  })}
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeUp delay={0.1}>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-foreground mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium font-mono-data text-foreground">{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Funding</p>
                        <p className="text-sm font-medium text-foreground">{project.funding}</p>
                      </div>
                    </div>
                    {project.pubs && (
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Publications</p>
                          <p className="text-sm font-medium font-mono-data text-foreground">{project.pubs}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-foreground mb-4">Team Members</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map(member => (
                      <span key={member} className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">{member}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {relatedPubs.length > 0 && (
                <FadeUp delay={0.3}>
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <h3 className="font-bold text-foreground mb-4">Related Publications</h3>
                    <div className="space-y-3">
                      {relatedPubs.map(pub => (
                        <Link key={pub.slug} to={`/publications/${pub.slug}`} className="block group">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">{pub.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{pub.journal} ({pub.year})</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
