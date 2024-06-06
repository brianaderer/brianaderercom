import { Contact } from '@/interfaces';
import { FC } from "react";

const Badge: FC<{ contact: Contact, visible: boolean }> = ({ contact, visible }) => {
    const {node} = contact;
    const { website, id, name, phoneNumber, email } = node;
    return (
        <div className={`overflow-hidden transition-all ${visible ? 'opacity-1' : 'opacity-0 -z-10 h-0'}`}>
            <p>{name}</p>
            <p>{phoneNumber}</p>
            <p>{email}</p>
            <p>{website}</p>
        </div>
    );
};

export default Badge;
