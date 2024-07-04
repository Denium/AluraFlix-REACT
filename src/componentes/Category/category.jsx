import React from 'react';
import './category.css';

function Category({ id, title }) {
  const getCategoryStyles = (id) => {
    switch (id) {
      case 1:
        return { backgroundColor: '#6BD1FF', color: '#F5F5F5' };
      case 2:
        return { backgroundColor: '#00C86F', color: '#F5F5F5' };
      case 3:
        return { backgroundColor: '#FFBA05', color: '#F5F5F5' };
      case 4:
        return { backgroundColor: '#e47900', color: '#F5F5F5' };
      default:
        return {};
    }
  };

  const styles = getCategoryStyles(id);

  return (
    <div className="category" style={{ backgroundColor: styles.backgroundColor }}>
      <h2 style={{ color: styles.color }}>{title}</h2>
    </div>
  );
}

export default Category;
