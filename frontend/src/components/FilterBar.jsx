const CATEGORIES = [
  'All',
  'Web Development',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Data Structures',
  'Music',
  'Gaming',
  'Trending',
];

const FilterBar = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === cat
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;