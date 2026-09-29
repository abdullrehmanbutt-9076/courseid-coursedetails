import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, BookOpen, Clock, Star, User } from 'lucide-react';
import { SAMPLE_COURSES } from '../../data/courses';

interface CoursesScreenProps {
  onNavigateToCourseDetails: (courseId: string) => void;
  onBack: () => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({
  onNavigateToCourseDetails,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Web & Mobile', 'Enterprise Software', 'Android Mobile', 'Computer Science', 'Artificial Intelligence'];

  const filteredCourses = useMemo(() => {
    let result = SAMPLE_COURSES;
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.courseId.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Top App Bar with Back Arrow */}
      <div className="h-14 px-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Back Arrow (popBackStack)"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">All Courses</h1>
        </div>
        <div className="text-xs font-semibold text-slate-500 pr-2">
          {filteredCourses.length} Found
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Search Bar (Requirement 15: Search by Course Name or Course ID) */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
            placeholder="Search by name or Course ID (e.g. PY101, Python)..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Search Tags for Prompt Requirements */}
        {!searchQuery && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
            <span>Quick search:</span>
            {['PY101', 'WD101', 'JV101'].map((id) => (
              <button
                key={id}
                onClick={() => setSearchQuery(id)}
                className="font-mono text-indigo-600 hover:underline cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        )}

        {/* Course Cards List */}
        {filteredCourses.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No courses found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              No matching courses for "{searchQuery}". Try searching "PY101" or "Python".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs text-indigo-600 font-semibold underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {filteredCourses.map((course) => (
              <div
                key={course.courseId}
                onClick={() => onNavigateToCourseDetails(course.courseId)}
                className="w-full text-left bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] block"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Course ID: {course.courseId}
                      </span>
                      {course.rating && (
                        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-600">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {course.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {course.instructor}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
