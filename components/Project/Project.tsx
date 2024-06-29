import {Project as ProjectType} from "@/interfaces";
import {Technology} from "@/components";
import {FC} from 'react';

const Project: FC<{project: ProjectType}> = props => {
    const {project} = props;
    return (
        <div className={`ml-8 flex flex-col gap-4`}>
            <h2>{project.name}</h2>
            <a href={project.url.toString()}>{project.url.toString()}</a>
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