import { getRequest, postRequest, putRequest, deleteRequest } from "../../services/api" ; 

// Fetch all positions
export const fetchAllPositions = async () => {
  try {
    const response = await getRequest('/api/position/get-all-position');
    return response.data;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
};

// Fetch position by ID
export const fetchPositionById = async (id) => {
  try {
    const response = await getRequest(`/api/position/get-all-id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching position by ID: ${id}`, error);
    throw error;
  }
};

// Create a new position
export const createPosition = async (positionData) => {
  try {
    const response = await postRequest('/api/position/create-position', positionData);
    return response.data;
  } catch (error) {
    console.error("Error creating position:", error);
    throw error;
  }
};

// Update position by ID
export const updatePosition = async (id, positionData) => {
  try {
    const response = await putRequest(`/api/position/update-position/${id}`, positionData);
    return response.data;
  } catch (error) {
    console.error(`Error updating position with ID: ${id}`, error);
    throw error;
  }
};

// Delete position by ID
export const deletePosition = async (id) => {
  try {
    const response = await deleteRequest(`/api/position/delete-position/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting position with ID: ${id}`, error);
    throw error;
  }
};
