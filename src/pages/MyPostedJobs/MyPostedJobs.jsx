import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const [myJobs, setMyJobs] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyJobs(data);
            })
    }, [user.email])
    return (
        <div>
            <h2>My Posted jobs: {myJobs.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Applicants</th>
                            <th>Applications</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            myJobs.map((myJob,indx) =>
                                <tr>
                                    <th>{indx+1}</th>
                                    <td>{myJob.title}</td>
                                    <td>{myJob.applicationDeadline}</td>
                                    <td>{myJob.applicationCount}</td>
                                    <td>
                                        <Link to={`/viewApplications/${myJob._id}`}>
                                        <button className='btn btn-link'>View Applications</button>
                                        </Link>
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

export default MyPostedJobs;