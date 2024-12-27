import React from 'react';
import useAuth from '../../hooks/UseAuth';
import { object } from 'motion/react-client';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

const AddJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddJob = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries());

        const initialData = Object.fromEntries(formData.entries());

        // console.log(initialData);

        const { min, max, currency, ...newJob } = initialData;
        console.log(min, max, currency, newJob);

        newJob.salaryRange = { min, max, currency }
        newJob.requirements = newJob.requirements.split('\n')
        newJob.responsibilities = newJob.responsibilities.split('\n')
        console.log(newJob);

        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Job has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/myPostedJobs')
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl">job aadd hbe</h2>


            <form onSubmit={handleAddJob} className="card-body">

                {/* job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job title</span>
                    </label>
                    <input name='title' type="text" placeholder="Job Title" className="input input-bordered" required />
                </div>


                {/* job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input name='location' type="text" placeholder="Job Location" className="input input-bordered" required />

                </div>


                {/* job type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job type: </span>
                    </label>
                    <select defaultValue={'Pick a job type'} className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a job type</option>
                        <option>Full-time</option>
                        <option>Intern</option>
                        <option>Part-time</option>
                    </select>

                </div>


                {/* job field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Field: </span>
                    </label>
                    <select defaultValue={'Pick a job Field'} className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a job Field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>

                </div>


                {/* salary range */}


                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input name='min' type="text" placeholder="Min Salary" className="input input-bordered" required />

                    </div>

                    <div className="form-control">

                        <input name='max' type="text" placeholder="Max Salary" className="input input-bordered" required />

                    </div>


                    <div className="form-control">

                        <select defaultValue={'Select a currency: '} name='currency' className="select select-ghost w-full max-w-xs">
                            <option disabled>Select a currency: </option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                            <option>RS</option>
                        </select>

                    </div>

                </div>


                {/* job description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Job Description" name='description' required></textarea>
                </div>


                {/* Company Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name='company' placeholder="Company Name" className="input input-bordered" required />
                </div>
                {/* requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="put each requirements in a new line" name="requirements" required></textarea>
                </div>
                {/* responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Responsibilities</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Write each responsibility in a new line" name="responsibilities" required></textarea>
                </div>
                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name='hr_name' placeholder="HR Name" className="input input-bordered" required />
                </div>


                {/* HR Email */}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} name='hr_email' placeholder="HR Email" className="input input-bordered" required />
                </div>

                {/* application Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input type="date" name='applicationDeadline' placeholder="Deadline" className="input input-bordered" required />
                </div>



                {/* Company logo url */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="text" name='company_logo' placeholder="Company Logo URL" className="input input-bordered" required />
                </div>


                {/* submit button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJobs;