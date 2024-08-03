'use client'

import { useEffect, useState } from "react";

export default function useOptimistic(passthrough, reducer) {
  const [value, setValue] = useState(passthrough);

  useEffect(() => {
    setValue(passthrough);
  }, []);

  return [value, (payload) =>{
    console.log('hello')
    setValue(reducer(passthrough, payload))}];
}
