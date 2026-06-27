import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ExternalLink, FileText, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import { publications, labMembers } from "@/data/labData";

function highlightLabMembers(authors: string) {
  const parts = authors.split(/(,\s*)/);
  return parts.map((part, i) => {
    const isLabMember = labMembers.some(m => part.includes(m));
    return isLabMember ? <strong key={i} className="text-primary font-semibold">{part}</strong> : <span key={i}>{part}</span>;
  });
}

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);

  const filtered = useMemo(() => {
    return publications.filter(p => {
      if (yearFilter && p.year !== yearFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, yearFilter]);

  const featured = publications.filter(p => p.featured);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="bg-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground tracking-tighter">Publications</h1>
          <p className="text-slate-300 mt-4 max-w-2xl">Our research output spanning computational drug discovery, molecular dynamics, and machine learning.</p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeUp><h2 className="text-2xl font-bold text-foreground mb-8">Featured Publications</h2></FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(p => (
              <StaggerItem key={p.slug}>
                <Link to={`/publications/${p.slug}`} className="block group h-full">
                  <div className="bg-featured rounded-xl p-6 border-2 border-teal-100 h-full flex flex-col">
                    <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{p.journal} ({p.year})</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-xs font-mono-data text-muted-foreground bg-muted px-2 py-1 rounded-full">{p.citations} citations</span>
                      <span className="text-primary text-xs inline-flex items-center gap-1 group-hover:underline underline-offset-4">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* All Publications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search publications..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Filter by Year</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setYearFilter(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!yearFilter ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      All Years
                    </button>
                    {years.map(y => (
                      <button
                        key={y}
                        onClick={() => setYearFilter(y)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-mono-data transition-colors ${yearFilter === y ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex-1">
              {years.filter(y => !yearFilter || y === yearFilter).map(year => {
                const yearPubs = filtered.filter(p => p.year === year);
                if (yearPubs.length === 0) return null;
                return (
                  <div key={year} className="mb-10">
                    <h3 className="text-3xl font-bold text-foreground mb-4 pb-2 border-b-2 border-border font-mono-data">{year}</h3>
                    <div className="space-y-3">
                      {yearPubs.map(p => (
                        <Link key={p.slug} to={`/publications/${p.slug}`} className="block group">
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-card p-4 rounded-lg shadow-card hover:shadow-card-hover transition-shadow border-l-4 border-primary"
                          >
                            <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{p.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{highlightLabMembers(p.authors)}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-muted-foreground italic">{p.journal}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono-data text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{p.citations} cit.</span>
                                <span className="text-primary text-xs">View →</span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
