import { apiProduct } from "./api"; 

export const getProducts = async (token: string) => {
  return await apiProduct.get("/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProduct = async (data: { name: string; price: string; stock: number }, token: string) => {
  return await apiProduct.post("/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deleteProduct = async (id: number, token: string) => {
  return await apiProduct.delete(`/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProduct = async (
  id: number,
  data: Partial<{ name: string; price: string; stock: number }>,
  token: string
) => {
  return await apiProduct.patch(`/patch/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
