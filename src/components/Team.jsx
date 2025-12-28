import teamData from "../data/cars";
import "./Team.css";

export default function Team() {
  return (
    <section className="team-section" id="team">
      <div className="team-header">
        <h2>Car Evolution</h2>
      </div>

      <div className="team-grid">
        {teamData.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>

            <div className="team-info">
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
