import {Deliverable as DeliverableType} from "@/interfaces/Deliverable";
import {FC} from "react";
import {Technology} from "@/components";

const Deliverable: FC<{deliverable: DeliverableType}> = props => {
    const {deliverable} = props;

    return (
    <div className={`my-2 ml-8 flex flex-col gap-4`}>
        <h2 className={'text-xl'}>{deliverable.name}</h2>
        {deliverable.description && <p className={'ml-8'}>{deliverable.description}</p>}
        <div className="ml-12 my-2">
            <p className={'text-lg'}>Technologies Leveraged</p>
            {
                deliverable.technologies.map((technology, index) => {
                    return <Technology key={index} technology={technology} />
                })
            }
        </div>
    </div>
    )
}
export default Deliverable;