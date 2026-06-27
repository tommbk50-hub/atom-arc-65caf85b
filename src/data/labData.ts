export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const researchProjects = [
  {
    title: "AI-Driven Drug Discovery Platform",
    slug: "ai-driven-drug-discovery-platform",
    status: "Active" as const,
    duration: "2023–2026",
    team: ["Dr. Martinez (PI)", "Dr. Chen (Lead)", "Maya Patel", "Sam Taylor"],
    funding: "NSF CAREER Award ($500,000)",
    description: "Developing deep learning models to predict drug-target binding affinity, reducing the time and cost of early-stage drug discovery by 75%. Our platform has screened over 2 million compounds and identified 15 promising candidates currently in preclinical testing.",
    longDescription: `Our AI-Driven Drug Discovery Platform represents a paradigm shift in how we approach early-stage drug development. By leveraging state-of-the-art deep learning architectures, we've built a system capable of predicting drug-target binding affinity with remarkable accuracy.

**Key Achievements:**
- Screened over 2 million chemical compounds computationally
- Identified 15 promising drug candidates now in preclinical testing
- Reduced early-stage screening costs by approximately 75%
- Achieved 94% accuracy in binding affinity predictions

**Methodology:**
Our approach combines graph neural networks for molecular representation with attention-based mechanisms for protein-ligand interaction modeling. We train on curated datasets from PDBbind and ChEMBL, augmented with our own experimental validation data.

**Impact:**
This work has direct implications for accelerating the drug discovery pipeline, potentially bringing life-saving therapeutics to patients years earlier than traditional methods allow.`,
    pubs: "3 papers published, 2 in preparation",
    image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Understanding Protein Misfolding in Neurodegenerative Diseases",
    slug: "protein-misfolding-neurodegenerative-diseases",
    status: "Active" as const,
    duration: "2022–2025",
    team: ["Dr. Martinez (PI)", "Dr. Williams (Lead)", "Alex Rivera", "Jordan Kim"],
    funding: "NIH R01 ($1.2M)",
    description: "Investigating the molecular mechanisms of protein aggregation in Alzheimer's and Parkinson's diseases using advanced molecular dynamics simulations. Our work has revealed novel intermediate states in the aggregation pathway that could serve as therapeutic targets.",
    longDescription: `Neurodegenerative diseases such as Alzheimer's and Parkinson's are characterized by the misfolding and aggregation of specific proteins. Our research uses cutting-edge molecular dynamics simulations to understand these processes at the atomic level.

**Key Achievements:**
- Discovered 3 novel intermediate states in the amyloid-β aggregation pathway
- Identified potential druggable pockets in α-synuclein oligomers
- Developed enhanced sampling methods reducing simulation time by 40%
- Published 5 peer-reviewed papers with 1 currently under review

**Methodology:**
We employ multi-scale simulation approaches combining all-atom molecular dynamics with coarse-grained models. Our enhanced sampling techniques, including replica exchange and metadynamics, allow us to explore conformational landscapes that are inaccessible to conventional simulations.

**Impact:**
By revealing the molecular mechanisms underlying protein misfolding, our work opens new avenues for therapeutic intervention in devastating neurodegenerative conditions affecting millions worldwide.`,
    pubs: "5 papers published, 1 under review",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Novel Therapeutic Targets for Cancer Treatment",
    slug: "novel-therapeutic-targets-cancer",
    status: "Active" as const,
    duration: "2024–2027",
    team: ["Dr. Martinez (PI)", "Maya Patel (Lead)", "Priya Sharma"],
    funding: "American Cancer Society Research Grant ($400,000)",
    description: "Identifying and validating novel protein-protein interactions in cancer signaling pathways. Using computational screening and experimental validation, we've discovered 3 new druggable targets currently being evaluated by pharmaceutical partners.",
    longDescription: `Cancer remains one of the most challenging diseases to treat, in part because of the complexity of signaling networks driving tumor growth and metastasis. Our project focuses on identifying previously unknown protein-protein interactions that play critical roles in cancer progression.

**Key Achievements:**
- Discovered 3 novel druggable protein-protein interaction sites
- Established partnerships with 2 pharmaceutical companies for validation
- Developed a high-throughput computational screening pipeline
- Published 2 papers in leading journals

**Methodology:**
We combine homology modeling, molecular docking, and long-timescale molecular dynamics simulations to characterize protein-protein interfaces. Machine learning classifiers trained on known druggable interfaces help prioritize candidates for experimental validation.

**Impact:**
Our discoveries provide new starting points for precision oncology therapeutics, potentially offering treatment options for cancers that currently lack effective targeted therapies.`,
    pubs: "2 papers published",
    image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Computational Methods for Antibody Design",
    slug: "computational-methods-antibody-design",
    status: "In Planning" as const,
    duration: "2025–2028",
    team: ["Dr. Martinez (PI)", "Dr. Chen", "Priya Sharma"],
    funding: "Proposal submitted to DOE",
    description: "Developing next-generation computational tools for rational antibody design, enabling faster and more effective therapeutic antibody development for infectious diseases and cancer immunotherapy.",
    longDescription: `Therapeutic antibodies represent one of the fastest-growing classes of pharmaceuticals. Our upcoming project aims to develop computational tools that can accelerate and improve the antibody design process.

**Planned Objectives:**
- Build generative AI models for de novo antibody sequence design
- Develop structure prediction pipelines for antibody-antigen complexes
- Create optimization algorithms for affinity maturation in silico
- Validate designs through collaboration with experimental partners

**Methodology:**
We will leverage recent advances in protein language models and diffusion-based generative models, adapted specifically for the unique structural features of antibodies. Our approach will integrate sequence-level and structure-level optimization.

**Expected Impact:**
This project has the potential to dramatically reduce the time and cost of therapeutic antibody development, making these powerful medicines more accessible for treating infectious diseases and cancer.`,
    pubs: "",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const labMembers = ["Martinez", "Chen", "Williams", "Rivera", "Patel", "Kim", "Sharma", "Taylor", "Zhang", "Johnson", "Hassan"];

export const publications = [
  { year: 2024, title: "Deep Learning Approaches for Predicting Protein-Drug Binding Affinity", slug: "deep-learning-protein-drug-binding", authors: "Chen, J., Patel, M., Martinez, E.", journal: "Nature Communications 15, 2847", doi: "10.1038/s41467-024-xxxxx", citations: 45, featured: true, abstract: "We present a novel deep learning framework that predicts protein-drug binding affinity with 94% accuracy. Our model integrates graph neural networks for molecular representation with transformer-based architectures for capturing long-range protein-ligand interactions. Validated against a benchmark of 2,847 protein-drug complexes, our approach outperforms existing methods by 15% in binding affinity prediction and 23% in virtual screening enrichment. These results demonstrate the potential of AI-driven approaches to accelerate early-stage drug discovery.", relatedProject: "ai-driven-drug-discovery-platform" },
  { year: 2024, title: "Conformational Dynamics of α-Synuclein in Parkinson's Disease", slug: "conformational-dynamics-alpha-synuclein", authors: "Rivera, A., Williams, S., Kim, J., Martinez, E.", journal: "Biophysical Journal 116(4), 823-834", doi: "10.1016/j.bpj.2024.xxxxx", citations: 23, featured: false, abstract: "Using microsecond-scale molecular dynamics simulations, we characterize the conformational ensemble of α-synuclein under physiological conditions and in the presence of lipid membranes. Our simulations reveal three previously unidentified intermediate states that precede fibril formation, each presenting distinct druggable pockets. Free energy calculations indicate that targeting these intermediates could be more effective than targeting mature fibrils, opening new therapeutic avenues for Parkinson's disease.", relatedProject: "protein-misfolding-neurodegenerative-diseases" },
  { year: 2024, title: "Computational Identification of Cancer Drug Targets", slug: "computational-identification-cancer-drug-targets", authors: "Sharma, P., Martinez, E.", journal: "ACS Chemical Biology 19(3), 445-456", doi: "10.1021/acschembio.xxxxx", citations: 12, featured: false, abstract: "We report a computational pipeline for systematic identification of druggable protein-protein interaction sites in cancer signaling networks. By combining network analysis, structural bioinformatics, and machine learning, we screened over 5,000 protein-protein interactions and identified 47 candidate druggable sites. Experimental validation confirmed 3 novel targets with demonstrated effects on tumor cell proliferation in vitro.", relatedProject: "novel-therapeutic-targets-cancer" },
  { year: 2023, title: "Machine Learning-Guided Drug Discovery: A Computational Framework", slug: "machine-learning-guided-drug-discovery", authors: "Martinez, E., Chen, J., Zhang, M.", journal: "Nature Reviews Drug Discovery 22, 687-702", doi: "10.1038/s41573-023-xxxxx", citations: 156, featured: true, abstract: "This comprehensive review examines the current state and future directions of machine learning in drug discovery. We survey methods for molecular property prediction, generative molecular design, protein structure prediction, and binding affinity estimation. We propose a unified computational framework that integrates these approaches into a coherent drug discovery pipeline, and discuss the challenges and opportunities for clinical translation. Our analysis of 200+ recent studies reveals that ML-guided approaches can reduce discovery timelines by 40-60%.", relatedProject: "ai-driven-drug-discovery-platform" },
  { year: 2023, title: "Molecular Mechanisms of Amyloid-β Aggregation: Insights from Multi-Scale Simulations", slug: "molecular-mechanisms-amyloid-beta-aggregation", authors: "Williams, S., Rivera, A., Martinez, E.", journal: "J. Am. Chem. Soc. 145(28), 15234-15245", doi: "10.1021/jacs.xxxxx", citations: 89, featured: true, abstract: "We employ a multi-scale simulation approach combining all-atom and coarse-grained molecular dynamics to investigate the early stages of amyloid-β peptide aggregation in Alzheimer's disease. Our simulations capture the transition from disordered monomers to structured oligomeric intermediates over effective timescales of milliseconds. We identify key residue-level interactions driving nucleation and propose a revised aggregation mechanism featuring a previously unknown β-hairpin intermediate.", relatedProject: "protein-misfolding-neurodegenerative-diseases" },
  { year: 2023, title: "Kinetic Analysis of Drug Binding to Membrane Proteins", slug: "kinetic-analysis-drug-binding-membrane-proteins", authors: "Patel, M., Hassan, A., Martinez, E.", journal: "PNAS 120(15), e2301234120", doi: "10.1073/pnas.xxxxx", citations: 67, featured: false, abstract: "Drug binding kinetics to membrane proteins are critical determinants of therapeutic efficacy but remain poorly understood at the molecular level. Using adaptive sampling molecular dynamics and Markov state models, we characterize the complete binding and unbinding pathways of three FDA-approved drugs to their membrane protein targets. Our analysis reveals that membrane composition significantly influences binding kinetics, with cholesterol-rich domains acting as drug reservoirs.", relatedProject: "ai-driven-drug-discovery-platform" },
  { year: 2023, title: "Advanced Sampling Methods for Protein Folding Studies", slug: "advanced-sampling-methods-protein-folding", authors: "Johnson, L., Martinez, E.", journal: "J. Chem. Theory Comput. 19(9), 2456-2468", doi: "10.1021/acs.jctc.xxxxx", citations: 43, featured: false, abstract: "We present two novel enhanced sampling methods for studying protein folding: an adaptive replica exchange protocol that dynamically optimizes temperature distributions, and a machine learning-guided collective variable selection approach. Benchmarked on five model proteins ranging from 35 to 164 residues, both methods achieve 2-5x speedup over conventional approaches while maintaining thermodynamic accuracy. These methods are implemented in our open-source simulation toolkit.", relatedProject: "protein-misfolding-neurodegenerative-diseases" },
];

export const newsItems = [
  { date: "January 15, 2025", slug: "nsf-career-award-2025", category: "Awards", title: "NSF CAREER Award", text: "Dr. Elena Martinez has been awarded a prestigious NSF CAREER Award totaling $500,000 over five years. This funding will support the development of our AI-driven drug discovery platform and provide training opportunities for graduate students.", fullText: `We are thrilled to announce that Dr. Elena Martinez has been awarded the prestigious National Science Foundation CAREER Award, one of the most competitive grants available to early-career faculty in the United States.

The award, totaling $500,000 over five years, will fund the continued development of our AI-Driven Drug Discovery Platform. This project combines deep learning with molecular dynamics simulations to predict drug-target binding affinity, with the goal of dramatically reducing the time and cost of early-stage drug discovery.

**About the NSF CAREER Award:**
The Faculty Early Career Development (CAREER) Program offers the National Science Foundation's most prestigious awards in support of early-career faculty who have the potential to serve as academic role models in research and education.

**Impact on the Lab:**
This funding will support two new graduate student positions and provide computational resources for scaling our machine learning models. It also includes an educational component focused on developing computational chemistry curricula for undergraduate students.

"I am deeply honored to receive this award," said Dr. Martinez. "It validates the innovative direction of our research and will enable us to accelerate our drug discovery efforts while training the next generation of computational scientists."` },
  { date: "December 3, 2024", slug: "nature-communications-ai-drug-discovery", category: "Publications", title: "Nature Communications Publication", text: "Our latest research on deep learning for protein-drug binding prediction has been published in Nature Communications. Lead author Dr. James Chen demonstrated 94% accuracy in predicting binding affinity.", fullText: `Our latest research article, "Deep Learning Approaches for Predicting Protein-Drug Binding Affinity," has been published in Nature Communications, one of the world's leading multidisciplinary science journals.

**Paper Highlights:**
Lead author Dr. James Chen and co-authors Maya Patel and Dr. Elena Martinez present a novel deep learning framework that achieves 94% accuracy in predicting how strongly drug molecules bind to their protein targets—a critical metric in drug development.

The study introduces a graph neural network architecture specifically designed to capture the complex 3D interactions between proteins and drug molecules. The model was trained on over 15,000 experimentally validated protein-drug complexes and validated against independent benchmarks.

**Key Results:**
- 94% accuracy in binding affinity prediction
- 23% improvement over existing state-of-the-art methods
- Successfully identified 15 promising drug candidates from a library of 2 million compounds
- Predictions validated experimentally for 12 of the 15 candidates

**Significance:**
"This work demonstrates that AI can meaningfully accelerate the drug discovery process," said Dr. Chen. "By accurately predicting binding affinity computationally, we can focus experimental resources on the most promising candidates."

The full paper is available open-access at Nature Communications.` },
  { date: "November 18, 2024", slug: "best-poster-biophysical-society-2024", category: "Awards", title: "Best Poster Award", text: "Congratulations to Maya Patel for winning Best Poster Award at the Biophysical Society Annual Meeting! Her work on drug binding kinetics received outstanding recognition.", fullText: `We are proud to announce that Maya Patel, a 3rd-year PhD student in the Molecular Dynamics Lab, has won the Best Poster Award at the 68th Biophysical Society Annual Meeting held in Philadelphia.

**About the Research:**
Maya's poster, titled "Multiscale Modeling of Drug Binding Kinetics to G Protein-Coupled Receptors," presented her work on understanding how drugs bind to and unbind from membrane proteins—a critical but poorly understood aspect of drug efficacy.

Using a combination of molecular dynamics simulations and machine learning, Maya developed a method to predict drug residence times—the duration a drug stays bound to its target. Drug residence time is increasingly recognized as a better predictor of in vivo drug efficacy than binding affinity alone.

**Competition Details:**
The Biophysical Society Annual Meeting attracts over 6,000 researchers from around the world. The Best Poster Award is selected from over 3,000 poster presentations, making this a highly competitive recognition.

"Maya's work exemplifies the innovative, interdisciplinary research we pursue in our lab," said Dr. Martinez. "Her ability to combine physical chemistry principles with machine learning is truly exceptional."

Congratulations, Maya!` },
  { date: "October 22, 2024", slug: "nih-grant-renewal-2024", category: "Announcements", title: "NIH Grant Renewal", text: "Our NIH R01 grant on protein misfolding mechanisms has been renewed for an additional three years with $1.2M in funding.", fullText: `We are pleased to announce that our NIH R01 grant, "Molecular Mechanisms of Protein Misfolding in Neurodegenerative Diseases," has been renewed for an additional three years with $1.2M in total funding.

**Project Overview:**
This grant supports our ongoing research into the molecular mechanisms underlying protein aggregation in Alzheimer's and Parkinson's diseases. Using advanced molecular dynamics simulations, our team has made significant progress in understanding the early stages of misfolding that lead to disease.

**Achievements from the First Funding Period:**
- Published 5 peer-reviewed papers in top journals (JACS, Biophysical Journal, PNAS)
- Identified 3 novel intermediate states in the amyloid-β aggregation pathway
- Developed enhanced sampling methods that reduce simulation time by 40%
- Trained 3 graduate students and 2 postdoctoral researchers

**Plans for the Renewal Period:**
The renewed funding will support expanded investigations into therapeutic targeting of misfolding intermediates, development of next-generation simulation methods, and new collaborations with experimental groups for validation.

"This renewal is a testament to the hard work of our entire team," said Dr. Martinez. "We are excited to build on our discoveries and move closer to identifying therapeutic strategies for these devastating diseases."` },
  { date: "September 8, 2024", slug: "acs-conference-keynote-2024", category: "Presentations", title: "ACS Conference Keynote", text: "Dr. Martinez delivered a keynote address at the ACS Division of Computers in Chemistry symposium on integrating quantum mechanics and machine learning.", fullText: `Dr. Elena Martinez delivered a keynote address at the American Chemical Society Fall 2024 National Meeting in Denver, Colorado, as part of the Division of Computers in Chemistry (COMP) symposium on "Emerging Methods in Computational Drug Discovery."

**Keynote Title:**
"Bridging Scales: Integrating Quantum Mechanics, Molecular Dynamics, and Machine Learning for Drug Discovery"

**Talk Summary:**
In her 45-minute keynote, Dr. Martinez presented the lab's vision for a multi-scale computational framework that seamlessly integrates quantum mechanical calculations, classical molecular dynamics simulations, and machine learning models.

Key topics covered included:
- QM/MM methods for accurate binding energy calculations
- Machine learning potentials trained on quantum mechanical data
- Integration of deep learning with physics-based simulations
- Case studies from our AI-driven drug discovery platform

**Audience Reception:**
The talk was attended by over 300 researchers and generated significant discussion about the future of computational approaches in pharmaceutical development. Several potential collaborations were initiated as a result.

"The ACS meeting is always an inspiring gathering of the computational chemistry community," said Dr. Martinez. "I was honored to share our vision and learn about the exciting work happening in labs around the world."` },
  { date: "August 15, 2024", slug: "new-lab-members-fall-2024", category: "Announcements", title: "New Lab Members", text: "We're excited to welcome Priya Sharma (MIT) and Chris Anderson to the lab!", fullText: `The Molecular Dynamics Lab is growing! We are excited to welcome two new members who will bring fresh perspectives and expertise to our team.

**Priya Sharma - PhD Student**
Priya joins us from MIT, where she completed her undergraduate degree in Chemistry with a minor in Computer Science. She graduated summa cum laude with a thesis on "Computational Analysis of Antibody-Antigen Binding Interfaces."

At our lab, Priya will work on the upcoming Computational Methods for Antibody Design project, applying machine learning techniques to rational antibody design. Her unique combination of chemistry knowledge and programming skills makes her an ideal fit for this interdisciplinary work.

**Chris Anderson - Undergraduate Researcher**
Chris is a junior in the Computer Science department who will work on building and maintaining our data pipeline infrastructure. His experience with cloud computing and distributed systems will help us scale our computational workflows.

Chris will focus on developing automated pipelines for processing simulation data and integrating machine learning model outputs with our drug screening platform.

"We are delighted to welcome Priya and Chris to the lab," said Dr. Martinez. "Their diverse backgrounds and enthusiasm for computational research will strengthen our team and contribute to exciting new directions in our work."

Welcome aboard, Priya and Chris!` },
  { date: "July 30, 2024", slug: "summer-research-showcase-2024", category: "Events", title: "Summer Research Showcase", text: "Our undergraduate researchers presented their summer projects to the department with excellent feedback.", fullText: `The Department of Chemistry & Biochemistry held its annual Summer Research Showcase, and our lab's undergraduate researchers delivered outstanding presentations that received excellent feedback from faculty and peers.

**Sam Taylor - "Development of a Graph Neural Network for Molecular Property Prediction"**
Sam presented his work on building a graph neural network model that predicts key molecular properties relevant to drug-likeness. His model, trained on the QM9 dataset and validated on DrugBank compounds, achieves state-of-the-art accuracy on several benchmark tasks.

The model is now integrated into our AI-driven drug discovery platform, where it serves as a pre-filter to eliminate compounds with unfavorable properties before more computationally expensive binding affinity calculations.

**Chris Anderson - "Building a Scalable Data Pipeline for Molecular Simulation Analysis"**
Chris demonstrated the data pipeline infrastructure he built to process and analyze output from our molecular dynamics simulations. The pipeline, built with Python and Apache Airflow, automates trajectory analysis, quality control, and feature extraction.

Key features include:
- Automated trajectory processing for multiple simulation engines
- Real-time quality metrics and anomaly detection
- Integration with our machine learning training pipelines
- Dashboard for monitoring simulation progress

**Department Recognition:**
Both presentations were praised by the review panel for their technical depth and clear communication. Sam's work was highlighted as a model for undergraduate research contributions.

"Our undergraduates continue to impress with their ability to make meaningful contributions to cutting-edge research," said Dr. Martinez.` },
];
