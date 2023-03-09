import React from "react";

export const RequestSentModal = (
    {
        onClose,
    }
) => {
    return (
        <>
         <div className="modal-body text-center p-3">
                <h6 className="p-4 mb-0">The request is sent for the approval</h6>
                <div className="justify-content-center border-top-0">
                <button type="button" className="btn bg-dark text-light m-0 round w-25 border-bottom-0 border-end-0" onClick={onClose}>Ok</button>
            </div>
            </div>
            
        </>
    )
}
