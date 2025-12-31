import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For tables, strikethrough, etc.
import { BookOpen, ExternalLink, Sparkles, SplitSquareHorizontal, FileText } from "lucide-react";
import { fetchArticles, fetchUpdatedByOriginalId } from "../api/articleApi";

export default function ArticleDetails() {
  const { id } = useParams();
  const [original, setOriginal] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [viewMode, setViewMode] = useState("updated"); // Options: 'original', 'updated', 'split'

  useEffect(() => {
    // Ideally, your API should support fetching a single article by ID to avoid loading all of them
    fetchArticles().then((articles) => {
      setOriginal(articles.find((a) => a._id === id));
    });
    fetchUpdatedByOriginalId(id).then(setUpdated);
  }, [id]);

  if (!original) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-64 w-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-xs font-semibold tracking-wider uppercase mb-4">
            Blog Post Analysis
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {original.title}
          </h1>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mt-8 bg-white/10 p-2 rounded-xl backdrop-blur-sm inline-flex">
            <ViewToggleButton 
              active={viewMode === 'original'} 
              onClick={() => setViewMode('original')}
              icon={<FileText size={18} />}
              label="Original"
            />
            <ViewToggleButton 
              active={viewMode === 'updated'} 
              onClick={() => setViewMode('updated')}
              icon={<Sparkles size={18} />}
              label="AI Enhanced"
            />
             {updated && (
              <ViewToggleButton 
                active={viewMode === 'split'} 
                onClick={() => setViewMode('split')}
                icon={<SplitSquareHorizontal size={18} />}
                label="Compare Side-by-Side"
              />
            )}
          </div>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-indigo-500/20 to-transparent opacity-50 blur-3xl rounded-bl-full pointer-events-none" />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className={`max-w-[90rem] mx-auto px-6 mt-12 transition-all duration-500`}>
        
        <div className={`grid gap-8 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          
          {/* ORIGINAL COLUMN */}
          {(viewMode === 'original' || viewMode === 'split') && (
            <BlogCard 
              title="Original Content" 
              content={original.content} 
              type="original"
            />
          )}

          {/* UPDATED COLUMN */}
          {(viewMode === 'updated' || viewMode === 'split') && updated && (
            <div className="flex flex-col gap-6">
              <BlogCard 
                title="AI Optimized Version" 
                content={updated.content} 
                type="updated" 
              />
              
              {/* References Section */}
              {updated.references && updated.references.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 overflow-hidden">
                  <div className="bg-indigo-50/50 px-8 py-4 border-b border-indigo-100 flex items-center gap-2">
                    <BookOpen size={20} className="text-indigo-600" />
                    <h3 className="font-bold text-indigo-900">Sources & References</h3>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {updated.references.map((ref, i) => (
                      <li key={i} className="group hover:bg-gray-50 transition-colors">
                        <a href={ref} target="_blank" rel="noopener noreferrer" className="block px-8 py-4 flex items-center justify-between">
                          <span className="text-sm text-gray-600 group-hover:text-indigo-600 truncate mr-4">{ref}</span>
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

// 1. A prettier button for toggling views
function ViewToggleButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-white text-indigo-900 shadow-lg scale-105' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// 2. The Card that renders Markdown
function BlogCard({ title, content, type }) {
  const isUpdated = type === 'updated';
  
  return (
    <div className={`relative bg-white rounded-3xl shadow-xl border overflow-hidden transition-all duration-500 hover:shadow-2xl
      ${isUpdated ? 'border-indigo-100 shadow-indigo-100/50' : 'border-gray-100'}`}>
      
      {/* Card Header */}
      <div className={`px-8 py-6 border-b flex items-center justify-between
        ${isUpdated ? 'bg-gradient-to-r from-indigo-50 to-white' : 'bg-gray-50'}`}>
        <h2 className={`text-xl font-bold flex items-center gap-2 
          ${isUpdated ? 'text-indigo-900' : 'text-gray-700'}`}>
          {isUpdated ? <Sparkles size={20} className="text-indigo-500" /> : <FileText size={20} className="text-gray-400" />}
          {title}
        </h2>
        {isUpdated && <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">New</span>}
      </div>

      {/* Content Renderer */}
      <div className="p-8">
        {/* 'prose' is a Tailwind Typography plugin class. 
            It automatically styles h1, h2, p, ul, blockquotes, etc. inside it.
        */}
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-600 prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}