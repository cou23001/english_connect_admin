import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericOptions from '../components/GenericOptions';
import api from '../utils/axiosInstance';

const options = [
  {
    label: 'Edit',
    route: '/unitInfo/:id',
  },
  {
    label: 'Delete',
    route: '/delete/:id',
  },
];

const UnitInformation = ({ unit }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const confirmToDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete unit with ID: ${id}?`)) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/wards/${id}`);
      if (response.status === 204) {
        navigate('/units');
      } else {
        setError(response.data?.error || `Failed to delete unit: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
      setError(error.response?.data?.error || "An error occurred while deleting the unit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!unit) {
      setSelectedUnit(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchUnitData = async () => {
      setLoading(true);
      setError(null);
      setSelectedUnit(null);

      try {
        const response = await api.get(`/wards/${unit}`);

        if (response.status !== 200) {
          throw new Error(`Failed to fetch ward data: ${response.status} ${response.statusText}`);
        }

        const data = response.data.ward;

        if (data) {
          setSelectedUnit(data);
        } else {
          setError(`Ward with ID "${unit}" not found.`);
          setSelectedUnit(null);
        }
      } catch (err) {
        console.error("Error fetching ward:", err);
        setError(err.message || "An error occurred while fetching ward information.");
        setSelectedUnit(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUnitData();

  }, [unit]);

  if (loading) {
    return (
      <section className='unit__information'>
        <h2 className='unit-information__header'>Unit Information</h2>
        <div className='unit-information__container'>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='unit__information'>
        <h2 className='unit-information__header'>Unit Information</h2>
        <div className='unit-information__container'>
          <p className="form__error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='unit__information'>
      <h2 className='unit-information__header'>Unit Information</h2>
      <div className='unit-information__container'>
        {selectedUnit ? (
          <div className='unit__info'>
            <GenericOptions options={options} itemId={selectedUnit._id} confirmToDelete={confirmToDelete} />
            <div className='unit-information__details'>
              <p><strong>Unit Name:</strong> {selectedUnit.name}</p>
              <p><strong>Location:</strong> {selectedUnit.location}</p>
              <p><strong>Stake ID:</strong> {selectedUnit.stakeId?.name}</p>
            </div>
          </div>
        ) : (
          <p>{unit ? `Unit "${unit}" not found.` : 'No unit selected.'}</p>
        )}
      </div>
    </section>
  );
};

export default UnitInformation;