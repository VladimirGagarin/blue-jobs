import "./Founders.css";
import DefaultPhoto from "../assets/logo.png";
import { useLanguage } from "./useUser";

export default function FoundersContent() {
  const { language } = useLanguage();

  const founders = [
    {
      name: language === "fr" ? "Simon O'Conner" : "Simon O'Conner",
      avatar: DefaultPhoto,
      role: language === "fr" ? "PDG & Visionnaire" : "CEO & Visionary",
      description:
        language === "fr"
          ? "Ancien recruteur tech qui a vu la frustration des deux côtés du processus. Passionné par la création de ponts authentiques entre talents et opportunités."
          : "Former tech recruiter who saw frustration on both sides of the hiring process. Passionate about creating authentic bridges between talent and opportunity.",
      quote:
        language === "fr"
          ? "Chaque personne mérite une chance de briller, pas juste un CV à parcourir."
          : "Every person deserves a chance to shine, not just a resume to skim.",
      dream:
        language === "fr"
          ? "Révolutionner la façon dont le monde travaille en rendant l'emploi aussi simple qu'une conversation"
          : "Revolutionizing how the world works by making employment as simple as a conversation",
    },
    {
      name: language === "fr" ? "Marcus Chen" : "Marcus Chen",
      avatar: DefaultPhoto,
      role:
        language === "fr" ? "Directeur Technique" : "Chief Technology Officer",
      description:
        language === "fr"
          ? "Ingénieur logiciel qui a construit des équipes distribuées à travers 3 continents. Croit que la technologie doit humaniser, pas automatiser."
          : "Software engineer who built distributed teams across 3 continents. Believes technology should humanize, not automate.",
      quote:
        language === "fr"
          ? "La meilleure technologie est celle que vous ne remarquez pas - elle se contente de créer des connexions."
          : "The best technology is what you don't notice - it just creates connections.",
      dream:
        language === "fr"
          ? "Construire une plateforme où chaque interaction professionnelle devient une opportunité de croissance mutuelle"
          : "Building a platform where every professional interaction becomes an opportunity for mutual growth",
    },
    {
      name: language === "fr" ? "David Rodriguez" : "David Rodriguez",
      avatar: DefaultPhoto,
      role:
        language === "fr"
          ? "Directeur de l'Expérience"
          : "Chief Experience Officer",
      description:
        language === "fr"
          ? "Designer d'expérience utilisateur avec une background en psychologie. Obsédé par l'élimination des frictions dans la recherche d'emploi."
          : "User experience designer with a background in psychology. Obsessed with eliminating friction in job searching.",
      quote:
        language === "fr"
          ? "Si vous ne pouvez pas trouver un travail en 3 clics, nous avons échoué."
          : "If you can't find work in 3 clicks, we've failed.",
      dream:
        language === "fr"
          ? "Créer un écosystème où les chercheurs d'emploi se sentent valorisés dès la première connexion"
          : "Creating an ecosystem where job seekers feel valued from the first connection",
    },
    {
      name: language === "fr" ? "Alexandre Dubois" : "Alexander Dubois",
      avatar: DefaultPhoto,
      role:
        language === "fr"
          ? "Directeur de la Croissance"
          : "Chief Growth Officer",
      description:
        language === "fr"
          ? "Entrepreneur en série qui a lancé 5 marketplaces réussies. Voit le potentiel illimité quand on aligne correctement l'offre et la demande."
          : "Serial entrepreneur who launched 5 successful marketplaces. Sees unlimited potential when supply and demand are properly aligned.",
      quote:
        language === "fr"
          ? "Le bon emploi ne devrait pas être une recherche - il devrait être une découverte."
          : "The right job shouldn't be a search - it should be a discovery.",
      dream:
        language === "fr"
          ? "Connecter un milliard de personnes à leur vocation idéale d'ici 2030"
          : "Connecting one billion people to their ideal vocation by 2030",
    },
  ];

  const pageContent = {
    en: {
      title: "The Visionaries Behind Blue Jobs",
      subtitle:
        "Meet the dreamers who believe every connection should lead to opportunity",
      missionTitle: "Our Collective Dream",
      missionText:
        "We're not just building a job platform - we're creating a world where talent meets opportunity without barriers, where every handshake digital or real leads to mutual growth.",
      forJobSeekers: "For Job Seekers",
      jobSeekerText:
        "We see you not as applicants, but as individuals with unique stories, skills, and aspirations waiting to be discovered.",
      forEmployers: "For Employers",
      employerText:
        "We help you find not just skills, but passion. Not just employees, but partners in your mission.",
      teamQuote:
        "Four backgrounds, one vision: to make meaningful work accessible to all.",
    },
    fr: {
      title: "Les Visionnaires derrière Blue Jobs",
      subtitle:
        "Rencontrez les rêveurs qui croient que chaque connexion devrait mener à une opportunité",
      missionTitle: "Notre Rêve Collectif",
      missionText:
        "Nous ne construisons pas juste une plateforme d'emploi - nous créons un monde où le talent rencontre l'opportunité sans barrières, où chaque poignée de main digitale ou réelle mène à une croissance mutuelle.",
      forJobSeekers: "Pour les Chercheurs d'Emploi",
      jobSeekerText:
        "Nous vous voyons non pas comme des candidats, mais comme des individus avec des histoires, compétences et aspirations uniques attendant d'être découvertes.",
      forEmployers: "Pour les Employeurs",
      employerText:
        "Nous vous aidons à trouver non pas juste des compétences, mais de la passion. Pas juste des employés, mais des partenaires dans votre mission.",
      teamQuote:
        "Quatre parcours, une vision : rendre le travail significatif accessible à tous.",
    },
  };

  const content = pageContent[language];

  return (
    <div className="founders-page">
      <header className="founders-header">
        <h1>{content.title}</h1>
        <p className="subtitle">{content.subtitle}</p>
      </header>

      <section className="mission-section">
        <h2>{content.missionTitle}</h2>
        <p className="mission-text">{content.missionText}</p>
      </section>

      <div className="audience-sections">
        <section className="audience-card job-seekers">
          <h3>{content.forJobSeekers}</h3>
          <p>{content.jobSeekerText}</p>
        </section>

        <section className="audience-card employers">
          <h3>{content.forEmployers}</h3>
          <p>{content.employerText}</p>
        </section>
      </div>

      <section className="founders-grid">
        {founders.map((founder, index) => (
          <div key={index} className="founder-card">
            <div className="founder-image">
              <img src={founder.avatar} alt={founder.name} />
              <div className="founder-overlay">
                <p className="quote">"{founder.quote}"</p>
              </div>
            </div>
            <div className="founder-info">
              <h3>{founder.name}</h3>
              <p className="role">{founder.role}</p>
              <p className="description">{founder.description}</p>
              <div className="dream">
                <strong>🎯 {language === "fr" ? "Rêve" : "Dream"}:</strong>
                <span>{founder.dream}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="founders-footer">
        <p className="team-quote">"{content.teamQuote}"</p>
      </footer>
    </div>
  );
}
