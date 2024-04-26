import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersContent = createAsyncThunk("/users/content", async () => {
  document.body.classList.add("loading-indicator");
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:8000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  document.body.classList.remove("loading-indicator");
  return response.data;
});

async function addUserAsync(userData) {
  document.body.classList.add("loading-indicator");

  const token = localStorage.getItem("token");
  try {
    await axios.post(`http://127.0.0.1:8000/api/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    document.body.classList.remove("loading-indicator");
  } catch (error) {
    console.error("Error adding lead:", error);
    document.body.classList.remove("loading-indicator");
  }
}

async function deleteUserAsync(leadId) {
  document.body.classList.add("loading-indicator");

  const token = localStorage.getItem("token");
  await axios.delete(`http://127.0.0.1:8000/api/leads/${leadId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  document.body.classList.remove("loading-indicator");
  return leadId; // Return the deleted leadId for handling in the reducer
}

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
  },
  reducers: {
    addNewUser: (state, action) => {
      let { newLeadObj } = action.payload;
      addUserAsync(newLeadObj);
      state.users = [...state.users, newLeadObj];
    },

    deleteUser: (state, action) => {
      let { index } = action.payload;
      deleteUserAsync(index.user.id)
        .then(() => {
          // If deletion is successful, remove the lead from the state
          state.leads.splice(index.index, 1);
        })
        .catch((error) => {
          // Handle any errors if deletion fails
          console.error("Error deleting lead:", error);
        });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsersContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersContent.fulfilled, (state, action) => {
        state.leads = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getUsersContent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addNewUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
