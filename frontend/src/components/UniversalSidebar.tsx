import React from 'react';

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

export interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

interface UniversalSidebarProps {
  categories: CategoryGroup[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const UniversalSidebar: React.FC<UniversalSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <aside className="atlas-sidebar">
      <div className="atlas-sidebar-title">
        <span>📂</span>
        <span>Toutes les catégories</span>
      </div>

      <button
        className={`atlas-category-item ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        <span>Tout le catalogue</span>
      </button>

      {categories.map((group, idx) => (
        <div key={idx} className="atlas-category-group">
          <div className="atlas-category-header">{group.title}</div>
          {group.items.map((cat) => (
            <button
              key={cat.id}
              className={`atlas-category-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span>{cat.name}</span>
              <span className="atlas-badge-count">{cat.count}</span>
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
};