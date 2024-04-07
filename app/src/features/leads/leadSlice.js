import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLeadsContent = createAsyncThunk("/leads/content", async () => {
  document.body.classList.add("loading-indicator");
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  document.body.classList.remove("loading-indicator");
  return response.data;
});
async function deleteLeadAsync(leadId) {
  document.body.classList.add("loading-indicator");

  const token = localStorage.getItem("token");
  await axios.delete(`http://127.0.0.1:8000/api/users/${leadId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  document.body.classList.remove("loading-indicator");
  return leadId; // Return the deleted leadId for handling in the reducer
}

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (state, action) => {
      let { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      console.log(action.payload);
      deleteLeadAsync(index.user.id)
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

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload.data;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
