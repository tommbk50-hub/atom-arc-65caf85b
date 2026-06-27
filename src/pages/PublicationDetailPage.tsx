import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publications, labMembers, researchProjects } from "@/data/labData";
import { FadeUp } from "@/components/MotionWrappers";

function highlightLabMembers(authors: string) {
  const parts = authors.split(/(,\s*)/);
  return parts.map((part, i) => {
    const isLabMember = labMembers.some(m => part.includes(m));
    return isLabMember ? <strong key={i} className="text-primary font-semibold">{part}</strong> : <span key={i}>{part}</span>;
  });
}

export default function PublicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pub = publications.find(p => p.slug === slug);

  if (!pub) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Publication Not Found</h1>
          <Button asChild><Link to="/publications"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Publications</Link></Button>
        </div>
      </div>
    );
  }

  const relatedProject = researchProjects.find(p => p.slug === pub.relatedProject);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="bg-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Link to="/publications" className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Publications
          </Link>
          <h1 className="text-2xl lg:text-4xl font-extrabold text-primary-foreground tracking-tighter max-w-4xl">{pub.title}</h1>
          <p className="text-primary-foreground/70 mt-4">{highlightLabMembers(pub.authors)}</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <FadeUp>
                <div className="bg-card rounded-xl p-8 shadow-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Quote className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Abstract</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pub.abstract}</p>
                </div>
              </FadeUp>
            </div>

            <div className="space-y-6">
              <FadeUp delay={0.1}>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-foreground mb-4">Publication Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Journal</p>
                      <p className="text-sm font-medium text-foreground italic">{pub.journal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-sm font-medium font-mono-data text-foreground">{pub.year}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Citations</p>
                      <p className="text-sm font-medium font-mono-data text-foreground">{pub.citations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">DOI</p>
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline underline-offset-4 inline-flex items-center gap-1">
                        {pub.doi} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-foreground mb-4">Authors</h3>
                  <div className="flex flex-wrap gap-2">
                    {pub.authors.split(", ").map(author => {
                      const isLab = labMembers.some(m => author.includes(m));
                      return (
                        <span key={author} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${isLab ? "bg-teal-50 text-teal-700" : "bg-muted text-muted-foreground"}`}>
                          {author}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </FadeUp>

              {relatedProject && (
                <FadeUp delay={0.3}>
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <h3 className="font-bold text-foreground mb-4">Related Project</h3>
                    <Link to={`/research/${relatedProject.slug}`} className="group block">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img src={relatedProject.image} alt={relatedProject.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{relatedProject.title}</p>
                    </Link>
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
