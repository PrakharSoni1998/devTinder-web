import React from 'react'

const ToastMessage = ({message,isSuccess}) => {  
  console.log("msgg",message);
    
  return (
    <div className="toast toast-top toast-end">
      {isSuccess ? <div className="alert alert-success">
    <span>{message}</span>
  </div> :   <div className="alert alert-error">
    <span>{message}</span>
  </div>}

</div>
  )
}

export default ToastMessage