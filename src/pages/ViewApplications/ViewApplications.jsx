import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData();
    const handleUpdateStatus = (e, id) => {
        console.log(e.target.value, id);

        const data = {
            status: e.target.value

        }

        fetch(`http://localhost:5000/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Status Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
    }

    return (
        <div>
            <h2 className="text-3xl text-center">Applications for this job: {applications.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            applications.map((app, idx) =>
                                <tr key={app._id}>
                                    <th>{idx + 1}</th>
                                    <td>{app.applicant_email}</td>
                                    <td>Quality Control Specialist</td>
                                    <td>
                                        <select onChange={(e) => handleUpdateStatus(e, app._id)} defaultValue={app.status || 'Change Status'} className="select select-bordered select-xs w-full max-w-xs">
                                            <option disabled>Change Status</option>
                                            <option>Under Review</option>
                                            <option>Set Interview</option>
                                            <option>Hired</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;