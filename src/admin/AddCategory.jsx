import React, { useState } from 'react';
import { useAddCategoryMutation, useGetCategoryQuery } from '../redux/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [addCategory, { isLoading, isSuccess, isError }] = useAddCategoryMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const { refetch } = useGetCategoryQuery()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory({ name: categoryName }).unwrap();
      toast.success('Category added successfully');
      setCategoryName(''); // Clear input field after success
      refetch(); // Refetch categories to update the list
      navigate('/admin/categoryList'); // Redirect to category list after success
    } catch (error) {
      toast.error(error?.data?.message || 'Error adding category');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Category'}
            </button>
            <button
              onClick={() => navigate('/admin/categoryList')}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              disabled={isLoading}
            >
              Back to Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
