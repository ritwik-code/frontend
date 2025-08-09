import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter } from 'lucide-react';
import { indicatorsApi } from '../../api/services';
import { Indicator, IndicatorCategory } from '../../types';

const IndicatorExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: categories = [] } = useQuery({
    queryKey: ['indicator-categories'],
    queryFn: indicatorsApi.getCategories,
  });

  const { data: indicators = [], isLoading } = useQuery({
    queryKey: ['indicators', selectedCategory],
    queryFn: () => indicatorsApi.getIndicators(selectedCategory),
  });

  const filteredIndicators = indicators.filter(indicator =>
    indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Technical Indicators
        </h1>
        <p className="text-gray-600">
          Explore and learn about various technical indicators for stock analysis
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search indicators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === ''
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.slug
                ? 'text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedCategory === category.slug ? category.color : '#f3f4f6',
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Indicators Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIndicators.map((indicator) => (
            <IndicatorCard key={indicator.id} indicator={indicator} />
          ))}
        </div>
      )}

      {filteredIndicators.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No indicators found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

interface IndicatorCardProps {
  indicator: Indicator;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
          <span
            className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white mt-1"
            style={{ backgroundColor: indicator.category.color }}
          >
            {indicator.category.name}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {indicator.description}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Formula</h4>
              <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                {indicator.formula}
              </p>
            </div>
            {indicator.tutorial_url && (
              <a
                href={indicator.tutorial_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Tutorial →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndicatorExplorer;
