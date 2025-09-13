import React, { useState } from 'react';
import { terms } from '../../data/glossary';

const GlossarySection = () => {
  const [simplified, setSimplified] = useState({});
  const [loading, setLoading] = useState({});
  const [videoUrl, setVideoUrl] = useState({});
  const [showExample, setShowExample] = useState({});

  const handleExplain = async (term, definition, regenerate = false) => {
    setLoading(prev => ({ ...prev, [term]: true }));
    try {
      const res = await fetch('http://localhost:5000/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term, definition, regenerate }),
      });
      const data = await res.json();
      setSimplified(prev => ({ ...prev, [term]: data.simplified }));
      setShowExample(prev => ({ ...prev, [term]: true })); // auto show example
    } catch (err) {
      console.error(err);
    }
    setLoading(prev => ({ ...prev, [term]: false }));
  };

  const handleGenerateVideo = async (term) => {
    setLoading(prev => ({ ...prev, [`video-${term}`]: true }));
    try {
      const res = await fetch('http://localhost:5000/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term }),
      });
      const data = await res.json();
      setVideoUrl(prev => ({ ...prev, [term]: data.videoUrl }));
    } catch (err) {
      console.error(err);
    }
    setLoading(prev => ({ ...prev, [`video-${term}`]: false }));
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-10">Options Trading Glossary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terms.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-blue-600">{item.term}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.category === 'Basic' ? 'bg-green-100 text-green-800' :
                item.category === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.category}
              </span>
            </div>
            <p className="text-gray-700">{item.definition}</p>

            {/* Explain Simply */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleExplain(item.term, item.definition)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {loading[item.term] ? 'Loading...' : 'Explain Simply'}
              </button>

              {simplified[item.term] && (
                <div className="mt-2 p-2 bg-gray-100 rounded-md">
                  {showExample[item.term] && <p>{simplified[item.term]}</p>}

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => alert('Great! You understood.')}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Understand
                    </button>
                    <button
                      onClick={() => handleExplain(item.term, item.definition, true)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Not Understand
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Video */}
            {simplified[item.term] && (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleGenerateVideo(item.term)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
                >
                  {loading[`video-${item.term}`] ? 'Generating...' : 'Watch Video'}
                </button>
                {videoUrl[item.term] && (
                  <iframe
                    src={videoUrl[item.term]}
                    title={item.term}
                    width="100%"
                    height="250"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mt-2 rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlossarySection;
