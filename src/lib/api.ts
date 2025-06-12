import axios from 'axios';

const BASE = process.env.NEXT_PUBLIC_API_URL!;

// Interfaces
export interface Product { id: number; name: string; price: number; }
export interface Client { id: number; name: string; email: string; }
export interface Order { id: number; clientId: number; productIds: number[]; orderDate: string; }

// Produtos
export const getProducts = async (): Promise<Product[]> =>
  (await axios.get<Product[]>(`${BASE}/products`)).data;
export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> =>
  (await axios.post<Product>(`${BASE}/products`, data)).data;

// Clientes
export const getClientes = async (): Promise<Client[]> =>
  (await axios.get<Client[]>(`${BASE}/clients`)).data;
export const createCliente = async (data: Omit<Client, 'id'>): Promise<Client> =>
  (await axios.post<Client>(`${BASE}/clients`, data)).data;

// Pedidos
export const getPedidos = async (): Promise<Order[]> =>
  (await axios.get<Order[]>(`${BASE}/orders`)).data;
export const createPedido = async (data: Omit<Order, 'id' | 'orderDate'>): Promise<Order> =>
  (await axios.post<Order>(`${BASE}/orders`, data)).data;