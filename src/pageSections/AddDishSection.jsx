import { useState, useEffect } from "react";
import { addDish, getDishes, updateDish } from "../api/Dishes";
import { addCategory, getCategories } from "../api/Categories";

const AddDishSection = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDishId, setEditDishId] = useState(null);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    is_available: false,
    category_id: "",
    image: "",
  });

  // Fetch dishes and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDishes = await getDishes();
        const response = await getCategories();

        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data); // Set categories correctly
          if (response.data.length > 0) {
            setSelectedCategory(response.data[0].id); // Set first category as default
          }
        }
        if (fetchedDishes.success && Array.isArray(fetchedDishes.data)) {
          setDishes(fetchedDishes.data); // Set categories correctly
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);

    setNewDish({
      name: "",
      description: "",
      price: "",
      is_available: false,
      image: "",
      category_id: selectedCategory || "",
    });
    setIsDishModalOpen(true);
  };

  const handleOpenEditModal = (dish) => {
    setIsEditing(true);
    setEditDishId(dish.id);
    setNewDish({
      ...dish,
      is_available: Boolean(dish.is_available), // Ensure boolean value
    });
    setIsDishModalOpen(true);
  };

  const handleSaveDish = async () => {
    console.log("handle dish called", newDish);

    if (
      !newDish.name ||
      !newDish.description ||
      !newDish.price ||
      newDish.is_available === undefined ||
      !newDish.category_id
    ) {
      return;
    }

    try {
      const truckData = localStorage.getItem("dsquare_valid_truck"); // Get truck data
      if (!truckData) {
        throw new Error("No truck data found. Please log in again.");
      }

      const truck = JSON.parse(truckData); // Parse the string

      if (!truck.id) {
        throw new Error("Invalid truck data. Please log in again.");
      }

      const dishPayload = {
        ...newDish,
        truck_id: truck.id, // Add truck_id here
      };

      let updatedDishes;
      console.log("inside loop");
      if (isEditing) {
        const updatedDish = await updateDish(editDishId, dishPayload);
        updatedDishes = dishes.map((dish) =>
          dish.id === editDishId ? updatedDish : dish
        );
      } else {
        const addedDish = await addDish(dishPayload);
        updatedDishes = [...dishes, addedDish];
      }

      setDishes(updatedDishes);
      setIsDishModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving dish:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // Prevent empty categories

    try {
      // Retrieve truck details correctly
      const truckData = localStorage.getItem("dsquare_valid_truck");
      if (!truckData) {
        throw new Error("No truck data found. Please log in again.");
      }

      const truck = JSON.parse(truckData); // Parse the string
      if (!truck.id) {
        throw new Error("Invalid truck data. Please log in again.");
      }

      // Call API to add category
      const addedCategory = await addCategory({
        name: newCategory,
        truck_id: truck.id, // Ensure correct truck_id
      });
      const categoryId = addedCategory?.id || addedCategory?.data?.id || null;
      if (categoryId) {
        setCategories([...categories, addedCategory]); // Update UI
        setSelectedCategory(addedCategory.id);
        window.location.reload();
      } else {
        throw new Error("Failed to add category. Invalid response from API.");
      }

      setNewCategory(""); // Reset input
      setIsCategoryModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products Management</h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className="bg-transparent border-2 border-orange-500 px-4 py-2 rounded"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Manage Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category.id
                  ? "bg-orange-500"
                  : "bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <hr className="m-5 border-gray-700" />

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
                {dish.price} •{" "}
                {dish.is_available ? "Available" : "Not available"}
              </p>
              <button
                onClick={() => handleOpenEditModal(dish)}
                className="mt-2 w-full bg-highlight-bg-icon px-4 py-2 rounded"
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
              placeholder="Dish Description"
              value={newDish.description}
              onChange={(e) =>
                setNewDish({ ...newDish, description: e.target.value })
              }
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
            <select
              value={newDish.is_available.toString()} // Convert boolean to string for the dropdown
              onChange={(e) =>
                setNewDish({
                  ...newDish,
                  is_available: e.target.value === "true",
                })
              }
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={newDish.image}
              onChange={(e) =>
                setNewDish({ ...newDish, image: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            />

            <select
              value={newDish.category_id}
              onChange={(e) =>
                setNewDish({ ...newDish, category_id: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

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
                onClick={handleAddCategory}
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
