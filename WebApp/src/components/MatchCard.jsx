
import { useState } from "react";
import { supabase } from "../supabase";

function MatchCard(props) {
  const [showBooking, setShowBooking] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  const ticketPrice = Number(props.price) || 0;
  const totalPrice = ticketPrice * tickets;

  async function handleBooking(event) {
    event.preventDefault();

    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    setBookingLoading(true);

    const { data, error } = await supabase.rpc(
      "book_ipl_tickets",
      {
        p_match_id: props.matchNumber,
        p_user_name: customerName.trim(),
        p_tickets: tickets,
      }
    );

    setBookingLoading(false);

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    alert(
      `Booking successful!\nBooking ID: ${data.booking_id}\nMatch: ${props.team1} vs ${props.team2}\nTickets: ${tickets}\nTotal: ₹${data.total_price}`
    );

    setShowBooking(false);
    setCustomerName("");
    setTickets(1);
  }

  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Match: {props.matchNumber}</p>
      <p>Date: {props.date}</p>
      <p>Venue: {props.venue}</p>
      <p>Ticket Price: ₹{ticketPrice}</p>
      <p>Available Seats: {props.availableSeats}</p>

      <button onClick={() => setShowBooking(true)}>
        Select Ticket
      </button>

      {showBooking && (
        <div className="booking-popup">
          <div className="booking-content">
            <h2>Book Your Tickets</h2>

            <p>{props.team1} vs {props.team2}</p>
            <p>{props.date} | {props.venue}</p>

            <form onSubmit={handleBooking}>
              <label>Customer Name</label>

              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                required
              />

              <label>Number of Tickets</label>

              <input
                type="number"
                min="1"
                max={props.availableSeats}
                value={tickets}
                onChange={(e) =>
                  setTickets(Math.max(1, Number(e.target.value)))
                }
                required
              />

              <h3>Total: ₹{totalPrice}</h3>

              <button type="submit" disabled={bookingLoading}>
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                type="button"
                onClick={() => setShowBooking(false)}
                disabled={bookingLoading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCard;
