import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiX, 
  FiMapPin, 
  FiDroplet, 
  FiWind, 
  FiThermometer, 
  FiEye, 
  FiClock, 
  FiSun 
} from 'react-icons/fi';
import { FaCloudSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const popularCities = ['Lahore', 'Islamabad', 'Karachi', 'London', 'Tokyo', 'New York', 'Paris'];

  const getWeather = async (searchCity = city) => {
    if (!searchCity) return;
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') getWeather();
  };

  const windSpeed = weather?.wind?.speed ? Math.round(weather.wind.speed * 3.6) : 0;
  const visibility = weather?.visibility ? weather.visibility / 1000 : 0;

  return (
    <div 
      className="min-vh-100 d-flex justify-content-center align-items-center p-3 p-md-4"
      style={{
        background: 'linear-gradient(135deg, #FBF6E9 0%, #E3EEDD 50%, #DDEDF4 100%)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-sm p-4 p-md-5 w-100"
        style={{ maxWidth: '900px', backgroundColor: '#ffffff', borderRadius: '32px' }}
      >
        {/* Top Header Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom border-light">
          {/* Logo Section with Hover Animation & Soft Shadow */}
          <motion.div 
            className="d-flex align-items-center gap-2"
            whileHover="hover"
            style={{ cursor: 'pointer' }}
          >
            <motion.div 
              className="p-2 text-white d-flex align-items-center justify-content-center" 
              style={{ backgroundColor: '#78B3EA', borderRadius: '14px', width: '42px', height: '42px' }}
              variants={{
                hover: { 
                  scale: 1.08, 
                  rotate: [0, -8, 8, 0],
                  boxShadow: '0 8px 20px rgba(120, 179, 234, 0.45)'
                }
              }}
              transition={{ duration: 0.3 }}
            >
              <FaCloudSun size={24} />
            </motion.div>
            <motion.h4 
              className="fw-bold m-0" 
              style={{ color: '#1E293B', letterSpacing: '-0.5px' }}
              variants={{
                hover: { color: '#63A5E8' }
              }}
            >
              Atmos
            </motion.h4>
          </motion.div>

          {/* Right Control Group */}
          <div className="d-flex align-items-center gap-2 w-100 w-md-auto mt-3 mt-md-0">
            {/* Animated Expandable Search Container */}
            <motion.div 
              className="position-relative"
              animate={{ 
                width: isFocused || city ? '320px' : '250px' 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <FiSearch 
                className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                size={18} 
                style={{ color: isFocused ? '#63A5E8' : '#94A3B8', transition: 'color 0.2s' }}
              />
              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4 py-2"
                placeholder="Search a city..."
                value={city}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: isFocused ? '#78B3EA' : '#E2E8F0', 
                  borderWidth: '1.5px',
                  boxShadow: isFocused ? '0 0 0 4px rgba(120, 179, 234, 0.25)' : 'none',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              />
              {city && (
                <FiX 
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary" 
                  onClick={() => setCity('')} 
                  style={{ cursor: 'pointer' }}
                />
              )}
            </motion.div>

            <button 
              className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border"
              onClick={() => getWeather()}
              style={{ width: '42px', height: '42px', borderColor: '#E2E8F0', backgroundColor: '#ffffff' }}
            >
              <FiMapPin className="text-secondary" size={18} />
            </button>

            <button 
              className="btn text-white rounded-pill px-4 py-2 fw-semibold"
              style={{ backgroundColor: '#63A5E8', border: 'none' }}
              onClick={() => getWeather()}
              disabled={loading}
            >
              {loading ? 'Search...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {!weather ? (
            /* Initial Empty State */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <div className="position-relative d-inline-block my-3">
                {/* Rotating Sun */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="22" fill="#FACC15" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1="12"
                        x2="50"
                        y2="20"
                        stroke="#FDE047"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                  </svg>
                </motion.div>
                {/* Floating Cloud */}
                <div 
                  className="position-absolute bottom-0 start-50 translate-middle-x"
                  style={{ marginBottom: '10px', marginLeft: '20px' }}
                >
                  <svg width="90" height="50" viewBox="0 0 80 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 35C14.4772 35 10 30.5228 10 25C10 20.084 13.5422 15.9926 18.2326 15.1852C19.6841 8.81434 25.3341 4 32.1 4C38.0772 4 43.1973 7.79584 45.1432 13.1166C46.6806 12.4002 48.3938 12 50.2 12C56.8274 12 62.2 17.3726 62.2 24C62.2 24.3392 62.1859 24.6751 62.1582 25.0069C66.1105 25.6881 69.1 29.1383 69.1 33.3C69.1 38.1049 65.2049 42 60.4 42H20Z" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>

              <h2 className="fw-bold text-dark mt-3 mb-2" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>
                What's the weather like?
              </h2>
              <p className="text-secondary mb-4" style={{ fontSize: '1rem' }}>
                Search for a city and discover its atmosphere.
              </p>

              {/* Suggestions Pill Bar */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                {popularCities.map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      setCity(cityName);
                      getWeather(cityName);
                    }}
                    className="btn btn-outline-light rounded-pill px-3 py-2 btn-sm border d-flex align-items-center gap-1"
                    style={{ borderColor: '#E2E8F0', color: '#475569', backgroundColor: '#ffffff' }}
                  >
                    <FiMapPin size={14} className="text-secondary" />
                    <span>{cityName}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Searched Weather Display */
            <motion.div
              key={weather.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="row align-items-center my-4">
                <div className="col-md-7">
                  <div className="d-flex align-items-center gap-1 fw-semibold mb-2" style={{ color: '#EAB308' }}>
                    <FiMapPin />
                    <span>{weather.name}, {weather.sys?.country}</span>
                  </div>
                  <h1 className="display-1 fw-bold text-dark m-0 lh-1" style={{ fontSize: '5rem' }}>
                    {Math.round(weather.main.temp)}°
                  </h1>
                  <h4 className="fw-semibold text-dark text-capitalize mt-3 mb-1">
                    {weather.weather[0].description}
                  </h4>
                  <p className="text-secondary small m-0">
                    Feels like {Math.round(weather.main.feels_like)}°
                  </p>
                  <p className="text-secondary small mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="col-md-5 text-center d-flex justify-content-center align-items-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  >
                    <img 
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                      alt="Weather Icon"
                      className="img-fluid"
                      style={{ width: '180px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="row g-3 my-4">
                {[
                  { label: 'HUMIDITY', value: `${weather.main.humidity} %`, icon: <FiDroplet className="text-primary" /> },
                  { label: 'WIND', value: `${windSpeed} km/h`, icon: <FiWind className="text-info" /> },
                  { label: 'FEELS LIKE', value: `${Math.round(weather.main.feels_like)}°`, icon: <FiThermometer className="text-warning" /> },
                  { label: 'VISIBILITY', value: `${visibility} km`, icon: <FiEye className="text-primary" /> },
                  { label: 'PRESSURE', value: `${weather.main.pressure} hPa`, icon: <FiClock className="text-secondary" /> },
                  { label: 'UV INDEX', value: '2', icon: <FiSun className="text-warning" /> },
                ].map((metric, idx) => (
                  <div key={idx} className="col-12 col-md-4">
                    <div 
                      className="p-3 border-0 h-100 d-flex flex-column justify-content-center"
                      style={{ backgroundColor: '#F8FAFC', borderRadius: '20px' }}
                    >
                      <div className="fs-5 mb-1">{metric.icon}</div>
                      <span className="text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                        {metric.label}
                      </span>
                      <h4 className="fw-bold text-dark m-0 mt-1">{metric.value}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* City Suggestions Bottom */}
              <div className="pt-3 border-top border-light">
                <p className="text-secondary fw-bold small mb-2" style={{ letterSpacing: '0.5px' }}>
                  TRY ANOTHER CITY
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {popularCities.map((cityName) => (
                    <button
                      key={cityName}
                      onClick={() => {
                        setCity(cityName);
                        getWeather(cityName);
                      }}
                      className="btn btn-outline-light rounded-pill px-3 py-1 btn-sm border bg-white text-dark shadow-sm"
                      style={{ borderColor: '#E2E8F0' }}
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HomePage;