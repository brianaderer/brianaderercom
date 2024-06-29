import {FC} from "react";
import {Job as JobType} from '@/interfaces';
import {Deliverable} from '@/components';

const Job: FC<{ job: JobType, className?: string }> = props => {
    const {job, className = ''} = props;
    return (
        <div className={`mb-8 flex flex-col gap-4 ${className}`}>
            <h1>{job.name}</h1>
            <p>{job.title}</p>
            <p>{job.startDate}</p>
            <p>{job.endDate ? job.endDate : 'Current'}</p>
            <p>{job.description}</p>
            <div className={`flex flex-col ml-4 gap-4`}>
                <h3>Key Deliverables</h3>
            {
                job.deliverables.map((deliverable, index) => {
                    return <Deliverable key={index} deliverable={deliverable} />
                })
            }
            </div>
        </div>
    )
}
export default Job;