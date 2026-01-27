// import { useOutletContext } from "react-router-dom";
// import { 
//     Bot, 
//     ChevronDown, 
//     ArrowUpRight, 
//     Lightbulb, 
//     Send, 
//     Plus, // New icon for the attachment button
//     Image, // New icon for Image upload option
//     Video, // New icon for Video upload option
//     File,  // New icon for File upload option
//     Info 
// } from "lucide-react";
// import { useState } from "react";

// // Component for the new upload dropdown items
// const UploadOption = ({ icon: Icon, label, darkMode }) => (
//     <button
//         // Using a functional approach for demonstration, replace with actual upload handlers
//         onClick={() => alert(`Simulating ${label} upload...`)} 
//         className={`
//             w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200
//             ${darkMode 
//                 ? "hover:bg-gray-700 text-gray-200" 
//                 : "hover:bg-gray-100 text-gray-700"
//             }
//         `}
//     >
//         <Icon size={20} className="flex-shrink-0 text-fuchsia-500 dark:text-cyan-400" />
//         <span className="text-sm font-medium">{label}</span>
//     </button>
// );


// export default function AiAssistant() {
//     // Assuming useOutletContext provides a 'darkMode' boolean
//     const { darkMode } = useOutletContext(); 
//     const [query, setQuery] = useState(""); 
//     // State to manage the visibility of the upload dropdown
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

//     const segments = [
//         "Disaster Prone Homeowners: Assess risk factors and policy gaps.",
//         "Freelancers & Gig Economy: Guide through tax implications and benefits.",
//         "Seniors Aging in Place: Recommendations for necessary home modifications.",
//         "Researcher Walk Through: Summarize competitive landscape for new product.",
//     ];

//     // Card component for cleaner rendering (omitted for brevity, assume it remains the same)
//     // ... SegmentCard component definition here ...
//     const SegmentCard = ({ title, isHighlighted }) => {
//         const primaryTitle = title.split(":")[0].trim();
//         const description = title.split(":")[1]?.trim();

//         // Sets the input value to the segment title when clicked
//         const handleCardClick = () => {
//             setQuery(primaryTitle);
//         };

//         return (
//             <button
//                 onClick={handleCardClick} 
//                 className={`
//                     relative rounded-xl border p-4 text-left flex flex-col justify-between h-full
//                     transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl
//                     group // Added group class for hover effects on children
//                     ${darkMode 
//                         ? "border-gray-700 bg-gray-800 hover:border-cyan-500/50" 
//                         : "border-gray-200 bg-white hover:border-fuchsia-700/50"
//                     }
//                     ${isHighlighted 
//                         ? 'ring-2 ring-offset-2 ring-fuchsia-500 dark:ring-cyan-500 ring-opacity-50 ring-offset-white dark:ring-offset-gray-800' 
//                         : ''
//                     }
//                 `}
//             >
//                 <div className="flex flex-col gap-2">
//                     <div className="flex items-start gap-2">
//                         {/* Dynamic color for icon based on Dark Mode */}
//                         <Lightbulb size={18} className="text-fuchsia-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
//                         <p className="text-base font-semibold leading-snug">
//                             {primaryTitle}
//                         </p>
//                     </div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                        {description}
//                     </p>
//                 </div>
                
//                 {/* Footer with action button */}
//                 <div className="flex items-center justify-between mt-4 text-sm pt-2 border-t border-dashed border-gray-200 dark:border-gray-700/50">
//                     <span className="text-fuchsia-600 dark:text-cyan-400 font-semibold text-sm transition-colors group-hover:underline">
//                         Use Prompt
//                     </span>
//                     {/* Hover effect on arrow */}
//                     <ArrowUpRight size={18} className="text-gray-500 transition-transform duration-200 group-hover:text-fuchsia-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                 </div>
//             </button>
//         );
//     };


//     return (
//         <div
//             className={`min-h-screen ml-64 mt-16 px-6 py-10 transition-colors duration-300 ${
//                 darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//             }`}
//         >
//             <div className="max-w-5xl mx-auto space-y-10">
                
//                 {/* Header & Title Section (omitted for brevity, assume it remains the same) */}
//                 <div className="flex flex-col items-center text-center gap-2">
//                     {/* Bot Title with Gradient/Accent Color */}
//                     <div className="flex items-center gap-2 text-fuchsia-600 dark:text-cyan-400 font-semibold">
//                         <Bot size={28} />
//                         <span className="text-2xl font-bold">Resight AI Assistant</span>
//                     </div>
                    
//                     {/* Main Headline with Gradient Text */}
//                     <h1 className="text-4xl font-extrabold max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-700">
//                         Ask, Analyze, and Act with Intelligence
//                     </h1>
                    
//                     {/* Segment Selector Dropdown */}
//                     <div
//                         className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mt-3 transition-colors cursor-pointer shadow-md ${
//                             darkMode
//                                 ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
//                                 : "border-gray-200 bg-white hover:bg-gray-100"
//                         }`}
//                     >
//                         <span className="text-gray-500">Target Segment: Disaster Prone Homeowners</span>
//                         <ChevronDown size={18} className="text-gray-500" />
//                     </div>
//                 </div>


//                 {/* AI Interaction Area (The main card container) */}
//                 <div
//                     className={`rounded-3xl shadow-2xl p-6 sm:p-10 border transition-colors duration-300 ${
//                         darkMode
//                             ? "bg-gray-800 border-gray-700/50"
//                             : "bg-white border-gray-100/50"
//                     }`}
//                 >
                    
//                     {/* Elevated Input Field with Attachment Dropdown */}
//                     <div className="relative mb-10">
                        
