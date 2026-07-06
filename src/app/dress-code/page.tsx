import type { Metadata } from "next";
import PinterestBoard from "@/components/PinterestBoard";

const PINTEREST_BOARD_URL =
  "https://www.pinterest.com/anatudares/dresscode-pequeboda/";

export const metadata: Metadata = {
  title: "Dress Code — Ana Isabel & José Andrés",
  description: "Código de vestimenta para nuestra celebración en Cartagena.",
};

export default function DressCodePage() {
  return (
    <>
      {/* Warm up Pinterest's connections before pinit.js runs — cuts DNS/TLS
          setup latency for the embedded board, noticeably on mobile Safari. */}
      <link rel="preconnect" href="https://assets.pinterest.com" />
      <link rel="preconnect" href="https://widgets.pinterest.com" />
      <link rel="preconnect" href="https://i.pinimg.com" />
      <link rel="dns-prefetch" href="https://assets.pinterest.com" />
      <link rel="dns-prefetch" href="https://widgets.pinterest.com" />
      <link rel="dns-prefetch" href="https://i.pinimg.com" />

      <header className="page-hero">
        <span className="eyebrow">El Código de Vestimenta</span>
        <h1 className="page-hero__title">
          Dress <em>Code</em>
        </h1>
        <p className="page-hero__lead">
          Aquí algunas guías para acompañarnos.
        </p>
      </header>

      <section className="section">
        <div className="wrap code reveal">
          <div className="code__label">La Etiqueta</div>
          <div className="code__name">Formal — Etiqueta</div>
          <p className="code__note">
            Una celebración de noche en el Centro Histórico. Vístete formal y
            fresco: la temperatura es cálida y la fiesta, larga.
          </p>

          <div className="guides">
            <article className="guide reveal">
              <div className="guide__for">Para Ellas</div>
              <h2 className="guide__title">Vestido largo o de cóctel</h2>
              <ul className="guide__list">
                <li>Vestido largo</li>
              </ul>
            </article>

            <article className="guide reveal">
              <div className="guide__for">Para Ellos</div>
              <h2 className="guide__title">Traje completo</h2>
              <ul className="guide__list">
                <li>Traje formal o tropical</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap inspo reveal">
          <span className="eyebrow">Inspiración</span>
          <h2 className="inspo__title">Nuestro Tablero de Ideas</h2>
          <PinterestBoard boardUrl={PINTEREST_BOARD_URL} />
          <div className="inspo__cta">
            <a
              className="btn btn--ghost"
              href={PINTEREST_BOARD_URL}
              target="_blank"
              rel="noopener"
            >
              Ver tablero completo en Pinterest
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap avoid reveal">
          <span className="eyebrow">Un detalle</span>
          <h2 className="avoid__title">
            Por favor, reserva el <em>blanco</em> para la novia
          </h2>
          <p className="avoid__note">
            Evitar el blanco, marfil y beige claro.
          </p>
        </div>
      </section>
    </>
  );
}
