import axiosInstance from "./axiosInstance";

import Cookies from "js-cookie";

export async function userLogin(username, password) {
  try {
    Cookies.set("token", " ");

    const response = await axiosInstance.post("/auth/login", {
      email: username,
      password: password,
    });

    console.log("Login successful:", response.data);

    let jwtToken = response.data.data.token;

    Cookies.set("token", jwtToken);
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    // Aquí podrías mostrar un mensaje de error al usuario
    return false;
  }
}
