// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function EventTracker({ email }) {
// //   const [events, setEvents] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!email) return;

// //     axios
// //       .get(`https://hr-management-backend-sable.vercel.app/api/events/employee/${email}`)
// //       .then(res => setEvents(res.data))
// //       .catch(err => console.error(err))
// //       .finally(() => setLoading(false));
// //   }, [email]);

// //   if (loading) {
// //     return <div className="bg-white p-10 rounded-xl shadow">Loading events...</div>;
// //   }

// //   if (events.length === 0) {
// //     return (
// //       <div className="bg-white p-10 rounded-xl shadow text-gray-500">
// //         No events scheduled for you.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow space-y-4">
// //       <h2 className="text-xl font-bold mb-4">My Events</h2>

// //       {events.map(event => (
// //         <div
// //           key={event._id}
// //           className="border rounded-lg p-4 flex justify-between items-start"
// //         >
// //           <div>
// //             <h3 className="font-semibold">{event.title}</h3>
// //             <p className="text-sm text-gray-500">{event.type}</p>
// //             <p className="text-sm mt-1">
// //               {new Date(event.date).toDateString()} • {event.time}
// //             </p>
// //             {event.meetingLink && (
// //               <a
// //                 href={event.meetingLink}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="text-blue-600 text-sm mt-1 inline-block"
// //               >
// //                 Join Meeting
// //               </a>
// //             )}
// //           </div>

// //           <span
// //             className={`text-xs px-3 py-1 rounded-full ${
// //               event.status === "Scheduled"
// //                 ? "bg-blue-100 text-blue-700"
// //                 : event.status === "Completed"
// //                 ? "bg-green-100 text-green-700"
// //                 : "bg-red-100 text-red-700"
// //             }`}
// //           >
// //             {event.status}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function EventTracker() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // const employeeEmail = "kayalabhi04@gmail.com";
//   const user = JSON.parse(localStorage.getItem("user"));
//   const employeeEmail = user?.email;

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get(
//           `https://hr-management-backend-sable.vercel.app/api/events/employee/${employeeEmail}`
//         );

//         console.log("Fetched events 👉", res.data); // ✅ PRINT IN CONSOLE
//         setEvents(res.data);
//       } catch (err) {
//         console.error("Event fetch error:", err);
//         setError("Failed to load events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading events...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">Event Tracker</h2>

//       {/* ✅ PRINT RAW JSON (FOR DEBUG) */}
//       <pre className="bg-gray-100 p-4 rounded text-xs mb-4 overflow-auto">
//         {JSON.stringify(events, null, 2)}
//       </pre>

//       {/* ✅ HUMAN READABLE UI */}
//       {events.length === 0 ? (
//         <p className="text-gray-500">No events scheduled for you.</p>
//       ) : (
//         <div className="space-y-4">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="border rounded-lg p-4 flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="font-semibold">{event.title}</h3>
//                 <p className="text-sm text-gray-500">
//                   {new Date(event.date).toDateString()} • {event.time}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Type: {event.type}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <span
//                   className={`px-3 py-1 rounded text-xs font-medium ${
//                     event.status === "Scheduled"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-green-100 text-green-700"
//                   }`}
//                 >
//                   {event.status}
//                 </span>

//                 {event.meetingLink && (
//                   <div className="mt-2">
//                     <a
//                       href={event.meetingLink}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 text-sm underline"
//                     >
//                       Join Meeting
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function EventTracker() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const employeeEmail = user?.email;

  // useEffect(() => {
  //   if (!employeeEmail) return;

  //   const fetchEvents = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://hr-management-backend-sable.vercel.app/api/events/employee/${employeeEmail}`
  //       );
  //       setEvents(res.data || []);
  //       console.log("Fetched events 👉", res.data);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to load events");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, [employeeEmail]);


  useEffect(() => {
  if (!employeeEmail) return;

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `https://hr-management-backend-sable.vercel.app/api/events/employee/${employeeEmail}`
      );
      setEvents(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [employeeEmail]);


  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading meetings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Upcoming & Recent Meetings
        </h2>

        <select className="border px-3 py-1 rounded text-sm">
          <option>All Meetings</option>
        </select>
      </div>

      {/* EVENTS LIST */}
      {events.length === 0 ? (
  <p className="text-gray-500">No meetings scheduled.</p>
) : (
  <div className="divide-y">
    {events.map((event) => (
      <div
        key={event._id}
        className="py-4 flex flex-col md:flex-row md:justify-between gap-4"
      >
        {/* LEFT SIDE */}
        <div className="flex gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          <div>
            {/* TITLE */}
            <h3 className="font-semibold text-base">
              {event.title || "Meeting with hr"}
            </h3>

            {/* ORGANIZER */}
            <p className="text-sm text-gray-500">
              Organized by {event.employeeName}
            </p>
            <p className="text-sm text-gray-500">
              Description - {event.description}
            </p>

            {/* DATE & TIME */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
              {event.meetingDate && (
                <span>
                  📅{" "}
                  {new Date(event.meetingDate).toLocaleDateString()}
                </span>
              )}

              {event.meetingTime && (
                <span>⏰ {event.meetingTime}</span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {/* STATUS */}
          {event.status && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.status === "Scheduled"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {event.status}
            </span>
          )}

          {/* PRIORITY */}
          {event.priority && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.priority === "High"
                  ? "bg-orange-100 text-orange-700"
                  : event.priority === "Critical"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {event.priority}
            </span>
          )}

          {/* MEETING TYPE */}
          {event.meetingType && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
              {event.meetingType}
            </span>
          )}

          {/* JOIN BUTTON */}
          {event.meetingLink && (
            <a
              href={event.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700"
            >
              Join
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
