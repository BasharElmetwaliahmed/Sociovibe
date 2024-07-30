'use client'
function Error({reset,error}) {
  return (
    <div>{error.message}</div>
  )
}

export default Error