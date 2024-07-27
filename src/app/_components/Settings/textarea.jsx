import React from 'react'

function Textarea({defaultValue,id}) {
  return (

<div className="w-full">
  <label for={id} class="block text-sm font-medium  text-gray-200">
    Bio (5-60 word)
  </label>

  <textarea
    id={id}
    class="mt-2 w-full rounded-lg   align-top shadow-sm sm:text-sm p-2 border-2 outline-none  focus:border-blue border-gray-700 bg-gray-800 text-white"
    rows="4"
    placeholder="Bio"
    defaultValue={defaultValue}
    name={id}
  ></textarea>
  
</div>  )
}

export default Textarea