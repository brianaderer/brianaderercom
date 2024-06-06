import { Contact } from '@/interfaces';
import { FC } from "react";

const Badge: FC<{ contact: Contact }> = ({ contact }) => {
    const {node} = contact;
    const { website, id, name, phoneNumber, email } = node;
    return (
        <div className={`h-0 overflow-hidden -z-10 opacity-0`}>
            <p>{name}</p>
            <p>{phoneNumber}</p>
            <p>{email}</p>
            <p>{website}</p>
        </div>
    );
};

export default Badge;
