
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error.message);
      setError(error.message);
    } else {
      setMatches(data || []);
      setError("");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="matches" id="matches">
        <h2>Upcoming IPL Matches</h2>

        {loading && <p>Loading matches...</p>}

        {error && <p>Unable to load matches: {error}</p>}

        {!loading && !error && matches.length === 0 && (
          <p>No matches available.</p>
        )}

        <div className="match-container">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              matchNumber={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
              price={match.price}
              availableSeats={match.available_seats}
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
