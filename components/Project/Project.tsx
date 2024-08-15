import {Project as ProjectType} from "@/interfaces";
import {Technology} from "@/components";
import {FC} from 'react';

const Project: FC<{project: ProjectType}> = props => {
    const {project} = props;
    return (
        <div className={`ml-8 flex flex-col gap-4 mb-8`}>
            <h2 className={'text-xl'}><a target={'_blank'} href={project.url.toString()}>{project.name}</a></h2>
            <p>{project.description}</p>
            <div className="flex flex-col ml-8">
            {
                project.technologies.map((technology, index) => {
                    return (
                        <Technology key={index} technology={technology} />
                    )
                })
            }
            </div>
        </div>
    )
}
export default Project;