import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Senior Wellness Assessment',
    description: 'A guided evaluation of mobility, energy, and comfort to shape the right care plan.',
    highlights: ['Personalized review', 'Comfort-first approach', 'Goal-oriented guidance']
  },
  {
    title: 'Mobility Coaching Session',
    description: 'Gentle movement support designed to build confidence, balance, and independence.',
    highlights: ['Low-impact exercises', 'Flexible scheduling', 'Progress tracking']
  },
  {
    title: 'Balance & Stability Program',
    description: 'Structured sessions focused on posture, coordination, and safe movement indoors or outdoors.',
    highlights: ['Balance drills', 'Home-friendly tips', 'Confidence boosting']
  },
  {
    title: 'Strength Recovery Plan',
    description: 'A resilient plan to restore strength gradually with professional oversight and flexibility.',
    highlights: ['Recovery-focused routine', 'Adaptive pacing', 'Ongoing support']
  }
];

const ServicesPage = () => {
  return (
    <div className="services-page">
      <section className="panel services-hero">
        <div>
          <p className="eyebrow">Explore services</p>
          <h2>Every session is designed to support comfort, confidence, and care.</h2>
          <p>Browse the wellness options available through KineticAge and move straight into booking when you are ready.</p>
        </div>
        <div className="services-actions">
          <Link className="btn-link" to="/">Book a session</Link>
          <Link className="btn-link secondary" to="/dashboard">View dashboard</Link>
        </div>
      </section>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
