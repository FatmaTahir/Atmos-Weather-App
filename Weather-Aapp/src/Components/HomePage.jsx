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
  FiCloud
} from 'react-icons/fi';
import { FaCloudSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineWbSunny } from "react-icons/md";


const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const popularCities = [
    'Lahore',
    'Islamabad',
    'Karachi',
    'London',
    'Tokyo',
    'New York',
    'Paris'
  ];

  // Get weather from API
  const getWeather = async (searchCity = city) => {
    const trimmedCity = searchCity.trim();

    // Don't search if input is empty
    if (!trimmedCity) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError("Couldn't find that city.");
        } else {
          setError('Something went wrong. Please try again.');
        }

        return;
      }

      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to connect to the weather service.');
    } finally {
      setLoading(false);
    }
  };

  // Search when Enter is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  // Search button
  const handleSearch = () => {
    getWeather();
  };

  // Wind conversion: m/s → km/h
  const windSpeed = weather?.wind?.speed
    ? Math.round(weather.wind.speed * 3.6)
    : 0;

  // Visibility conversion: meters → km
  const visibility = weather?.visibility
    ? weather.visibility / 1000
    : 0;

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center p-3 p-md-4"
      style={{
        background:
          'linear-gradient(135deg, #FBF6E9 0%, #E3EEDD 50%, #DDEDF4 100%)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-sm p-4 p-md-5 w-100"
        style={{
          maxWidth: '900px',
          backgroundColor: '#ffffff',
          borderRadius: '32px'
        }}
      >
        {/* ================= HEADER ================= */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4 pb-3 border-bottom border-light">

          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 4,
                boxShadow:
                  '0 8px 20px rgba(120, 179, 234, 0.45)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15
              }}
              className="p-2 text-white d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#78B3EA',
                borderRadius: '14px',
                width: '42px',
                height: '42px',
                cursor: 'pointer'
              }}
            >
              <FaCloudSun size={24} />
            </motion.div>

            <h4
              className="fw-bold m-0 text-dark"
              style={{
                color: '#1E293B',
                letterSpacing: '-0.5px'
              }}
            >
              Atmos
            </h4>
          </div>

          {/* Search Controls */}
          <div className="d-flex align-items-center gap-2 w-100 w-md-auto justify-content-end">

            {/* Search Input */}
            <motion.div
              className="position-relative"
              animate={{
                width: isFocused ? '340px' : '240px'
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 24
              }}
            >
              <FiSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                size={18}
                style={{ color: '#64748B' }}
              />

              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4 py-2"
                placeholder="Search a city..."
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);

                  // Remove previous error when user starts typing again
                  if (error) {
                    setError('');
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyPress}
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: isFocused
                    ? '#78B3EA'
                    : '#E2E8F0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxShadow: isFocused
                    ? '0 0 0 4px rgba(120, 179, 234, 0.25)'
                    : 'none',
                  transition:
                    'border-color 0.2s, box-shadow 0.2s'
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

            {/* Search Button */}
            <motion.button
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow:
                  '0 8px 18px rgba(99, 165, 232, 0.45)'
              }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 18
              }}
              className="btn text-white rounded-pill px-4 py-2 fw-semibold flex-shrink-0"
              style={{
                backgroundColor: '#63A5E8',
                border: 'none'
              }}
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Search'}
            </motion.button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <AnimatePresence mode="wait">

          {/* ================= LOADING STATE ================= */}
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear'
                }}
                className="d-flex justify-content-center mb-4"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF4FC',
                    color: '#63A5E8'
                  }}
                >
                  <MdOutlineWbSunny size={48} />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="fw-bold text-dark mb-2"
                style={{
                  fontSize: '1.8rem'
                }}
              >
                Checking atmosphere...
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-secondary"
              >
                Getting the latest weather for {city}.
              </motion.p>
            </motion.div>

          ) : error ? (

            /* ================= ERROR STATE ================= */
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="text-center py-5"
            >
              {/* Sad Weather Icon */}
              <motion.div
                initial={{ y: -5 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'easeInOut'
                }}
                className="d-flex justify-content-center mb-4"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '110px',
                    height: '110px'
                  }}
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Cloud */}
                    <path
                      d="M28 72C19.716 72 13 65.284 13 57C13 49.635 18.309 43.51 25.3 42.25C27.31 32.75 35.78 25.6 45.9 25.6C54.75 25.6 62.3 31.05 65.35 38.8C67.25 37.9 69.4 37.4 71.65 37.4C80.15 37.4 87 44.25 87 52.75C87 53.2 86.98 53.65 86.92 54.1C94.3 55.35 100 61.75 100 69.45C100 78.1 93 85.1 84.35 85.1H28Z"
                      fill="#E8EEF5"
                    />

                    {/* Eyes */}
                    <circle
                      cx="48"
                      cy="59"
                      r="4"
                      fill="#94AFC4"
                    />
                    <circle
                      cx="70"
                      cy="59"
                      r="4"
                      fill="#94AFC4"
                    />

                    {/* Sad Mouth */}
                    <path
                      d="M52 72C56 67 62 67 66 72"
                      stroke="#94AFC4"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Rain */}
                    <path
                      d="M42 88L39 100"
                      stroke="#B9CCDB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <path
                      d="M78 88L75 100"
                      stroke="#B9CCDB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.div>

              <h2
                className="fw-bold text-dark mt-2 mb-2"
                style={{
                  fontSize: '2rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {error === "Couldn't find that city."
                  ? "Couldn't find that city."
                  : error}
              </h2>

              <p
                className="text-secondary mb-4"
                style={{
                  fontSize: '1rem'
                }}
              >
                {error === "Couldn't find that city."
                  ? 'Check the spelling and try again.'
                  : 'Please try again in a moment.'}
              </p>

              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    '0 5px 15px rgba(120, 179, 234, 0.2)'
                }}
                whileTap={{
                  scale: 0.96
                }}
                onClick={() => {
                  setError('');
                  setCity('');
                  setWeather(null);
                }}
                className="btn rounded-pill px-4 py-2"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E2E8F0',
                  color: '#475569'
                }}
              >
                Try again
              </motion.button>
            </motion.div>

          ) : !weather ? (

            /* ================= INITIAL EMPTY STATE ================= */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <div className="position-relative d-inline-block my-3">

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: 'linear'
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="22"
                      fill="#FACC15"
                    />

                    {[0, 45, 90, 135, 180, 225, 270, 315].map(
                      (deg, i) => (
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
                      )
                    )}
                  </svg>
                </motion.div>

                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    marginBottom: '10px',
                    marginLeft: '20px'
                  }}
                >
                  <svg
                    width="90"
                    height="50"
                    viewBox="0 0 80 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 35C14.4772 35 10 30.5228 10 25C10 20.084 13.5422 15.9926 18.2326 15.1852C19.6841 8.81434 25.3341 4 32.1 4C38.0772 4 43.1973 7.79584 45.1432 13.1166C46.6806 12.4002 48.3938 12 50.2 12C56.8274 12 62.2 17.3726 62.2 24C62.2 24.3392 62.1859 24.6751 62.1582 25.0069C66.1105 25.6881 69.1 29.1383 69.1 33.3C69.1 38.1049 65.2049 42 60.4 42H20Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
              </div>

              <h2
                className="fw-bold text-dark mt-3 mb-2"
                style={{
                  fontSize: '2rem',
                  letterSpacing: '-0.5px'
                }}
              >
                What's the weather like?
              </h2>

              <p
                className="text-secondary mb-4"
                style={{
                  fontSize: '1rem'
                }}
              >
                Search for a city and discover its atmosphere.
              </p>

              {/* Popular Cities */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                {popularCities.map((cityName) => (
                  <motion.button
                    key={cityName}
                    onClick={() => {
                      setCity(cityName);
                      getWeather(cityName);
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#78B3EA',
                      color: '#63A5E8',
                      boxShadow:
                        '0 4px 12px rgba(120, 179, 234, 0.25)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 17
                    }}
                    className="rounded-pill px-3 py-2 border d-flex align-items-center gap-1"
                    style={{
                      borderColor: '#E2E8F0',
                      color: '#475569',
                      backgroundColor: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <FiMapPin
                      size={14}
                      className="text-secondary"
                    />
                    <span>{cityName}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

          ) : (

            /* ================= WEATHER DISPLAY ================= */
            <motion.div
              key={weather.name}
              initial={{
                opacity: 0,
                scale: 0.98
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.98
              }}
              transition={{
                duration: 0.3
              }}
            >
              {/* Main Weather */}
              <div className="row align-items-center my-4">

                <div className="col-md-7">

                  <div
                    className="d-flex align-items-center gap-1 fw-semibold mb-2"
                    style={{
                      color: '#EAB308'
                    }}
                  >
                    <FiMapPin />
                    <span>
                      {weather.name}, {weather.sys?.country}
                    </span>
                  </div>

                  <h1
                    className="display-1 fw-bold text-dark m-0 lh-1"
                    style={{
                      fontSize: '5rem'
                    }}
                  >
                    {Math.round(weather.main.temp)}°
                  </h1>

                  <h4
                    className="fw-semibold text-dark text-capitalize mt-3 mb-1"
                  >
                    {weather.weather[0].description}
                  </h4>

                  <p className="text-secondary small m-0">
                    Feels like{' '}
                    {Math.round(weather.main.feels_like)}°
                  </p>

                  <p className="text-secondary small mt-1">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}{' '}
                    •{' '}
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Weather Icon */}
                <div className="col-md-5 text-center d-flex justify-content-center align-items-center">

                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: 'easeInOut'
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].description}
                      className="img-fluid"
                      style={{
                        width: '180px',
                        filter:
                          'drop-shadow(0 10px 15px rgba(0,0,0,0.08))'
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* ================= METRICS ================= */}
              <div className="row g-3 my-4">

                {[
                  {
                    label: 'HUMIDITY',
                    value: `${weather.main.humidity}%`,
                    icon: (
                      <FiDroplet className="text-info" />
                    )
                  },

                  {
                    label: 'WIND',
                    value: `${windSpeed} km/h`,
                    icon: (
                      <FiWind className="text-primary" />
                    )
                  },

                  {
                    label: 'FEELS LIKE',
                    value: `${Math.round(
                      weather.main.feels_like
                    )}°`,
                    icon: (
                      <FiThermometer className="text-warning" />
                    )
                  },

                  {
                    label: 'VISIBILITY',
                    value: `${visibility} km`,
                    icon: (
                      <FiEye className="text-success" />
                    )
                  },

                  {
                    label: 'PRESSURE',
                    value: `${weather.main.pressure} hPa`,
                    icon: (
                      <FiClock className="text-secondary" />
                    )
                  },

                  {
                    label: 'CLOUDINESS',
                    value: `${weather.clouds.all}%`,
                    icon: (
                      <FiCloud className="text-primary" />
                    )
                  }

                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="col-12 col-md-4"
                  >
                    <motion.div
                      whileHover={{
                        y: -3,
                        boxShadow:
                          '0 8px 20px rgba(15, 23, 42, 0.06)'
                      }}
                      className="p-3 border-0 h-100 d-flex flex-column justify-content-center"
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '20px',
                        transition:
                          'box-shadow 0.2s ease'
                      }}
                    >
                      <div className="fs-5 mb-1">
                        {metric.icon}
                      </div>

                      <span
                        className="text-secondary fw-semibold"
                        style={{
                          fontSize: '0.7rem'
                        }}
                      >
                        {metric.label}
                      </span>

                      <h4 className="fw-bold text-dark m-0 mt-1">
                        {metric.value}
                      </h4>
                    </motion.div>
                  </div>
                ))}

              </div>

              {/* ================= TRY ANOTHER CITY ================= */}
              <div className="pt-3 border-top border-light">

                <p
                  className="text-secondary fw-bold small mb-2"
                  style={{
                    letterSpacing: '0.5px'
                  }}
                >
                  TRY ANOTHER CITY
                </p>

                <div className="d-flex flex-wrap gap-2">

                  {popularCities.map((cityName) => (
                    <motion.button
                      key={cityName}
                      onClick={() => {
                        setCity(cityName);
                        getWeather(cityName);
                      }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: '#78B3EA',
                        color: '#63A5E8',
                        boxShadow:
                          '0 4px 12px rgba(120, 179, 234, 0.25)'
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17
                      }}
                      className="rounded-pill px-3 py-1 border bg-white shadow-sm"
                      style={{
                        borderColor: '#E2E8F0',
                        color: '#334155',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      {cityName}
                    </motion.button>
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