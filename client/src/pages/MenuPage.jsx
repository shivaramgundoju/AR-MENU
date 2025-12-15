import React, { useState, useEffect } from "react";

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

  /* =============================
     FETCH DISHES FROM BACKEND
     ============================= */
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/dishes");

        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }

        const data = await response.json();

        setDishes(data);
        setFilteredDishes(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dishes. Please try again later.");
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  /* =============================
     SEARCH + CATEGORY FILTER
     ============================= */
  useEffect(() => {
    let result = dishes;

    if (selectedCategory !== "All") {
      result = result.filter(
        (dish) => dish.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDishes(result);
  }, [searchQuery, selectedCategory, dishes]);

  const handleViewInAR = (dishId) => {
    console.log("View in AR:", dishId);
    // Later: navigate(`/ar/${dishId}`)
  };

  /* =============================
     LOADING STATE
     ============================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  /* =============================
     ERROR STATE
     ============================= */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* =============================
     MAIN UI
     ============================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600">
            Explore our delicious dishes and view them in AR
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-amber-500 shadow-md"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
              🔍
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                  : "bg-white text-gray-700 border-2 border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No dishes found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    {dish.category}
                  </span>

                  <h3 className="text-xl font-bold mt-2">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {dish.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{dish.price}
                    </span>

                    <button
                      onClick={() => handleViewInAR(dish._id)}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-white text-sm rounded-full"
                    >
                      View in AR
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
