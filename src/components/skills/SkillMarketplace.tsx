import React, { useState } from 'react';
import { CheckCircle, ChevronDown, Download, Github, Package, Search, Star } from 'lucide-react';
import { useSkillStore } from '../../store/skillStore';
import { SkillCategory, SkillMarketplaceListing } from '../../types/skills';

const SkillMarketplace: React.FC = () => {
  const { marketplaceListings, installSkill, skills } = useSkillStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [installingId, setInstallingId] = useState<string | null>(null);

  const categories: { value: SkillCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Skills' },
    { value: 'search', label: 'Search & Retrieval' },
    { value: 'browser', label: 'Browser Automation' },
    { value: 'communication', label: 'Communication' },
    { value: 'content', label: 'Content Creation' },
    { value: 'automation', label: 'Workflow Automation' },
    { value: 'development', label: 'Development' },
    { value: 'data', label: 'Data Processing' },
    { value: 'social', label: 'Social Media' },
    { value: 'system', label: 'System Tools' }
  ];

  const filteredListings = marketplaceListings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isInstalled = (skillId: string) => skills.some((skill) => skill.id === skillId);

  const handleInstall = async (listing: SkillMarketplaceListing) => {
    setInstallingId(listing.id);
    try {
      await installSkill(listing);
      setTimeout(() => setInstallingId(null), 800);
    } catch {
      setInstallingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Skill Marketplace</h1>
        <div className="text-sm text-gray-400">{marketplaceListings.length} skills available</div>
      </div>

      <div className="rounded-xl border border-gray-800 bg-dark-200 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills by name or description..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-dark-300 py-2 pl-10 pr-4 text-white focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value as SkillCategory | 'all')}
              className="appearance-none rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 pr-10 text-white focus:border-primary-500 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredListings.map((listing) => {
          const installed = isInstalled(listing.id);
          const installing = installingId === listing.id;

          return (
            <div
              key={listing.id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-dark-200 transition-colors hover:border-primary-500/50"
            >
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{listing.name}</h3>
                    <p className="text-sm text-gray-400">by {listing.author} • v{listing.version}</p>
                  </div>
                  {installed && (
                    <span className="flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Installed
                    </span>
                  )}
                </div>

                <p className="mb-4 text-sm text-gray-300">{listing.description}</p>

                <div className="mb-4 flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Download className="mr-1 h-4 w-4" />
                    {listing.downloads.toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Star className="mr-1 h-4 w-4 text-yellow-500" />
                    {listing.rating}
                  </div>
                </div>

                <div className="mb-4 overflow-x-auto rounded-lg bg-dark-300 p-2 font-mono text-xs text-gray-400">
                  {listing.installCommand}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleInstall(listing)}
                    disabled={installed || installing}
                    className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-2 ${
                      installed
                        ? 'cursor-not-allowed bg-gray-700 text-gray-400'
                        : installing
                        ? 'cursor-wait bg-primary-600/50 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {installing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Installing...</span>
                      </>
                    ) : installed ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Installed</span>
                      </>
                    ) : (
                      <>
                        <Package className="h-4 w-4" />
                        <span>Install</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`https://github.com/${listing.repository}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-dark-300 p-2 text-gray-400 transition-colors hover:bg-dark-100 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="rounded-xl border border-gray-800 bg-dark-200 p-12 text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No skills found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default SkillMarketplace;
