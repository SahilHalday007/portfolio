import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ExperienceSection from './components/ExperienceSection';
import FeaturedProject from './components/FeaturedProject';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';

export default function App() {
  return (
    <div className="cli-page" id="top">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <SiteHeader />
      <main className="cli-main">
        <Hero />
        <FeaturedProject />
        <AboutSection />
        <ProjectList />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
