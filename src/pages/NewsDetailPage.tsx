import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/data/labData";
import { FadeUp } from "@/components/MotionWrappers";

const badgeColors: Record<string, string> = {
  Publications: "bg-teal-100 text-teal-700",
  Awards: "bg-emerald-100 text-emerald-700",
  Presentations: "bg-blue-100 text-blue-500",
  Events: "bg-purple-500/10 text-purple-500",
  Announcements: "bg-amber-100 text-amber-700",
};

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = newsItems.findIndex(n => n.slug === slug);
  const item = index >= 0 ? newsItems[index] : null;

  if (!item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button asChild><Link to="/news"><ArrowLeft className="mr-2 h-4 w-4" /> Back to News</Link></Button>
        </div>
      </div>
    );
  }

  const prev = index > 0 ? newsItems[index - 1] : null;
  const next = index < newsItems.length - 1 ? newsItems[index + 1] : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="bg-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Link to="/news" className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to News
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColors[item.category]}`}>{item.category}</span>
            <span className="text-sm text-primary-foreground/60 font-mono-data">{item.date}</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-extrabold text-primary-foreground tracking-tighter max-w-3xl">{item.title}</h1>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeUp>
            <div className="bg-card rounded-xl p-8 lg:p-10 shadow-card">
              {item.fullText.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h3 key={i} className="text-lg font-bold text-foreground mt-8 mb-3">{paragraph.replace(/\*\*/g, "")}</h3>;
                }
                if (paragraph.startsWith("**")) {
                  const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1];
                  const rest = paragraph.replace(/\*\*.*?\*\*\n?/, "").trim();
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
                if (paragraph.startsWith('"') || paragraph.startsWith('"')) {
                  return (
                    <blockquote key={i} className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
                      {paragraph}
                    </blockquote>
                  );
                }
                return <p key={i} className="text-muted-foreground leading-relaxed mt-4">{paragraph}</p>;
              })}
            </div>
          </FadeUp>

          {/* Prev/Next Navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {prev ? (
              <Link to={`/news/${prev.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/news/${next.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group text-right">
                <div>
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{next.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
