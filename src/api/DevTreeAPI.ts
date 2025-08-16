import { isAxiosError } from "axios";
import { api } from "../config/axios";
import {  User, UserHandler } from "../types";

export async function getUser() {

  try {

    const { data } = await api<User>(`/user`);

    return data;

    //localStorage.setItem('AUTH_TOKEN', data)

  } catch (error) {

    if (isAxiosError(error) && error.response) {

      throw new Error(error.response.data.error);

    }

  }

}

export async function updateProfile(formData: User) {

  try {

    const { data } = await api.patch<User>(`/user`, formData);

    return data;

  } catch (error) {

    if (isAxiosError(error) && error.response) {

      throw new Error(error.response.data.error);

    }

  }
}

export async function uploadImage(file: File) {

  const formData = new FormData();
  formData.append('file', file)

  try {

    const { data: {image} }: {data: {image: string}} = await api.post('/user/image', formData);   
     
    return image;

  } catch (error) {

    if (isAxiosError(error) && error.response) {

      throw new Error(error.response.data.error);

    }

  }

}

export async function getUserByHandler(handle: string) {

  try {
    const { data } = await api<UserHandler>(`/${handle}`);

    return data;

  } catch (error) {

    if (isAxiosError(error) && error.response) {

      throw new Error(error.response.data.error);

    }

  }
}

export async function searchByHandler(handle: string) {

  try {
    const { data } = await api.post<string>('/search', { handle });

    return data;

  } catch (error) {

    if (isAxiosError(error) && error.response) {

      throw new Error(error.response.data.error);

    }

  }
}