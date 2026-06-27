import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, GraduationCap, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FadeUp, StaggerContainer, StaggerItem, CardHover } from "@/components/MotionWrappers";
import LoadingState from "@/components/LoadingState";
import { getPrincipalInvestigator, getTeamMembers, getAlumni, type TeamMember } from "@/utils/mockData";

const categories = ["All", "Postdocs", "PhD Students", "Undergraduates"];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2);
}

export default function TeamPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const { data: pi, isLoading: piLoading } = useQuery({
    queryKey: ["principalInvestigator"],
    queryFn: getPrincipalInvestigator,
  });
  const { data: teamMembers = [], isLoading: membersLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
  });
  const { data: alumni = [] } = useQuery({
    queryKey: ["alumni"],
    queryFn: getAlumni,
  });

  const filtered = filter === "All" ? teamMembers : teamMembers.filter(m => m.category === filter);
  const grouped = categories.slice(1).map(cat => ({ cat, members: filtered.filter(m => m.category === cat) })).filter(g => g.members.length > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="bg-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground tracking-tighter">Our Team</h1>
          <p className="text-slate-300 mt-4 max-w-2xl">A diverse group of researchers united by the goal of accelerating drug discovery through computation.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* PI Section */}
        {piLoading || !pi ? (
          <LoadingState label="Loading team…" className="mb-16" />
        ) : (
        <FadeUp>
          <div className="bg-card rounded-xl shadow-card p-6 lg:p-10 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-elevated">
                  <img src={pi.image} alt={pi.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground">{pi.name}</h2>
                <p className="text-primary font-medium mt-1">{pi.role}</p>
                <p className="text-sm text-muted-foreground mt-2 font-mono-data">{pi.education}</p>
                <p className="text-muted-foreground mt-4 leading-relaxed">{pi.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pi.research.split(", ").map(r => (
                    <span key={r} className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">{r}</span>
                  ))}
                </div>
                {pi.email && (
                  <a href={`mailto:${pi.email}`} className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 hover:underline underline-offset-4">
                    <Mail className="h-4 w-4" /> {pi.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
        )}

        {/* Filters */}
        <FadeUp>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
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

        {/* Team Grid */}
        {membersLoading ? (
          <LoadingState label="Loading members…" />
        ) : (
          grouped.map(({ cat, members }) => (
          <div key={cat} className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">{cat}</h3>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map(member => (
                <StaggerItem key={member.name}>
                  <CardHover>
                    <button
                      onClick={() => setSelected(member)}
                      className="w-full text-left bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                    >
                      <div className="aspect-square bg-muted relative group overflow-hidden">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-secondary-foreground text-sm">{member.research}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </button>
                  </CardHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          ))
        )}

        {/* Alumni */}
        <FadeUp>
          <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-muted-foreground/30 mt-16">Alumni</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alumni.map(a => (
              <div key={a.name} className="bg-card rounded-lg p-5 shadow-card">
                <h4 className="font-semibold text-foreground">{a.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{a.position}</p>
                <span className="text-xs text-muted-foreground font-mono-data">Left {a.year}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                </div>
                <DialogHeader>
                  <DialogTitle>{selected.name}</DialogTitle>
                </DialogHeader>
              </div>
              <p className="text-primary font-medium text-sm">{selected.role}</p>
              {selected.education && <p className="text-xs text-muted-foreground font-mono-data">{selected.education}</p>}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Research Focus</h4>
                <p className="text-muted-foreground text-sm">{selected.research}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
