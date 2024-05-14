export default function Modal(){
    return(

        <section>
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                    <input type="text" className="form-control" id="recipient-name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle2"
                                    data-bs-toggle="modal" data-bs-dismiss="modal">Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Hide this modal and show the first with the button below.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle"
                                    data-bs-toggle="modal" data-bs-dismiss="modal">Back to first
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first
                modal</a>
        </section>
    )
}