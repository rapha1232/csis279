import { CATEGORIES } from '../constants';

export const getCategoryNameById = (category_id: number) => {
  const category = CATEGORIES.find(
    (category) => category.category_id === category_id,
  );
  return category ? category.name : 'Category not found';
};
