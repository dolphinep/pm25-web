import React from 'react'

const PMButton = props => {
    return (
        <div className="container text-light">
            <h1 className="text-white py-3">THAILAND PM2.5 <br/>NEXT 3 DAYS</h1>
            <div className="Card">
                <div className="col-md-12 mt-md-12 mt-12 ">
                    <button className="btn btn-warning" onClick={props.loadPM25}>PREDICT</button>
                </div>
            </div>
        </div>
    )
}
export default PMButton
