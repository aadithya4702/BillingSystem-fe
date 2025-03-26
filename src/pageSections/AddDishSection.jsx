import { useState, useEffect } from "react";
import { addDish, deleteDish, getDishes, updateDish } from "../api/Dishes";
import { addCategory, getCategories } from "../api/Categories";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faMoneyBillTransfer,
  faCreditCard,
  faEdit,
  faClose,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const AddDishSection = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteOpenModel, setIsDeleteOpenModel] = useState(false);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState(0);
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

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dishesResponse, categoriesResponse] = await Promise.all([
          getDishes(),
          getCategories(),
        ]);

        if (dishesResponse.success && Array.isArray(dishesResponse.data)) {
          setDishes(dishesResponse.data);
        } else {
          toast.error("Failed to fetch dishes.");
        }

        if (
          categoriesResponse.success &&
          Array.isArray(categoriesResponse.data)
        ) {
          setCategories(categoriesResponse.data);
          if (categoriesResponse.data.length > 0) {
            setSelectedCategory(categoriesResponse.data[0].id);
          }
        } else {
          toast.error("Failed to fetch categories.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  const deleteModel = (id) => {
    setSelectedItemForDelete(id);
    setIsDeleteOpenModel(!isDeleteOpenModel);
  };

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
    // Assume existingDishes is an array of objects containing dish names
    const isDishNameExists = dishes.some(
      (dish) => dish.name.toLowerCase() === newDish.name.toLowerCase()
    );

    if (
      !newDish.name ||
      !newDish.description ||
      !newDish.price ||
      newDish.price <= 0 ||
      !newDish.category_id
    ) {
      toast.error(
        "All fields are required and price must be greater than zero."
      );
      return;
    }

    try {
      const truckData = localStorage.getItem("dsquare_valid_truck");
      if (!truckData)
        throw new Error("No truck data found. Please log in again.");

      const truck = JSON.parse(truckData);
      if (!truck.id)
        throw new Error("Invalid truck data. Please log in again.");

      const dishPayload = { ...newDish, truck_id: truck.id };

      let updatedDishes;
      if (isEditing) {
        const response = await updateDish(editDishId, dishPayload);
        if (response.success) {
          toast.success("Dish updated successfully");
          updatedDishes = dishes.map((dish) =>
            dish.id === editDishId ? response.data : dish
          );
        } else {
          throw new Error(response.message || "Failed to update dish.");
        }
      } else {
        const response = await addDish(dishPayload);
        if (response.success) {
          toast.success("Dish Added successfully");
          updatedDishes = [...dishes, response.data];
        } else {
          throw new Error(response.message || "Failed to add dish.");
        }
      }

      setDishes(updatedDishes);
      setIsDishModalOpen(false);
    } catch (error) {
      console.error("Error saving dish:", error);
      toast.error(error.message || "An error occurred while saving the dish.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const truckData = localStorage.getItem("dsquare_valid_truck");
      if (!truckData)
        throw new Error("No truck data found. Please log in again.");

      const truck = JSON.parse(truckData);
      if (!truck.id)
        throw new Error("Invalid truck data. Please log in again.");

      const response = await addCategory({
        name: newCategory,
        truck_id: truck.id,
      });
      if (response.success && response.data?.id) {
        toast.success("Category added successfully");
        setCategories([...categories, response.data]);
        setSelectedCategory(response.data.id);
        setNewCategory("");
        setIsCategoryModalOpen(false);
      } else {
        throw new Error(response.message || "Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(
        error.message || "An error occurred while adding the category."
      );
    }
  };

  const handleFoodItemDelete = async () => {
    try {
      const response = await deleteDish(selectedItemForDelete); // Call API to delete dish

      if (response.success) {
        // Remove deleted dish from the list
        setDishes((dishes) =>
          dishes.filter((dish) => dish.id !== selectedItemForDelete)
        );

        toast.success("Dish deleted successfully!");
      } else {
        throw new Error(response.message || "Failed to delete the dish.");
      }
      setSelectedItemForDelete(0);
      setIsDeleteOpenModel(false);
    } catch (error) {
      console.error("Error deleting dish:", error);
      toast.error(error.message || "Something went wrong!");
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
            className="border-2 border-dashed border-highlight-bg-icon text-highlight-bg-icon flex items-center justify-center p-6 cursor-pointer rounded-lg hover:bg-gray-800"
            onClick={handleOpenAddModal}
          >
            + Add new dish
          </div>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-gray-800 relative rounded-lg overflow-hidden shadow-lg cursor-pointer border border-gray-700"
            >
              {/* Dish Image with Hover Effect */}
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-36 object-cover bg-black transition-transform duration-300 hover:scale-105"
                />
                {!dish.is_available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-sm font-bold">
                      Not Available
                    </p>
                  </div>
                )}
              </div>

              {/* Dish Details */}
              <div className="p-4">
                {/* Dish Name */}
                <h3
                  className="text-lg font-semibold text-white text-center truncate"
                  title={dish.name}
                >
                  {dish.name}
                </h3>

                {/* Price & Availability */}
                <p className="text-gray-400 text-center mt-1">
                  ₹{dish.price} •{" "}
                  <span
                    className={`font-semibold ${
                      dish.is_available ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {dish.is_available ? "Available" : "Not Available"}
                  </span>
                </p>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEditModal(dish)}
                  className="mt-3 w-full bg-highlight-bg-icon hover:bg-red-500 text-white font-medium py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring focus:ring-red-400"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit Dish</span>
                </button>
              </div>
              <div
                onClick={() => deleteModel(dish.id)}
                className="flex gap-1  items-center bg-gray-700 w-fit p-1 rounded-full absolute top-1 right-1"
              >
                <span className="text-xs">Delete dish</span>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dish Modal */}
      {isDishModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
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
            <div className="flex w-full mb-2 ">
              <span className="bg-input-text-color w-10 flex justify-center items-center text-xl rounded-l">
                ₹
              </span>
              <input
                type="text"
                placeholder="Price"
                value={newDish.price}
                onChange={(e) =>
                  setNewDish({ ...newDish, price: e.target.value })
                }
                className="w-full p-2  bg-gray-700 rounded-r"
              />
            </div>
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

      {isDeleteOpenModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg">
            <p className="text-lg">Are you really want to delete the item</p>
            <div className="w-full flex justify-evenly gap-2 my-2">
              <button
                onClick={handleFoodItemDelete}
                className="bg-green-500 w-full p-1 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIsDeleteOpenModel(!isDeleteOpenModel);
                  setSelectedItemForDelete(0);
                }}
                className="bg-red-500 w-full p-1 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDishSection;
