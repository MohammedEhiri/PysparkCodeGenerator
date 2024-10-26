import React, {  useEffect, useCallback , useRef, useState,  Suspense, lazy} from 'react';


import {Mail ,Linkedin, Instagram, Twitter, ChevronRight,ArrowDown, Search, Mic, Copy, Download, Filter } from 'lucide-react';
import CodeDisplay from './CodeDisplay';
import './App.css';

const PaiSPARKLandingPage = () => {
  const [activeLogo, setActiveLogo] = useState(0); // State to manage which logo to show
  const [input, setInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedCode, setDisplayedCode] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const iconSize = 25;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100); // Start animation after page load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedCode('');
    setDisplayedCode('');
    setShowDescription(false);
    setCopySuccess(false);

    try {
      const response = await fetch('https://17e3-35-193-13-28.ngrok-free.app/generate_code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedCode(data.code);
        revealCode(data.code);
      } else {
        setError(data.detail || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to fetch from the server');
    } finally {
      setLoading(false);
    }
  };

  const revealCode = (code) => {
    let index = -1;
    const interval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode((prev) => prev + code[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // UseCallback to memoize the toggleLogo function
  const toggleLogo = useCallback(() => {
    setActiveLogo((prevLogo) => (prevLogo === 0 ? 1 : 0)); // Toggle between 0 and 1
  }, []);

  // Use effect to alternate logos every 2 seconds
  useEffect(() => {
    const interval = setInterval(toggleLogo, 2000); // 2-second interval
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [toggleLogo]);

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated_pyspark_code.py';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const PaiSparkLoader = ({ size = 50, color = '#32cd32' }) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            .spark {
              transform-origin: center;
              animation: spark 1.5s infinite ease-in-out;
            }
            .spark:nth-child(2) { animation-delay: 0.2s; }
            .spark:nth-child(3) { animation-delay: 0.4s; }
            .spark:nth-child(4) { animation-delay: 0.6s; }
            @keyframes spark {
              0%, 100% { transform: scale(0.5); opacity: 0.3; }
              50% { transform: scale(1); opacity: 1; }
            }
            .orbit {
              transform-origin: center;
              animation: orbit 8s infinite linear;
            }
            @keyframes orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <g className="orbit">
          <rect x="5" y="5" width="40" height="40" fill="none" stroke={color} strokeWidth="2" strokeDasharray="14 14" />
        </g>
        <g className="spark">
          <rect x="22" y="2" width="10" height="10" fill={color} />
        </g>
        <g className="spark">
          <rect x="42" y="22" width="6" height="6" fill={color} />
        </g>
        <g className="spark">
          <rect x="22" y="42" width="6" height="6" fill={color} />
        </g>
        <g className="spark">
          <rect x="2" y="22" width="6" height="6" fill={color} />
        </g>
      </svg>
    );
  };

  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it is visible
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);




  
  return (
    <div>
      {/* First Section */}
      <section className="flex flex-col h-[80vh] mb-0 bg-dot-pattern">
        {/* Header with new rounded container */}
        <header className="flex justify-center py-6 bg-white">
          <div className="fixed top-0 left-0 right-0 flex justify-between items-center w-[90%] max-w-2xl bg-gray-200 bg-opacity-50 backdrop-blur-md rounded-full px-4 py-3 z-50 mx-auto mt-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 text-black font-extrabold text-2xl">
              <span>PaiSPARK</span>
            </div>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full px-2 py-2">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search ..."
                className="bg-transparent outline-none"
                aria-label="Search in Web"
              />
            </div>
            <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden border border-gray-500">
              <img
                src="/profile.jpeg"
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          {/* Title */}
          <h1 className={`text-7xl font-bold text-black ${animate ? 'swipe-up' : ''}`}>
          Transform Natural Language<br /> into PySpark Code.
          </h1>

          {/* Subtitle */}
          <p className={`text-xl text-gray-600 m-8 ${animate ? 'swipe-up-delayed' : ''}`}>
          AI-powered assistant for effortlessly generating
          efficient and scalable PySpark code.<br /> Accelerate your data engineering workflow.
          </p>

          {/* Buttons */}
          <div className={`lex space-x-4 ${animate ? 'swipe-up-delayed' : ''}`}>
          <button className="inline-flex items-center justify-center text-black font-semibold border border-gray-400 rounded-full px-6 py-2 hover:bg-gray-100 transition duration-300">
          Try It Now <ArrowDown className="ml-2" size={22} />
            </button>
          </div>
        </main>
      </section>











      {/* Second Section */}
      <section className="min-h-screen">
      <div className="bg-black text-white p-8 rounded-lg md:mx-40 ">
        <div className={`h-[70vh] bg-white shadow-inner text-black rounded-3xl p-10 m-1 ${animate ? 'swipe-up-delayed-up' : ''}`}>
          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
            <button className="bg-black text-white px-3 py-1 rounded-full font-semibold">Functions</button>
            <button className="flex items-center  px-3 py-1 rounded-full font-semibold">
              <Filter size={16} className="mr-1" /> Filtering
            </button>
            <div className="overflow-hidden">
              <div className="flex animate-scroll">
                {['Selection', 'Joining', 'Aggregation', 'Grouping', 'Sorting', 'Window Functions', 'Broadcast Joining','...' ].map((operation, index) => (
                  <button key={index} className="px-3 py-3  font-medium whitespace-nowrap">
                    {operation}
                  </button>
                ))}
              </div>
            </div>
          </div>


          <div className="flex justify-between items-center mb-6">
            <form onSubmit={handleSubmit} className="flex items-center shadow-inner border border-gray-300 rounded-lg px-4 py-2 w-full max-w-x">
              {/* Microphone Icon */}
              <Mic className="text-gray-700 mr-2 mic-icon" />

              {/* Input Field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your pyspark task (e.g., Load CSV, Apply Transformation)"
                className="bg-transparent outline-none w-full text-black placeholder-gray-400"
                aria-label="Describe your data engineering task"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-full font-semibold ml-4 hover:bg-gray-800 transition duration-300"
              >
                <ChevronRight className="arrow-icon" />
              </button>
            </form>
          </div>

          {/* Section for Generated Code or Instructional Text */}
          <div className="mt-4">
            {loading ? (
              <div className="flex justify-center items-center p-40">
                <PaiSparkLoader size={60} color="#111" />
              </div>
            ) : generatedCode ? (
              <div className="bg-white h-[50vh] rounded-lg flex flex-col justify-start items-start space-y-4 scrollable-code">
            <div className="w-full overflow-y-auto"> 
            <CodeDisplay code={displayedCode} /> {/* Displaying progressively revealed code */}
                        </div>
                <div className="flex justify-between mt-6 w-full">
                  <button
                    onClick={copyToClipboard}
                    className="text-black  py-2 rounded-full"
                  >
                    <Copy className="mr-2 inline" /> Copy
                  </button>
                  <button
                    onClick={downloadCode}
                    className="text-black  py-2 rounded-full"
                  >
                    <Download className="mr-2 inline" /> Download
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-gray-500 mt-4 text-center w-full">Code copied to clipboard!</p>
                )}
              </div>
            ) :    (
              <div className="grid grid-cols-3 gap-6 mt-4">
              {[
                  { name: 'Filtering', description: 'Filters rows in a DataFrame based on a condition or set of conditions.' },
                  { name: 'Selection', description: 'Selects specific columns or expressions from a DataFrame.' },
                  { name: 'Joining', description: 'Combines two DataFrames based on a common key.' },
                  { name: 'Aggregation', description: 'Performs calculations like sum, avg, count, etc., over a group of rows.' },
                  { name: 'Union', description: 'Merges two DataFrames with the same schema into a single DataFrame.' },
                  { name: 'Grouping', description: 'Groups rows by specific column values for aggregation.' },
                  { name: 'Sorting', description: 'Orders the rows in a DataFrame based on column values.' },
                  { name: 'Window Functions', description: 'Performs operations like ranking or cumulative sums over a sliding window of rows.' },
                  { name: 'Broadcast Joining', description: 'Optimized join where a small DataFrame is broadcasted across the cluster for efficient joining.' }
                ].map((operation, index) => (
                <div key={index} className=" shadow-lg h-40 rounded-lg p-10 ">
                  <h1 className="font-bold text-lg">{operation.name}</h1>
                  <p className="text-gray-600 mt-2 ">{operation.description}</p>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center px-1 pt-3 mx-auto ">
          <div className="text-left">
            <p className="text-gray-500 font-bold">End of Studies Project</p>
            <div>
              <p className="text-gray-500">
                Developed by <span className="text-gray-400 font-semibold">@MohammedEHIRI</span>
              </p>
            </div>
          </div>

          <div className="flex  space-x-8">
          {/* Rotating Logos */}
            <div className="relative w-10 h-20">
                  {activeLogo === 0 ? (
                    <img
                      src="/AltenLogo.png"
                      alt="Alten Logo"
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
                      style={{ opacity: activeLogo === 0 ? 1 : 0 }}
                    />
                  ) : (
                    <img
                      src="/univ-logo.png"
                      alt="University Logo"
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
                      style={{ opacity: activeLogo === 1 ? 1 : 0 }}
                    />
                  )}
            </div>
          </div>
        </div>
      </div>

      


      <div className="min-h-screen  flex flex-col justify-center items-center md:flex-row p-8 rounded-lg my-40 md:mx-40">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h1 className= {`text-6xl font-extrabold mr-6 mt-6 ${animate ? 'swipe-up' : ''}`}>About the innovation</h1>
      </div>
      <div className="md:w-2/3 text-gray-700">
        <h2 className= {`text-4xl font-semibold m-6 mb-12  ${animate ? 'swipe-up' : ''}`}>PaiSPARK is AI for generating PySpark Code</h2>
        
        <p className={`m-6 text-xl  ${animate ? 'swipe-up' : ''}`}>
        This end-of-studies project, conducted at <span className='font-semibold'>ALTEN Delivery Center Maroc</span>, aimed to develop an artificial intelligence system capable of automatically translating natural language descriptions into optimized PySpark code. The objective was to simplify and automate the creation of complex data processing pipelines, thus reducing the workload of data engineers and enhancing the efficiency of data-related projects. By leveraging large language models (LLM), we built a system capable of interpreting natural language queries and converting them into functional and efficient PySpark code.
        </p>
        
        <p className={`m-6 text-xl  ${animate ? 'swipe-up' : ''}`}>
        The system was developed using the <span className='font-semibold'>Phi-3.5-mini-instruct</span> model, chosen for its balance between high performance and resource optimization. This model was <span className='font-semibold'>fine-tuned</span> to handle PySpark-specific tasks and integrated into a robust software architecture that provides an intuitive interface for engineers. The results demonstrated that the system could significantly enhance productivity, reducing coding errors and time spent on data pipeline development.
        </p>
        
        <p className= {`m-6 text-xl  ${animate ? 'swipe-up' : ''}`}>
        While the initial implementation shows promising results, further improvements are possible. These include expanding the system to support other programming languages and frameworks, optimizing code generation, and integrating with cloud environments for deployment in large-scale production settings. This project marks an important step towards automating complex data engineering processes using AI, paving the way for broader applications in the industry.
        </p>
        
      </div>
    </div>
  </section>





      {/* Consolidated Footer */}
      <footer className="bg-black text-white md:px-16">
      <div className="bg-black p-6 flex justify-center items-center">
        <div className="flex justify-between items-center rounded-lg p-6">
          <div>
            {/* Creator's Photo */}
            <img
              src="/profile.jpeg"
              alt="Creator's Photo"
              className={`w-60 h-60 object-cover border border-white rounded-full ${isVisible ? 'fade-in-up' : ''}`}
              ref={ref}
            />
          </div>
          <div className='m-10'>
            {/* Creator's Name and Role */}
            <h1 className={`text-6xl font-bold text-white ${isVisible ? 'fade-in-up' : ''}`}>Mohammed EHIRI</h1>
            <p className={`text-2xl text-gray-400 font-medium mt-2 ${isVisible ? 'fade-in-up' : ''}`}>
              Software & Data Engineer | AI Enthusiast
            </p>
            <div className={`flex justify-left items-center space-x-4 mt-6 ${isVisible ? 'fade-in-up' : ''}`}>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <Linkedin size={iconSize} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <Instagram size={iconSize} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <Twitter size={iconSize} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <Mail size={iconSize} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Load the dataset from a csv file into a Dataframe. Remove duplicate rows to ensure data integrity. Hundle missing values by dropping them */}
      <div
        ref={ref}
        className={`border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center ${isVisible ? 'fade-in-up' : ''}`}
      >
        <p className="text-gray-600 md:mb-8">© PaiSPARk 2024. All rights reserved</p>
      </div>
    </footer>
    </div>
  );
};

export default PaiSPARKLandingPage;
