import { useOutletContext } from "react-router-dom";
import { Users, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { teamHierarchyData } from "../data/teamHierarchyData";
import { useState } from "react";

export default function TeamHierarchy() {
      const { darkMode } = useOutletContext();
      const [zoom, setZoom] = useState(1);

      const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
      const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 overflow-hidden ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <Users /> Team Hierarchy
                        </h1>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                              <button onClick={handleZoomOut} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"><ZoomOut size={18} /></button>
                              <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                              <button onClick={handleZoomIn} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"><ZoomIn size={18} /></button>
                              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                              <button onClick={() => setZoom(1)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"><Maximize size={18} /></button>
                        </div>
                  </div>

                  <div
                        className="w-full h-[calc(100vh-140px)] overflow-auto flex justify-center p-10 cursor-grab active:cursor-grabbing border rounded-xl relative bg-opacity-50"
                        style={{
                              backgroundImage: `radial-gradient(${darkMode ? '#4b5563' : '#e5e7eb'} 1px, transparent 1px)`,
                              backgroundSize: '20px 20px'
                        }}
                  >
                        <div
                              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}
                        >
                              <OrgNode node={teamHierarchyData} darkMode={darkMode} />
                        </div>
                  </div>
            </div>
      );
}

function OrgNode({ node, darkMode }) {
      if (!node) return null;

      const hasChildren = node.children && node.children.length > 0;

      return (
            <div className="flex flex-col items-center">
                  <div className={`relative p-4 rounded-xl shadow-lg border-2 min-w-[180px] text-center z-10 transition-colors duration-300 ${darkMode
                              ? "bg-gray-800 border-blue-500 hover:bg-gray-700"
                              : "bg-white border-blue-200 hover:bg-blue-50"
                        }`}>
                        <div className="flex justify-center mb-2">
                              <img
                                    src={node.avatar}
                                    alt={node.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                              />
                        </div>
                        <h3 className="text-sm font-bold truncate">{node.name}</h3>
                        <p className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{node.role}</p>

                        {/* Connecting dot for children */}
                        {hasChildren && (
                              <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 z-20 ${darkMode ? "bg-blue-500 border-gray-900" : "bg-blue-200 border-white"}`}></div>
                        )}
                  </div>

                  {hasChildren && (
                        <div className="flex pt-8 relative">
                              {/* Vertical line from parent */}
                              <div className={`absolute top-0 left-1/2 w-0.5 h-8 -translate-x-1/2 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

                              {/* Horizontal connector line */}
                              {node.children.length > 1 && (
                                    <div className={`absolute top-8 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600`} style={{
                                          left: `calc(100% / ${node.children.length * 2})`,
                                          right: `calc(100% / ${node.children.length * 2})`
                                    }}></div>
                              )}

                              {node.children.map((child, index) => (
                                    <div key={child.id} className="px-4 relative">
                                          {/* Vertical line to child */}
                                          {/* We handle line logic via the horizonal bar above, but each child needs a connector up to that bar if not the only child, or directly up if only child */}
                                          <div className={`absolute -top-8 left-1/2 h-8 w-0.5 -translate-x-1/2 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

                                          <OrgNode node={child} darkMode={darkMode} />
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
}
