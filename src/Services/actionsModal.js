import React from "react";

export const ActionsModal = (
    {
        onClose,
        status,
        deleteUserData,
        handleBlock,

    }
) => {
    return (
        <>
            <div className="modal-body text-center p-3">
                <h1 className="heading fs-5">
                {status === "delete" ? "Delete" :
                        status === "block" ? "Block" :
                            status === "unblock" ? "Unblock" : ""
                    }
                </h1>
                <h6 className="p-4 mb-0">
                    {status === "delete" ? "Are you sure you want to delete the user ?" :
                        status === "block" ? "Are you sure you want to block the user ?" :
                            status === "unblock" ? "Are you sure you want to unblock the user ?" : ""
                    }

                </h6>
            </div>
            <div className="justify-content-between border-top-0 modal-footer">
                <button type="button" className="btn bg-dark text-light m-0 rounded-0 w-50 border-bottom-0 border-end-0" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary m-0 rounded-0 w-50 border-bottom-0 border-start-0 " onClick={status === "delete" ? deleteUserData :
                            status === "block" ? handleBlock :
                                handleBlock
                        }>Confirm</button>
                </div>
        </>
    )
}
