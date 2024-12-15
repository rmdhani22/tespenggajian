import React from 'react';

const UbahPassword = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Form Ganti Password</h2>
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label>Password Baru</label>
          <input type="password" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label>Ulangi Password Baru</label>
          <input type="password" style={styles.input} />
        </div>
        <button style={styles.button}>Simpan</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'white',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#74512D',
  },
  formContainer: {
    backgroundColor: 'wihte',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '320px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ae7e4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default UbahPassword;
