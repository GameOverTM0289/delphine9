import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, Analytics } from '@/lib/types';

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (email: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  updateTracking: (orderId: string, trackingNumber: string) => void;
  addNote: (orderId: string, note: string) => void;
  deleteOrder: (orderId: string) => void;
  getStats: () => {
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    avgOrderValue: number;
    todayRevenue: number;
    todayOrders: number;
  };
  getAnalytics: () => Analytics;
  getRecentOrders: (limit: number) => Order[];
  exportOrders: () => string;
  searchOrders: (query: string) => Order[];
  getTopCustomers: (limit: number) => { email: string; name: string; orders: number; totalSpent: number }[];
}

// Store starts empty (project not launched yet)
const defaultOrders: Order[] = [];

function getLastNMonthsLabels(n: number): string[] {
  const now = new Date();
  const labels: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString('en-US', { month: 'short' }));
  }
  return labels;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: defaultOrders,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },

      getOrderById: (orderId) => get().orders.find((o) => o.orderId === orderId),
      getUserOrders: (email) =>
        get().orders.filter((o) => o.userEmail.toLowerCase() === email.toLowerCase()),
      getAllOrders: () => get().orders,

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderId === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
          ),
        }));
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderId === orderId
              ? { ...o, paymentStatus, updatedAt: new Date().toISOString() }
              : o
          ),
        }));
      },

      updateTracking: (orderId, trackingNumber) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderId === orderId
              ? {
                  ...o,
                  trackingNumber,
                  status: 'shipped',
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));
      },

      addNote: (orderId, note) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderId === orderId
              ? { ...o, notes: [...(o.notes || []), note], updatedAt: new Date().toISOString() }
              : o
          ),
        }));
      },

      deleteOrder: (orderId) => {
        set((state) => ({ orders: state.orders.filter((o) => o.orderId !== orderId) }));
      },

      getStats: () => {
        const orders = get().orders;
        const today = new Date().toDateString();
        const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
        const paidOrders = orders.filter((o) => o.paymentStatus === 'paid');
        const totalRevenue = paidOrders.reduce((acc, o) => acc + o.total, 0);

        return {
          totalRevenue,
          totalOrders: orders.length,
          pendingOrders: orders.filter((o) => o.status === 'pending').length,
          completedOrders: orders.filter((o) => o.status === 'delivered').length,
          avgOrderValue: paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0,
          todayRevenue: todayOrders
            .filter((o) => o.paymentStatus === 'paid')
            .reduce((acc, o) => acc + o.total, 0),
          todayOrders: todayOrders.length,
        };
      },

      getAnalytics: () => {
        const orders = get().orders;
        const months = getLastNMonthsLabels(6);
        const revenueByMonth = months.map((month) => ({ month, revenue: 0 }));

        const statusCounts: Record<string, number> = {};
        orders.forEach((o) => {
          statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
        });

        const uniqueEmails = new Set(orders.map((o) => o.userEmail.toLowerCase()));

        return {
          topProducts: [],
          revenueByMonth,
          ordersByStatus: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
          recentActivity: [],
          totalCustomers: uniqueEmails.size,
          conversionRate: 0,
        };
      },

      getRecentOrders: (limit) => {
        return [...get().orders]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
      },

      exportOrders: () => {
        const orders = get().orders;
        const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Status', 'Payment', 'Total'];
        const rows = orders.map((o) => [
          o.orderId,
          new Date(o.createdAt).toLocaleDateString(),
          o.userName,
          o.userEmail,
          o.status,
          o.paymentStatus,
          o.total.toFixed(2),
        ]);
        return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      },

      searchOrders: (query) => {
        const q = query.toLowerCase();
        return get().orders.filter(
          (o) =>
            o.orderId.toLowerCase().includes(q) ||
            o.userName.toLowerCase().includes(q) ||
            o.userEmail.toLowerCase().includes(q)
        );
      },

      getTopCustomers: (limit) => {
        const orders = get().orders;
        const customers: Record<
          string,
          { email: string; name: string; orders: number; totalSpent: number }
        > = {};

        orders.forEach((o) => {
          const key = o.userEmail.toLowerCase();
          if (!customers[key]) {
            customers[key] = { email: o.userEmail, name: o.userName, orders: 0, totalSpent: 0 };
          }
          customers[key].orders += 1;
          customers[key].totalSpent += o.total;
        });

        return Object.values(customers)
          .sort((a, b) => b.totalSpent - a.totalSpent)
          .slice(0, limit);
      },
    }),
    {
      // Bump key to prevent old demo orders from localStorage from showing up
      name: 'delphine-orders-v2',
      skipHydration: true,
    }
  )
);
