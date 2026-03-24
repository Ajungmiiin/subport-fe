import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type AuthRole = 'guest' | 'member' | null;

const initialState = {
  role: null as AuthRole,
  accessToken: null as string | null,
};

export const useAuthStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          setAuth: (role: AuthRole, accessToken: string) => {
            set({ role, accessToken });
          },
          clearAuth: () => {
            set(initialState);
          },
        },
      })),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          role: state.role,
          accessToken: state.accessToken,
        }),
      },
    ),
    {
      name: 'use-auth-store',
    },
  ),
);

export const useGetAuthRole = () => {
  const role = useAuthStore((state) => state.role);

  return role;
};

export const useGetAccessToken = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken;
};

export const useGetAuthActions = () => {
  const { clearAuth, setAuth } = useAuthStore((state) => state.actions);

  return { clearAuth, setAuth };
};
