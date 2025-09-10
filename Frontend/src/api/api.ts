import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5022/api",
});

//AUTH - Register
export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await api.post("/auth/register", { email, password, name });
  console.log(res.data)
  return res.data;
};

//AUTH - Log in
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password});
  console.log("API Response:", res.data);
  return res.data;
};

//BOOKING - Get all bookings
export const getAllBookings = async (token: string) => {
  const res = await api.get("/booking", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//BOOKING - Get a users booking
export const getUserBookings = async (userId: string, token: string) => {
  const res = await api.get(`/booking/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


//TIMESlOTS
export const getFreeSlots = async (date:string, resourceTypeId:number, token:string) => {
  const res = await api.post<string[]>(`/booking/${resourceTypeId}/freeSlots`, {date}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  
  return res.data;
};

//BOOKING - Create a booking
export const createBooking = async (
  booking: {
    date: string;
    timeSlot: string;
    resourceTypeId: number;
    userId: string;
  },
  token: string
) => {
  const res = await api.post("/booking", booking, {
    headers: { Authorization: `Bearer ${token} ` },
  });
  return res.data;
};

//BOOKING - Remove a booking
export const deleteBooking = async (bookingId: string, token: string) => {
  const res = await api.delete(`/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//BOOKING - Change Resource Status
export const changeResourceStatus = async (resourceId: number, token: string) => {
    const res = await api.patch(`/booking/resource/${resourceId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }); 
    return res.data;
}
//USERS - Ge All Users
export const getAllUsers = async (token: string) => {
  const res = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.data;
};

//USERS - Get specific user
export const getUserById = async (id: string, token: string) => {
  const res = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.data;
};

//USERS - Update user
export const updateUserById = async (
  id: string,
  token: string,
  name: string,
  email: string
) => {
  const res = await api.put(
    `/users/${id}`,
    { email, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
);
  return res.data;
};
