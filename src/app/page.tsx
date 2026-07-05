/* eslint-disable @next/next/no-img-element */
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <>
      <Hero />

      <Countdown />

      <section className="section" id="fecha">
        <div className="wrap fecha__inner reveal">
          <span className="eyebrow">La Fecha</span>
          <h2 className="fecha__date">
            <span className="day">08</span> · Mayo · 2027
          </h2>
          <div className="fecha__where">Cartagena, Colombia</div>

          <div className="fecha__venues">
            <article className="fecha__card">
              <figure className="fecha__art">
                <img
                  src="/images/ceremony-art.png"
                  alt="Ilustración de la Catedral de Santa Catalina de Alejandría"
                />
              </figure>
              <div className="fecha__cardbody">
                <div className="fecha__type">La Ceremonia</div>
                <h3 className="fecha__name">
                  Catedral de Santa Catalina de Alejandría
                </h3>
                <div className="fecha__rule"></div>
                <div className="fecha__time">5:00 PM</div>
                <div className="fecha__place">Centro Histórico</div>
                <a
                  className="fecha__link"
                  href="https://maps.google.com/?q=Catedral+de+Santa+Catalina+de+Alejandr%C3%ADa+Cartagena"
                  target="_blank"
                  rel="noopener"
                >
                  Ver mapa
                </a>
              </div>
            </article>

            <article className="fecha__card">
              <figure className="fecha__art">
                <img
                  src="/images/reception-art.png"
                  alt="Ilustración del Hotel Charleston Santa Teresa"
                />
              </figure>
              <div className="fecha__cardbody">
                <div className="fecha__type">La Recepción</div>
                <h3 className="fecha__name">Hotel Charleston Santa Teresa</h3>
                <div className="fecha__rule"></div>
                <div className="fecha__time">6:00 PM</div>
                <div className="fecha__place">Plaza de Santa Teresa</div>
                <a
                  className="fecha__link"
                  href="https://maps.google.com/?q=Hotel+Charleston+Santa+Teresa+Cartagena"
                  target="_blank"
                  rel="noopener"
                >
                  Ver mapa
                </a>
              </div>
            </article>
          </div>

          <div className="fecha__flow">
            <div className="fecha__flow-item">
              <div className="fecha__flow-time">5:00</div>
              <div className="fecha__flow-what">Ceremonia</div>
            </div>
            <div className="fecha__flow-item">
              <div className="fecha__flow-time">6:00</div>
              <div className="fecha__flow-what">Recepción</div>
            </div>
            <div className="fecha__flow-item">
              <div className="fecha__flow-time">7:00</div>
              <div className="fecha__flow-what">Cóctel</div>
            </div>
            <div className="fecha__flow-item">
              <div className="fecha__flow-time">8:00</div>
              <div className="fecha__flow-what">Cena</div>
            </div>
            <div className="fecha__flow-item">
              <div className="fecha__flow-time">10:00</div>
              <div className="fecha__flow-what">Fiesta</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
