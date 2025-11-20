import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export function createStore<T>(
  initializer: (set: any, get: any) => T,
  name: string
) {
  return create<T>()(
    devtools(
      persist(
        (set, get) => initializer(set, get),
        { name }
      )
    )
  );
}
