import { FaMapMarkerAlt } from "react-icons/fa";
import { LuCircleDollarSign } from "react-icons/lu";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {

    const {_id, title, company, company_logo, requirements, description, location, salaryRange } = job;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div className="flex gap-2 m-2 items-center">
            <figure>
                <img
                className="w-16"
                    src={company_logo}
                    alt="Shoes" />
            </figure>

            <div>
                <h3 className="text-2xl">{company}</h3>
                <p className="flex gap-1 items-center"><FaMapMarkerAlt /> {location}</p>
            </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>

                <div className="flex gap-2 flex-wrap">
                    {
                        requirements.map((skill,indx) => <p key={indx} className="border rounded-md text-center px-2 hover:text-blue-600 hover:bg-purple-200">{skill}</p>)
                    }
                </div>
                <div className="card-actions justify-end items-center mt-4">
                    <p className="flex items-center mr-8">Salary: <LuCircleDollarSign /> {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                    <Link to={`/jobs/${_id}`}> <button className="btn btn-primary">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;