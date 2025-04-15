import React from 'react'

function DetectionsTable( {items} ) {
    const handleStatus = confidence => {
        if (confidence > 0.9){
            return 'success'
        }else if (confidence >= 0.5){
            return 'warning'
        }else{
            return 'danger'
        }
        
    }
  return (
    <table className="table table-borderless datatable">
        <thead className="table-light">
            <tr>
                <th scope="col">Detection</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Confidence</th>
            </tr>
        </thead>
        <tbody>
            {
                items && 
                items.length > 0 &&
                items.map(item => (
                    <tr key={item._id}>
                        <th scope="row">
                            <a href="#">{item.object_detected}</a>
                        </th>
                        <td className="text-primary">
                            {item.timestamp}
                        </td>
                        {/* <td>
                            <a href="#" >
                                {item.product}
                            </a>
                        </td> */}
                        <td>
                            <span className={`badge bg-${handleStatus(item.confidence_camera)}`}>
                                {/* {item.confidence_camera.toFixed(2)} */}
                                {typeof item.confidence_camera === 'number' ? item.confidence_camera.toFixed(2) : 'N/A'}
                            </span>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default DetectionsTable