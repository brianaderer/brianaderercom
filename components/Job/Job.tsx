import {FC} from "react";
import {Job as JobType} from '@/interfaces';
import {Deliverable} from '@/components';

const Job: FC<{ job: JobType, className?: string }> = props => {
    const {job, className = ''} = props;
    return (
        <div className={`mb-8 flex flex-col gap-4 ${className}`}>
            <h1 className={'text-2xl'}>{job.name}</h1>
            <p className={'text-xl'}>{job.title}</p>
            <div className="flex flex-col lg:flex-row align-center">
                <p className={'text-lg'}>Start Date: {job.startDate} / </p>
                <p className={'text-lg lg:ml-2'}>End Date: {job.endDate ? job.endDate : 'Current'}</p>
            </div>
            <p className={'text-md'}>{job.description}</p>
            <div className={`flex flex-col lg:ml-4 gap-4`}>
                <h3 className={'text-xl'}>Key Deliverables</h3>
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