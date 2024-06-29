import {Technology as TechnologyType} from "@/interfaces";
import {FC} from 'react';

const Technology: FC<{technology: TechnologyType}> = props => {
    const {technology} = props;
    return (
    <p className={'ml-8'}>
        {technology.name}
    </p>
    );
}
export default Technology;