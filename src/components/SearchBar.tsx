// components/SearchBar.tsx
import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  query: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ query, handleSearch }: SearchBarProps) => {
  return (
    <div className="flex w-full border border-gray-300">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="bg-white text-gray-700 text-sm py-2 px-4 w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
      />
      <button className="bg-pink-500 text-white px-5 py-2 hover:bg-pink-600 transition duration-200">
                      <AiOutlineSearch size={20} />
                    </button>
    </div>
  );
};

export default SearchBar;
