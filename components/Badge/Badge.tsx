import { Contact } from '@/interfaces';
import { FC } from "react";

const Badge: FC<{ contact: Contact, visible: boolean }> = ({ contact, visible }) => {
    const {node} = contact;
    const { website, id, name, phoneNumber, email } = node;
    return (
        <div className={`clip overflow-hidden transition-all text-right border-b border-l border-green-600 p-10 ${visible ? 'opacity-1' : 'opacity-0 -z-10 h-0'}`}>
            <p>{name}</p>
            <p>{phoneNumber}</p>
            <p>{email}</p>
            <p>{website}</p>
        </div>
    );
};

export default Badge;
