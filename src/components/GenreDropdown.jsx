import { useState } from 'react';

const GenreDropdown = () => {
  const [genre, setGenre] = useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div style={{ padding: '10px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Select Genre:</label>
      <select value={genre} onChange={handleChange} style={{ padding: '8px', borderRadius: '6px' }}>
        <option value="">-- Select Genre --</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
      </select>

      {/* Showing selected genre */}
      {genre && <p style={{ marginTop: '10px' }}>You selected: <strong>{genre}</strong></p>}
    </div>
  );
};

export default GenreDropdown;
