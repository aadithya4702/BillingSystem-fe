import { React, useState } from "react";

const AddDishSection = () => {
  const dishesData = [
    {
      id: 1,
      name: "Spicy seasoned seafood noodles",
      price: "$2.29",
      quantity: "20 Bowls",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Salted Pasta with mushroom sauce",
      price: "$2.69",
      quantity: "30 Bowls",
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
  ];

  const categoriesData = ["Veg", "Non-Veg"];

  const [dishes, setDishes] = useState(dishesData);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDishId, setEditDishId] = useState(null);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setNewDish({ name: "", price: "", quantity: "", image: "" });
    setIsDishModalOpen(true);
  };

  const handleOpenEditModal = (dish) => {
    setIsEditing(true);
    setEditDishId(dish.id);
    setNewDish(dish);
    setIsDishModalOpen(true);
  };

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setIsCategoryModalOpen(false);
      setNewCategory("");
    }
  };

  const handleSaveDish = () => {
    if (!newDish.name || !newDish.price || !newDish.quantity) return;

    if (isEditing) {
      setDishes(
        dishes.map((dish) => (dish.id === editDishId ? { ...newDish } : dish))
      );
    } else {
      setDishes([...dishes, { id: dishes.length + 1, ...newDish }]);
    }

    setIsDishModalOpen(false);
    setNewDish({ name: "", price: "", quantity: "", image: "" });
  };

  return (
    <div className="min-h-screen  bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-bold">Products Management</h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className="bg-transparent border-2 border-custom-font-color-orange px-4 py-2 rounded"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Manage Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-highlight-bg-icon"
                  : "bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <hr className="m-5 border-1 border-input-text-color " />

        {/* Dish List */}
        <div className="grid mb-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <div
            className="border-2 border-dashed border-highlight-bg-icon text-highlight-bg-icon flex items-center justify-center p-6 cursor-pointer hover:bg-gray-800"
            onClick={handleOpenAddModal}
          >
            + Add new dish
          </div>
          {dishes.map((dish) => (
            <div key={dish.id} className="bg-gray-800  p-4 rounded">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{dish.name}</h3>
              <p className="text-gray-400">
                {dish.price} • {dish.quantity}
              </p>
              <button
                onClick={() => handleOpenEditModal(dish)}
                className="mt-2 w-full bg-logo-outer-color px-4 py-2 rounded"
              >
                Edit Dish
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dish Modal */}
      {isDishModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Dish" : "Add New Dish"}
            </h3>
            <input
              type="text"
              placeholder="Dish Name"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Price"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: e.target.value })
              }
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newDish.quantity}
              onChange={(e) =>
                setNewDish({ ...newDish, quantity: e.target.value })
              }
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newDish.image}
              onChange={(e) =>
                setNewDish({ ...newDish, image: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsDishModalOpen(false)}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDish}
                className="px-4 py-2 bg-green-500 rounded"
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-green-500 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDishSection;
