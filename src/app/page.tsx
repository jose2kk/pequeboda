import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

// ============================================
// CUSTOMIZE YOUR WEDDING DETAILS HERE
// ============================================
const WEDDING = {
  // Names displayed on the hero and footer
  name1: "Ana",
  name2: "Jose",

  fullName1: "Ana Isabel",
  fullName2: "José Andrés",

  // Wedding date in ISO format (YYYY-MM-DD)
  date: "2027-05-08",

  // How the date is displayed in the Save the Date section
  dateDisplay: "8 de Mayo, 2027",

  // Venue details
  venue: "Cartagena",
  location: "Cartagena, Colombia",

  // Wedding hashtag (optional — set to undefined to hide)
  hashtag: "#PequeBoda",
};

export default function Home() {
  return (
    <main>
      <Navigation name1={WEDDING.name1} name2={WEDDING.name2} />

      <div id="home">
        <Hero
          name1={WEDDING.name1}
          name2={WEDDING.name2}
          date={WEDDING.dateDisplay}
          location={WEDDING.location}
        />
      </div>

      <div id="save-the-date">
        <SaveTheDate
          date={WEDDING.dateDisplay}
          venue={WEDDING.venue}
          location={WEDDING.location}
        />
      </div>

      <Countdown targetDate={WEDDING.date} />

      <Footer
        name1={WEDDING.fullName1}
        name2={WEDDING.fullName2}
        hashtag={WEDDING.hashtag}
      />
    </main>
  );
}
