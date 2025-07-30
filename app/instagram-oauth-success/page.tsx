"use client"
import { Spinner } from "@/components/ui";
import { useEffect } from "react";

export default function Page () {

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'INSTAGRAM_AUTH_SUCCESS' }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-fit m-auto">
        <Spinner />
      </div>
    </div>
  )
}