import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import PATH from '../path';

export const branchOfficesGetter = createAsyncThunk("BRANCH_OFFICES_GETTER", async () => {
    return await axios.get(`${PATH}/api/branchOffice/showBranch`)
        .then((res) => {
            localStorage.setItem('branches', JSON.stringify({ branches: res.data.data }))
            return res.data.data
        });
});

const branchOfficesListReducer = createReducer({}, {
    [branchOfficesGetter.fulfilled]: (state, action) => {
        return action.payload
    }
});

export default branchOfficesListReducer;
