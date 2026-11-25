
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {

  const matches = [
    {
      matchNumber: 1,
      team1: "CSK",
      team2: "MI",
      date: "20 April 2026",
      venue: "Chennai"
    },
    {
      matchNumber: 2,
      team1: "RCB",
      team2: "KKR",
      date: "22 April 2026",
      venue: "Bengaluru"
    },
    {
      matchNumber: 3,
      team1: "SRH",
      team2: "RR",
      date: "24 April 2026",
      venue: "Hyderabad"
    }
  ];

  return (
    <div>
      <Navbar />

      <Hero />

      <section className="matches" id="matches">
        <h2>Upcoming IPL Matches</h2>

        <div className="match-container">
          {matches.map((match) => (
            <MatchCard
              key={match.matchNumber}
              matchNumber={match.matchNumber}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
            />
          ))}
        </div>
      </section>

      <section className="booking" id="booking">
        <h2>Book Your IPL Tickets</h2>
        <p>Select your favourite match and enjoy the game!</p>
      </section>

      <footer id="about">
        <p>© 2026 IPL Ticket Booking. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
