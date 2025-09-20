import LanguageSelector from './LanguageSelector';

const GovernmentBanner = () => {
  return (
    <div className="bg-green-700 text-white py-1 px-4 text-center text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <span>Official Website of Kerala Government</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <div className="language-selector px-2 rounded">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentBanner;
