import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([])


    useEffect(() => {
        // fetch(`http://localhost:5000/job-applications?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setJobs(data)
        //     })

        axios.get(`http://localhost:5000/job-applications?email=${user.email}`,{withCredentials: true})
        .then(res => setJobs(res.data))
    }, [user.email])

    const handleDeleteApplication = (id) => {
        fetch(`http://localhost:5000/job-applications/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your coffee has been deleted.",
                    icon: "success"
                });
            }

            const remainingData = jobs.filter(job => job._id != id)

            setJobs(remainingData)
        })
    }


    return (
        <div>
            <h2 className="text-3xl">My applications: {jobs.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            jobs.map(job =>
                                <tr key={job._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={job.company_logo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{job.title}</div>
                                                <div className="text-sm opacity-50">{job.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button onClick={() => handleDeleteApplication(job._id)} className="btn btn-ghost btn-xs">X</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyApplications;