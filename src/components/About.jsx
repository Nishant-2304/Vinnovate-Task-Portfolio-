import statsData from "../data/about";
import "./About.css";

export default function Stats() {
  return (
    <section className="stats-section" id="about">
      <div className="stats-header">
        <h2>About Joey Logano</h2>
        <p>
          Joey Logano is an American professional stock car racing driver competing at the highest level of NASCAR. Known for his aggressive yet calculated driving style, Logano has established himself as one of the most consistent and competitive drivers of the modern era. With multiple championships and decades of experience, he represents the perfect blend of raw speed, race intelligence, and adaptability.
        </p>
      </div>

      <div className="stats-grid">
        {statsData.map((item, index) => (
          <div className="stats-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
