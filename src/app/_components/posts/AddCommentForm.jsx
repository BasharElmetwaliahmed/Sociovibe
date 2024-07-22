import { addCommentAction } from '@/app/_lib/action';
import React from 'react'
import SubmitButton from './SubmitButton'

function AddCommentForm({id}) {
  return (
    <form className="flex gap-2 items-stretch w-full" action={addCommentAction}>
      <input
        type="text"
        id={`${id}`}
        placeholder="add comment here"
        name="text"
        className=" text-white focus:border-blue focus:text-blue focus:placeholder:text-blue
        transition-all duration-300 outline-none self-stretch justify-self-stretch flex-[1] border-[1px] border-lightBlue px-2 
         py-1 bg-transparent placeholder:text-lightBlue rounded-md"
      />
      <input type="hidden" name="postId" value={id} />

      <SubmitButton />
    </form>
  );
}

export default AddCommentForm