//                         {/* Attachment/Plus Button */}
//                         <button
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-200 z-10
//                                 ${darkMode 
//                                     ? "text-gray-400 hover:bg-gray-600" 
//                                     : "text-gray-500 hover:bg-gray-200"
//                                 }
//                             `}
//                             aria-label="Attach File"
//                         >
//                             <Plus size={22} className={`
//                                 transition-transform duration-300 
//                                 ${isDropdownOpen ? "rotate-45" : "rotate-0"}
//                             `} />
//                         </button>

//                         {/* Dropdown Menu for Upload Options */}
//                         {isDropdownOpen && (
//                             <div
//                                 className={`absolute left-0 bottom-[calc(100%+10px)] w-56 rounded-xl shadow-2xl p-2 z-20 
//                                     ${darkMode 
//                                         ? "bg-gray-700 border border-gray-600" 
//                                         : "bg-white border border-gray-200"
//                                     }
//                                 `}
//                             >
//                                 <UploadOption icon={Image} label="Upload Image" darkMode={darkMode} />
//                                 <UploadOption icon={Video} label="Upload Video" darkMode={darkMode} />
//                                 <UploadOption icon={File} label="Upload Document" darkMode={darkMode} />
//                             </div>
//                         )}

//                         <input
//                             type="text"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                             // Increased left padding to accommodate the attachment button and its area
//                             placeholder="Type your question or choose a starting prompt below..."
//                             className={`w-full py-4 pl-14 pr-24 rounded-2xl border-2 text-lg font-medium transition-colors duration-300 shadow-lg ${
//                                 darkMode
//                                     ? "bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-cyan-400"
//                                     : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-fuchsia-700"
//                             }`}
//                         />
//                         {/* Send Button with Gradient */}
//                         <button
//                             type="submit"
//                             disabled={!query.trim()}
//                             className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl text-white transition-all duration-300 shadow-xl ${
//                                 query.trim()
//                                     ? "bg-gradient-to-r from-cyan-400 to-fuchsia-700 hover:scale-[1.03]"
//                                     : "bg-gray-400 cursor-not-allowed"
//                             }`}
//                         >
//                             <Send size={22} />
//                         </button>
//                     </div>

//                     {/* Quick Start Prompts (Segments) */}
//                     {/* <div className="space-y-4">
//                         <div className="flex items-center gap-2">
//                             <Info size={18} className="text-gray-500" />
//                             <p className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
//                                 Quick Start Prompts
//                             </p>
//                         </div>
//                         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                             {segments.map((segment, index) => (
//                                 <SegmentCard 
//                                     key={index} 
//                                     title={segment} 
//                                 />
//                             ))}
//                         </div>
//                     </div> */}
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useOutletContext } from "react-router-dom";
import {
  Bot,
  ChevronDown,
  ArrowUpRight,
  Lightbulb,
  Send,
  Plus,
  Image,
  Video,
  File,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

/* Upload dropdown item */
const UploadOption = ({ icon: Icon, label, darkMode }) => (
  <button
    onClick={() => alert(`${label} upload coming soon`)}
    className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
    }`}
  >
    <Icon size={18} className="text-fuchsia-500 dark:text-cyan-400" />
    <span className="text-sm">{label}</span>
  </button>
);

export default function AiAssistant() {
  const { darkMode } = useOutletContext();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chatRef = useRef(null);

  /* Auto-scroll */
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* Send message */
const handleSend = async () => {
  if (!query.trim()) return;

  const userText = query;

  // Add user message to UI
  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText },
  ]);

  setQuery("");
  setLoading(true);

  try {
    const res = await fetch("https://hr-management-r9e3.vercel.app/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        history: messages
          .filter(m => typeof m.text === "string")
          .map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "model", text: data.reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "model", text: "AI failed to respond." },
    ]);
  } finally {
    setLoading(false);
  }
};



  return (
    <div
      className={`min-h-screen ml-64 mt-16 px-6 py-10 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2 text-fuchsia-600 dark:text-cyan-400">
            <Bot size={28} />
            <span className="text-2xl font-bold">Resight AI Assistant</span>
          </div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-700 bg-clip-text text-transparent">
            Ask, Analyze, and Act with Intelligence
          </h1>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm ${
              darkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-white"
            }`}
          >
            Target Segment: Disaster Prone Homeowners
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Chat Container */}
        <div
          className={`rounded-3xl shadow-2xl border p-6 flex flex-col ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto space-y-4 mb-6"
          >
          {messages.map((msg, i) => (
  <div
    key={i}
    className={`p-4 rounded-xl max-w-[80%] whitespace-pre-wrap ${
      msg.role === "user"
        ? "ml-auto bg-fuchsia-600 text-white"
        : "mr-auto bg-gray-200 dark:bg-gray-700"
    }`}
  >
    {msg.text || " "}
  </div>
))}


            {loading && (
              <div className="mr-auto p-4 rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative">
            {/* Plus */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <Plus
                size={20}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            {/* Upload dropdown */}
            {dropdownOpen && (
              <div
                className={`absolute bottom-full left-0 mb-2 w-56 rounded-xl shadow-xl p-2 z-10 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <UploadOption
                  icon={Image}
                  label="Upload Image"
                  darkMode={darkMode}
                />
                <UploadOption
                  icon={Video}
                  label="Upload Video"
                  darkMode={darkMode}
                />
                <UploadOption
                  icon={File}
                  label="Upload Document"
                  darkMode={darkMode}
                />
              </div>
            )}

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask your question..."
              className={`w-full py-4 pl-14 pr-20 rounded-2xl border-2 text-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                  : "bg-gray-50 border-gray-200"
              }`}
            />

            <button
              onClick={handleSend}
              disabled={!query.trim() || loading}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl text-white ${
                query.trim()
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
