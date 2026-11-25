
function MatchCard(props) {
  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Match: {props.matchNumber}</p>

      <p>Date: {props.date}</p>

      <p>Venue: {props.venue}</p>

      <p>Tickets Selected: 1</p>

      <button onClick={() => alert("Ticket selected successfully!")}>
        Select Ticket
      </button>
    </div>
  );
}

export default MatchCard;
