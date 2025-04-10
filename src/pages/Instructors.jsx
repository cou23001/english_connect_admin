import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosInstance';
import GenericOptions from '../components/GenericOptions';
import { countries } from '../constants/countries';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stakes, setStakes] = useState([]);
  const [selectedStake, setSelectedStake] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        let url = '/instructors';
        if (selectedWard) {
          url = `/users/instructor/ward/${selectedWard}`;
        }
        const response = await api.get(url);
        setInstructors(response.data.data);
      } catch (err) {
        console.error('Error fetching instructors:', err.response?.data?.error || err.message || err);
        setError('Failed to load instructors. Please try again.');
      }
    };

    fetchInstructors();
  }, [selectedWard]);

  useEffect(() => {
    if (selectedCountry) {
      fetchStakes(selectedCountry);
      setSelectedStake('');
      setSelectedWard('');
      setStakes([]);
      setWards([]);
    } else {
      setStakes([]);
      setWards([]);
      setSelectedStake('');
      setSelectedWard('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedStake) {
      fetchWards(selectedStake);
      setSelectedWard('');
      setWards([]);
    } else {
      setWards([]);
      setSelectedWard('');
    }
  }, [selectedStake]);

  const fetchStakes = async (countryName) => {
    try {
      const response = await api.get(`/stakes/country/${countryName}`);
      setStakes(response.data.data);
    } catch (error) {
      console.error('Error fetching stakes:', error);
      setError('Failed to load stakes. Please try again.');
    }
  };

  const fetchWards = async (stakeId) => {
    try {
      const response = await api.get(`/stakes/wards/${stakeId}`);
      setWards(response.data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
      setError('Failed to load wards. Please try again.');
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStakeChange = (e) => {
    setSelectedStake(e.target.value);
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const options = [
    {
      label: 'Edit',
      route: '/instructorProfile/:id',
    },
    {
      label: 'Delete',
      route: '/delete/:id',
    },
  ];

  return (
    <section className='instructors'>
      <h1 className='instructors__header'>Instructors</h1>
      <div className='filter__controls'>
        <label htmlFor='country'>Country:</label>
        <select id='country' value={selectedCountry} onChange={handleCountryChange}>
          <option value=''>All Countries</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <label htmlFor='stake'>Stake:</label>
        <select id='stake' value={selectedStake} onChange={handleStakeChange} disabled={!selectedCountry}>
          <option value=''>All Stakes</option>
          {stakes.map((stake) => (
            <option key={stake._id} value={stake._id}>
              {stake.name}
            </option>
          ))}
        </select>

        <label htmlFor='ward'>Ward:</label>
        <select id='ward' value={selectedWard} onChange={handleWardChange} disabled={!selectedStake}>
          <option value=''>All Wards</option>
          {wards.map((ward) => (
            <option key={ward._id} value={ward._id}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className='form__error-message'>{error}</p>}
      {instructors.length > 0 ? (
        <div className='container instructors__container'>
          {instructors.map((instructor) => (
            <Link key={instructor._id} className='instructor'>
              <GenericOptions options={options} itemId={instructor._id} />
              <div className='instructor__info'>
                <h4>{instructor.userId?.firstName} {instructor.userId?.lastName}</h4>
                <p>Ward ID: {instructor.userId?.wardId ?? ' Unknown'}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2>No instructors found for the selected criteria</h2>
      )}
      <div className='add__instructor'>
        <button className='add__instructor-btn'><Link to="/createInstructor">Add an instructor</Link></button>
      </div>
    </section>
  );
};

export default Instructors;