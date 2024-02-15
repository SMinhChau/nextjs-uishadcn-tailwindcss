"use client";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

/**
 *
 * @param param0
 * @returns ensure that the store is only created once for per render
 * - render once per request on the server
 * - render multiple times on the client (action be render for component)
 */
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // action set initial data to the store
    // storeRef.current.dispatch(initializeCount(count))
  }

  return (
    <>
      <Provider store={storeRef.current}>{children}</Provider>
    </>
  );
};

export default StoreProvider;
