import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import { newsItems } from "@/data/labData";

const allCategories = ["All", "Publications", "Awards", "Presentations", "Events", "Announcements"];

const borderColors: Record<string, string> = {
  Publications: "border-l-primary",
  Awards: "border-l-emerald-500",
  Presentations: "border-l-blue-500",
  Events: "border-l-purple-500",
  Announcements: "border-l-amber-500",
};

const badgeColors: Record<string, string> = {
  Publications: "bg-teal-100 text-teal-700",
  Awards: "bg-emerald-100 text-emerald-700",
  Presentations: "bg-blue-100 text-blue-500",
  Events: "bg-purple-500/10 text-purple-500",
  Announcements: "bg-amber-100 text-amber-700",
};

export default function NewsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return filter === "All" ? newsItems : newsItems.filter(n => n.category === filter);
  }, [filter]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="bg-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground tracking-tighter">News & Updates</h1>
          <p className="text-slate-300 mt-4 max-w-2xl">Stay up to date with the latest from the Molecular Dynamics Lab.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="flex flex-wrap gap-2 mb-10">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filtered.map((news, i) => (
                <Link key={news.slug} to={`/news/${news.slug}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow border-l-4 ${borderColors[news.category]}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColors[news.category]}`}>{news.category}</span>
                          <span className="text-xs text-muted-foreground font-mono-data">{news.date}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{news.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{news.text}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
